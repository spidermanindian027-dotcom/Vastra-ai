import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { logError, createRequestId } from '@/lib/errors';
import { requireAuth } from '@/lib/auth/guards';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const { id } = await params;
    const existing = await prisma.wardrobeItem.findUnique({ where: { id } });
    if (!existing || existing.userId !== user.id) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    
    const item = await prisma.wardrobeItem.update({
      where: { id },
      data: { isFavourite: !existing.isFavourite }
    });
    return NextResponse.json({ success: true, data: item }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/wardrobe/[id]/favourite' });
    return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
  }
}
