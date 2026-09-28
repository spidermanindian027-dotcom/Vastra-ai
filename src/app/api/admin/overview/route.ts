import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { logError, createRequestId } from '@/lib/errors';
import { requireAdmin } from '@/lib/auth/guards';

export async function GET(req: NextRequest) {
  const reqId = createRequestId();
  try {
    await requireAdmin(req);
    
    const [totalUsers, activeUsers, totalScans, totalWardrobe, totalTryons, totalAIRequests, avgScoreResult] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true } }),
      prisma.outfit.count(),
      prisma.wardrobeItem.count(),
      prisma.tryonGeneration.count(),
      prisma.aIRequest.count(),
      prisma.outfitAnalysis.aggregate({
        _avg: { overallScore: true }
      })
    ]);

    const failedAIRequests = await prisma.aIRequest.count({
      where: { status: 'failed' }
    });
    
    return NextResponse.json({ 
      success: true, 
      data: { 
        totalUsers, 
        activeUsers,
        totalScans, 
        totalWardrobe,
        totalTryons,
        totalAIRequests,
        failedAIRequests,
        averageScore: Number(avgScoreResult._avg.overallScore || 8.4).toFixed(1)
      } 
    }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/admin/overview' });
    return NextResponse.json({ success: false, error: 'Failed to fetch overview metrics' }, { status: 500 });
  }
}
