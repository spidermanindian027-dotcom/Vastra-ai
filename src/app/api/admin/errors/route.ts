import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { logError, createRequestId } from '@/lib/errors';
import { requireAdmin } from '@/lib/auth/guards';

export async function GET(req: NextRequest) {
  const reqId = createRequestId();
  try {
    await requireAdmin(req);
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get('filter'); // 'unresolved' | 'resolved' | 'all'
    const severity = searchParams.get('severity');

    const where: any = {};
    if (filter === 'unresolved') {
      where.resolvedAt = null;
    } else if (filter === 'resolved') {
      where.resolvedAt = { not: null };
    }
    if (severity) {
      where.severity = severity;
    }

    const errors = await prisma.errorLog.findMany({
      where,
      orderBy: { occurredAt: 'desc' },
      take: 100
    });
    return NextResponse.json({ success: true, data: errors }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/admin/errors' });
    return NextResponse.json({ success: false, error: 'Failed to fetch errors' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const reqId = createRequestId();
  try {
    const admin = await requireAdmin(req);
    const { id, resolved } = await req.json();
    const errorLog = await prisma.errorLog.update({
      where: { id },
      data: { 
        resolvedAt: resolved ? new Date() : null,
        resolvedBy: resolved ? admin.id : null
      }
    });
    return NextResponse.json({ success: true, data: errorLog }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/admin/errors' });
    return NextResponse.json({ success: false, error: 'Failed to update error' }, { status: 500 });
  }
}
