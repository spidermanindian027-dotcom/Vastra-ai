import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { logError, createRequestId } from '@/lib/errors';
import { requireAuth } from '@/lib/auth/guards';
import { bodyProfileSchema } from '@/lib/validation/schemas';

export async function GET(req: NextRequest) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const bodyProfile = await prisma.bodyProfile.findUnique({ where: { userId: user.id } });
    return NextResponse.json({ success: true, data: bodyProfile }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/profile/body' });
    return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const body = await req.json();
    const data = bodyProfileSchema.parse(body);
    
    const updateData: any = {
      isUserCorrected: true
    };
    if (data.bodyShape) updateData.bodyShape = data.bodyShape;
    if (data.visualBuild) updateData.visualBuild = data.visualBuild;
    if (data.muscleDevelopment) updateData.muscleDev = data.muscleDevelopment;
    if ((data as any).shoulderProportion) updateData.shoulderProportion = (data as any).shoulderProportion;
    if ((data as any).recommendedSilhouettes) updateData.recommendedSilhouettes = (data as any).recommendedSilhouettes;
    if ((data as any).suggestedTops) updateData.suggestedTops = (data as any).suggestedTops;
    if ((data as any).suggestedBottoms) updateData.suggestedBottoms = (data as any).suggestedBottoms;
    if ((data as any).avoidStyles) updateData.avoidStyles = (data as any).avoidStyles;

    const bodyProfile = await prisma.bodyProfile.upsert({
      where: { userId: user.id },
      update: updateData,
      create: { ...updateData, userId: user.id }
    });
    return NextResponse.json({ success: true, data: bodyProfile }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/profile/body' });
    return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
  }
}
