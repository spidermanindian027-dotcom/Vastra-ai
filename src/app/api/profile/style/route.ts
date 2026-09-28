import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { logError, createRequestId } from '@/lib/errors';
import { requireAuth } from '@/lib/auth/guards';
import { stylePreferenceSchema } from '@/lib/validation/schemas';

export async function GET(req: NextRequest) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const stylePrefs = await prisma.stylePreference.findUnique({ where: { userId: user.id } });
    return NextResponse.json({ success: true, data: stylePrefs }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/profile/style' });
    return NextResponse.json({ success: false, error: 'Failed to fetch style preferences' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const body = await req.json();
    const data = stylePreferenceSchema.parse(body);
    
    const updateData: any = {};
    if (data.preferredStyles) updateData.preferredStyles = data.preferredStyles;
    if ((data as any).favouriteColours) updateData.favouriteColours = (data as any).favouriteColours;
    if ((data as any).dislikedColours) updateData.dislikedColours = (data as any).dislikedColours;
    if ((data as any).preferredFits) updateData.preferredFits = (data as any).preferredFits;

    const stylePrefs = await prisma.stylePreference.upsert({
      where: { userId: user.id },
      update: updateData,
      create: { ...updateData, userId: user.id }
    });
    return NextResponse.json({ success: true, data: stylePrefs }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/profile/style' });
    return NextResponse.json({ success: false, error: 'Failed to update style preferences' }, { status: 500 });
  }
}
