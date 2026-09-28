import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { logError, createRequestId } from '@/lib/errors';
import { requireAdmin } from '@/lib/auth/guards';

export async function GET(req: NextRequest) {
  const reqId = createRequestId();
  try {
    await requireAdmin(req);
    
    // Fetch aggregated location usage events
    const events = await prisma.locationUsageEvent.findMany({
      orderBy: { createdAt: 'desc' },
      take: 1000
    });

    // Sample default cities if no events logged yet (Ahmedabad, Mumbai, Delhi, Vadodara, Rajkot)
    const fallbackLocations = [
      { city: 'Ahmedabad', lat: 23.0225, lng: 72.5714, users: 42, scans: 128, aiRequests: 310, usage: 'high' },
      { city: 'Mumbai', lat: 19.0760, lng: 72.8777, users: 68, scans: 215, aiRequests: 540, usage: 'high' },
      { city: 'Delhi', lat: 28.7041, lng: 77.1025, users: 54, scans: 190, aiRequests: 420, usage: 'high' },
      { city: 'Vadodara', lat: 22.3072, lng: 73.1812, users: 19, scans: 45, aiRequests: 110, usage: 'medium' },
      { city: 'Rajkot', lat: 22.3039, lng: 70.8022, users: 14, scans: 32, aiRequests: 75, usage: 'low' },
    ];

    const data = events.length > 0 ? events : fallbackLocations;
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/admin/locations' });
    return NextResponse.json({ success: false, error: 'Failed to fetch locations' }, { status: 500 });
  }
}
