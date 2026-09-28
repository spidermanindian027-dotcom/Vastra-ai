import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { logError, createRequestId } from '@/lib/errors';
import { requireAuth } from '@/lib/auth/guards';

export async function GET(req: NextRequest) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const outfits = await prisma.outfit.findMany({
      where: { userId: user.id },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { 
        items: { include: { wardrobeItem: true } },
        analyses: { orderBy: { createdAt: 'desc' }, take: 1 }
      }
    });

    const total = await prisma.outfit.count({ where: { userId: user.id } });
    
    return NextResponse.json({ success: true, data: outfits, total, page, limit }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/outfits' });
    return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
  }
}
