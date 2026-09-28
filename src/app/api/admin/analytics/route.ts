import { NextRequest, NextResponse } from 'next/server';
import { logError, createRequestId } from '@/lib/errors';
import { requireAdmin } from '@/lib/auth/guards';
import { getUsersPerDay, getScansPerDay, getPopularStyles, getErrorStats } from '@/lib/analytics';

export async function GET(req: NextRequest) {
  const reqId = createRequestId();
  try {
    await requireAdmin(req);
    
    const [usersPerDay, scansPerDay, popularStyles, errorsOverTime] = await Promise.all([
      getUsersPerDay(7),
      getScansPerDay(7),
      getPopularStyles(),
      getErrorStats(7)
    ]);
    
    return NextResponse.json({
      success: true,
      data: {
        usersPerDay,
        scansPerDay,
        popularStyles,
        errorsOverTime
      }
    }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/admin/analytics' });
    return NextResponse.json({ success: false, error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
