import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { logError, createRequestId } from '@/lib/errors';
import { requireAuth } from '@/lib/auth/guards';

export async function GET(req: Request) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    
    const data = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        profile: true,
        stylePreferences: true,
        bodyProfile: true,
        colourProfile: true,
        wardrobeItems: true,
        outfits: true,
        savedLooks: true
      }
    });
    
    if (data) {
      delete (data as any).passwordHash;
    }
    
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/account/export' });
    return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
  }
}
