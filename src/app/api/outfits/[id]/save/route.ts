import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { logError, createRequestId } from '@/lib/errors';
import { requireAuth } from '@/lib/auth/guards';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const { id } = await params;
    const existing = await prisma.outfit.findUnique({ 
      where: { id },
      include: {
        analyses: { orderBy: { createdAt: 'desc' }, take: 1 }
      }
    });
    
    if (!existing || existing.userId !== user.id) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    
    const latestAnalysis = existing.analyses[0];

    const look = await prisma.savedLook.create({
      data: {
        userId: user.id,
        outfitId: existing.id,
        analysisId: latestAnalysis?.id || null,
        name: existing.name || 'Saved Look',
        imageUrl: existing.imageUrl,
        score: latestAnalysis?.overallScore || null,
        styleLabel: latestAnalysis?.styleLabel || existing.styleLabel || 'Curated Look',
        occasion: existing.occasion || 'Everyday',
        colourPalette: existing.colourPalette || []
      }
    });

    await prisma.outfit.update({
      where: { id: existing.id },
      data: { isSaved: true }
    });
    
    return NextResponse.json({ success: true, data: look }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/outfits/[id]/save' });
    return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
  }
}
