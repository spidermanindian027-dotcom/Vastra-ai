import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { logError, createRequestId } from '@/lib/errors';
import { requireAuth } from '@/lib/auth/guards';

export async function GET(req: NextRequest) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const history = await prisma.tryonGeneration.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    return NextResponse.json({ success: true, data: history }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/tryon/history' });
    return NextResponse.json({ success: false, error: 'Failed to fetch try-on history' }, { status: 500 });
  }
}
