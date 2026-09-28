import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { logError, createRequestId } from '@/lib/errors';
import { requireAuth } from '@/lib/auth/guards';

export async function POST(req: NextRequest) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    
    await prisma.userProfile.upsert({
      where: { userId: user.id },
      update: { onboardingCompleted: true },
      create: { userId: user.id, onboardingCompleted: true }
    });
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/profile/onboarding' });
    return NextResponse.json({ success: false, error: 'Failed to complete onboarding' }, { status: 500 });
  }
}
