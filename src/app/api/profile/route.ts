import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { logError, createRequestId } from '@/lib/errors';
import { requireAuth } from '@/lib/auth/guards';
import { profileUpdateSchema } from '@/lib/validation/schemas';

export async function GET(req: NextRequest) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const profile = await prisma.userProfile.findUnique({ 
      where: { userId: user.id },
      include: {
        user: {
          select: { id: true, name: true, email: true, role: true, createdAt: true }
        }
      }
    });
    return NextResponse.json({ success: true, data: profile }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/profile' });
    return NextResponse.json({ success: false, error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const body = await req.json();
    const data = profileUpdateSchema.parse(body);

    if (data.name) {
      await prisma.user.update({
        where: { id: user.id },
        data: { name: data.name }
      });
    }
    
    const profileData: any = {};
    if (data.gender) profileData.gender = data.gender as any;
    if (data.ageGroup) profileData.ageGroup = data.ageGroup as any;
    if ((data as any).bio !== undefined) profileData.bio = (data as any).bio;

    const profile = await prisma.userProfile.upsert({
      where: { userId: user.id },
      update: profileData,
      create: { ...profileData, userId: user.id }
    });
    return NextResponse.json({ success: true, data: profile }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/profile' });
    return NextResponse.json({ success: false, error: 'Failed to update profile' }, { status: 500 });
  }
}
