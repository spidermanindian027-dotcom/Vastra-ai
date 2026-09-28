import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { logError, createRequestId } from '@/lib/errors';
import { requireAuth } from '@/lib/auth/guards';
import { getStorageProvider } from '@/lib/storage';

export async function POST(req: NextRequest) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) return NextResponse.json({ success: false, error: 'No image file provided' }, { status: 400 });
    
    const storage = getStorageProvider();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const safeName = `${user.id}-profile-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const url = await storage.upload(buffer, safeName, file.type || 'image/jpeg');
    
    await prisma.userProfile.upsert({
      where: { userId: user.id },
      update: { primaryPhotoUrl: url },
      create: { userId: user.id, primaryPhotoUrl: url }
    });
    
    return NextResponse.json({ success: true, data: { url } }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/profile/photo' });
    return NextResponse.json({ success: false, error: 'Failed to upload photo' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const profile = await prisma.userProfile.findUnique({ where: { userId: user.id } });
    
    if (profile?.primaryPhotoUrl) {
      const storage = getStorageProvider();
      await storage.delete(profile.primaryPhotoUrl);
      await prisma.userProfile.update({
        where: { userId: user.id },
        data: { primaryPhotoUrl: null }
      });
    }
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/profile/photo' });
    return NextResponse.json({ success: false, error: 'Failed to delete photo' }, { status: 500 });
  }
}
