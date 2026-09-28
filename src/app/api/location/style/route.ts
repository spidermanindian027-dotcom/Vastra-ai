import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { logError, createRequestId } from '@/lib/errors';
import { requireAuth } from '@/lib/auth/guards';
import { recordLocationEvent } from '@/lib/location';
import { getAIProvider } from '@/lib/ai/provider';

export async function POST(req: NextRequest) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const body = await req.json();
    const { location, occasion } = body;
    
    await recordLocationEvent(user.id, 23.0225, 72.5714, 'occasion_styling', occasion || location);
    
    const profile = await prisma.userProfile.findUnique({ where: { userId: user.id } });
    const wardrobe = await prisma.wardrobeItem.findMany({ where: { userId: user.id } });
    
    const ai = getAIProvider();
    const recommendations = await ai.generateOutfitRecommendations(profile, wardrobe, location, occasion);
    
    return NextResponse.json({ success: true, data: recommendations }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/location/style' });
    return NextResponse.json({ success: false, error: 'Failed to generate recommendations' }, { status: 500 });
  }
}
