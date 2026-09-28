import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { logError, createRequestId } from '@/lib/errors';
import { requireAuth } from '@/lib/auth/guards';

export async function GET(req: NextRequest) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const looks = await prisma.savedLook.findMany({
      where: { userId: user.id },
      include: { 
        outfit: { 
          include: { 
            items: { 
              include: { wardrobeItem: true } 
            } 
          } 
        },
        analysis: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    // Calculate stats
    const scores = looks.map((l: any) => Number(l.score) || 0).filter((s: number) => s > 0);
    const highestScore = scores.length > 0 ? Math.max(...scores) : 0;
    const averageScore = scores.length > 0 ? (scores.reduce((a: number, b: number) => a + b, 0) / scores.length) : 0;
    
    const stats = {
      total: looks.length,
      highestScore: Number(highestScore.toFixed(1)),
      averageScore: Number(averageScore.toFixed(1))
    };
    
    return NextResponse.json({ success: true, data: { looks, stats } }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/looks' });
    return NextResponse.json({ success: false, error: 'Failed to fetch saved looks' }, { status: 500 });
  }
}
