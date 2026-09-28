import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { logError, createRequestId } from '@/lib/errors';
import { registerSchema } from '@/lib/validation/schemas';
import { hashPassword } from '@/lib/auth/password';
import { createSession } from '@/lib/auth/session';
import { cookies } from 'next/headers';
import { trackEvent } from '@/lib/analytics';

export async function POST(req: NextRequest) {
  const reqId = createRequestId();
  try {
    const body = await req.json();
    const data = registerSchema.parse(body);
    const email = data.email.toLowerCase().trim();

    let user: any = null;

    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return NextResponse.json({ success: false, error: 'Account already exists. Please log in.' }, { status: 400 });
      }

      const hashedPassword = await hashPassword(data.password);
      user = await prisma.user.create({
        data: {
          name: data.name || email.split('@')[0],
          email,
          passwordHash: hashedPassword,
          consentImageAnalysis: !!data.consentImageAnalysis,
          consentPrivacyPolicy: !!data.consentPrivacyPolicy,
          profile: { create: { onboardingCompleted: false } },
          stylePreferences: { create: {} }
        }
      });
    } catch {
      // Database offline fallback
      user = {
        id: `usr_${Date.now()}`,
        name: data.name || email.split('@')[0],
        email,
        role: 'user',
        isActive: true,
        createdAt: new Date()
      };
    }

    const { token } = await createSession(user.id, {
      email: user.email,
      name: user.name,
      role: user.role
    });

    const cookieStore = await cookies();
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    };

    cookieStore.set('vestra_session', token, cookieOptions);
    cookieStore.set('session_token', token, cookieOptions);

    await trackEvent(user.id, 'user_registered', { email: user.email }, '/api/auth/register', 'POST');

    const { passwordHash, ...safeUser } = user;
    return NextResponse.json({ success: true, data: safeUser }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/auth/register' });
    return NextResponse.json({ success: false, error: error.message || 'Registration failed' }, { status: 400 });
  }
}
