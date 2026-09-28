import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { logError, createRequestId } from '@/lib/errors';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const reqId = createRequestId();
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('vestra_session')?.value;
    if (token) {
      await prisma.session.deleteMany({ where: { token } });
    }
    cookieStore.delete('vestra_session');
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/auth/logout' });
    return NextResponse.json({ success: false, error: 'Logout failed' }, { status: 500 });
  }
}
