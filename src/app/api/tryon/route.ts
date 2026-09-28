import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { logError, createRequestId } from '@/lib/errors';
import { requireAuth } from '@/lib/auth/guards';
import { getAIProvider } from '@/lib/ai/provider';

export async function POST(req: NextRequest) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const body = await req.json();
    const { sourcePhotoUrl, clothingImageUrl, wardrobeItemIds } = body;
    
    if (!sourcePhotoUrl || !clothingImageUrl) {
      return NextResponse.json({ success: false, error: 'Source photo and clothing image are required' }, { status: 400 });
    }

    const record = await prisma.tryonGeneration.create({
      data: {
        userId: user.id,
        sourcePhotoUrl,
        wardrobeItemIds: Array.isArray(wardrobeItemIds) ? wardrobeItemIds : [],
        status: 'pending'
      }
    });
    
    const startTime = Date.now();
    const ai = getAIProvider();
    const generatedImageUrl = await ai.generateTryOn(sourcePhotoUrl, clothingImageUrl);
    const duration = Date.now() - startTime;
    
    const updatedRecord = await prisma.tryonGeneration.update({
      where: { id: record.id },
      data: {
        generatedImageUrl,
        status: 'completed',
        aiModel: 'vestra-tryon-v1',
        aiProvider: 'demo',
        generationDurationMs: duration,
        completedAt: new Date()
      }
    });
    
    return NextResponse.json({ success: true, data: updatedRecord }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/tryon' });
    return NextResponse.json({ success: false, error: 'Virtual try-on generation failed' }, { status: 500 });
  }
}
