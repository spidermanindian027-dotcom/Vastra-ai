import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { logError, createRequestId } from '@/lib/errors';
import { requireAdmin } from '@/lib/auth/guards';

export async function GET(req: NextRequest) {
  const reqId = createRequestId();
  try {
    await requireAdmin(req);
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    
    const users = await prisma.user.findMany({
      where: search ? { 
        OR: [
          { email: { contains: search, mode: 'insensitive' } },
          { name: { contains: search, mode: 'insensitive' } }
        ]
      } : {},
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
        _count: {
          select: { wardrobeItems: true, outfits: true, aiRequests: true, savedLooks: true }
        }
      }
    });
    
    const total = await prisma.user.count({
      where: search ? {
        OR: [
          { email: { contains: search, mode: 'insensitive' } },
          { name: { contains: search, mode: 'insensitive' } }
        ]
      } : {}
    });
    
    return NextResponse.json({ success: true, data: users, total, page, limit }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/admin/users' });
    return NextResponse.json({ success: false, error: 'Failed to fetch users' }, { status: 500 });
  }
}
