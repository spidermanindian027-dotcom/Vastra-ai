import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { logError, createRequestId } from '@/lib/errors';
import { requireAuth } from '@/lib/auth/guards';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const { id } = await params;
    const item = await prisma.wardrobeItem.findUnique({ where: { id } });
    if (!item || item.userId !== user.id) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: item }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/wardrobe/[id]' });
    return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const { id } = await params;
    const body = await req.json();
    const existing = await prisma.wardrobeItem.findUnique({ where: { id } });
    if (!existing || existing.userId !== user.id) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    
    const item = await prisma.wardrobeItem.update({
      where: { id },
      data: {
        name: body.name !== undefined ? body.name : existing.name,
        dominantColour: body.dominantColour !== undefined ? body.dominantColour : existing.dominantColour,
        style: body.style !== undefined ? body.style : existing.style,
        fit: body.fit !== undefined ? body.fit : existing.fit,
        formality: body.formality !== undefined ? body.formality : existing.formality,
        season: body.season !== undefined ? body.season : existing.season,
        brand: body.brand !== undefined ? body.brand : existing.brand,
      }
    });
    return NextResponse.json({ success: true, data: item }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/wardrobe/[id]' });
    return NextResponse.json({ success: false, error: 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const { id } = await params;
    const existing = await prisma.wardrobeItem.findUnique({ where: { id } });
    if (!existing || existing.userId !== user.id) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    
    await prisma.wardrobeItem.delete({ where: { id } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/wardrobe/[id]' });
    return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
  }
}
