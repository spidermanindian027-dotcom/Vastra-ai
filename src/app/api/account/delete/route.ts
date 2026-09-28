import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { logError, createRequestId } from '@/lib/errors';
import { requireAuth } from '@/lib/auth/guards';
import { cookies } from 'next/headers';

export async function DELETE(req: Request) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    
    await prisma.$transaction([
      prisma.wardrobeItem.deleteMany({ where: { userId: user.id } }),
      prisma.outfit.deleteMany({ where: { userId: user.id } }),
      prisma.session.deleteMany({ where: { userId: user.id } }),
      prisma.userProfile.deleteMany({ where: { userId: user.id } }),
      prisma.user.delete({ where: { id: user.id } })
    ]);
    
    const cookieStore = await cookies();
    cookieStore.delete('vestra_session');
    cookieStore.delete('session_token');
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/account/delete' });
    return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
  }
}
