import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { logError, createRequestId } from '@/lib/errors';
import { requireAuth } from '@/lib/auth/guards';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const { id } = await params;
    const look = await prisma.savedLook.findUnique({
      where: { id },
      include: { outfit: { include: { items: true } }, analysis: true }
    });
    
    if (!look || look.userId !== user.id) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: look }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/looks/[id]' });
    return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const { id } = await params;
    const existing = await prisma.savedLook.findUnique({ where: { id } });
    
    if (!existing || existing.userId !== user.id) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    
    await prisma.savedLook.delete({ where: { id } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/looks/[id]' });
    return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
  }
}
