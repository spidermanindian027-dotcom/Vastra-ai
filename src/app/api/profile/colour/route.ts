import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { logError, createRequestId } from '@/lib/errors';
import { requireAuth } from '@/lib/auth/guards';
import { colourProfileSchema } from '@/lib/validation/schemas';

export async function GET(req: NextRequest) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const colourProfile = await prisma.colourProfile.findUnique({ where: { userId: user.id } });
    return NextResponse.json({ success: true, data: colourProfile }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/profile/colour' });
    return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const body = await req.json();
    const data = colourProfileSchema.parse(body);
    
    const updateData: any = {
      isUserCorrected: true
    };
    if (data.undertone) updateData.undertone = data.undertone;
    if (data.recommendedColours) updateData.bestColours = data.recommendedColours;
    if ((data as any).bestColours) updateData.bestColours = (data as any).bestColours;
    if ((data as any).neutralColours) updateData.neutralColours = (data as any).neutralColours;
    if ((data as any).accentColours) updateData.accentColours = (data as any).accentColours;
    if (data.avoidColours) updateData.avoidColours = data.avoidColours;

    const colourProfile = await prisma.colourProfile.upsert({
      where: { userId: user.id },
      update: updateData,
      create: { ...updateData, userId: user.id }
    });
    return NextResponse.json({ success: true, data: colourProfile }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/profile/colour' });
    return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
  }
}
