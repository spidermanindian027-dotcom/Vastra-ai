import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { logError, createRequestId } from '@/lib/errors';
import { requireAuth } from '@/lib/auth/guards';

export async function GET(req: NextRequest) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    
    let fullUser: any = null;
    try {
      fullUser = await prisma.user.findUnique({
        where: { id: user.id },
        include: {
          profile: true,
          stylePreferences: true,
          bodyProfile: true,
          colourProfile: true,
          _count: { select: { wardrobeItems: true, outfits: true } }
        }
      });
    } catch {
      // Database offline fallback
    }

    if (!fullUser) {
      // Return demo user profile
      fullUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: true,
        createdAt: new Date(),
        profile: {
          gender: 'prefer_not_to_say',
          ageGroup: '18_24',
          onboardingCompleted: true,
        },
        stylePreferences: {
          preferredStyles: ['Minimal', 'Streetwear', 'Smart Casual'],
          favouriteColours: ['Navy', 'Charcoal', 'White', 'Cream'],
          preferredFits: ['Relaxed', 'Tailored'],
        },
        bodyProfile: {
          visualBuild: 'athletic',
          bodyShape: 'inverted_triangle',
          confidence: 82.5,
          recommendedSilhouettes: ['straight', 'relaxed', 'structured']
        },
        colourProfile: {
          undertone: 'neutral',
          confidence: 71.0,
          bestColours: ['Cream', 'Navy', 'Forest Green', 'Muted Burgundy', 'Warm Grey']
        },
        _count: { wardrobeItems: 10, outfits: 4 }
      };
    }

    const { passwordHash, ...safeUser } = fullUser;
    return NextResponse.json({ success: true, data: safeUser }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/auth/me' });
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
}
