import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateSession } from './session';
import { SessionUser } from '../../types';

export async function getSessionUser(request?: NextRequest | Request): Promise<SessionUser | null> {
  let token: string | undefined;
  if (request && 'cookies' in request && typeof (request as any).cookies?.get === 'function') {
    token = (request as NextRequest).cookies.get('vestra_session')?.value || (request as NextRequest).cookies.get('session_token')?.value;
  }
  if (!token) {
    try {
      const cookieStore = await cookies();
      token = cookieStore.get('vestra_session')?.value || cookieStore.get('session_token')?.value;
    } catch {
      // ignore outside request scope
    }
  }
  if (!token) return null;
  return validateSession(token);
}

export async function requireAuth(request?: NextRequest | Request): Promise<SessionUser> {
  const user = await getSessionUser(request);
  if (!user) {
    throw new Error('UNAUTHORIZED');
  }
  return user;
}

export async function requireAdmin(request?: NextRequest | Request): Promise<SessionUser> {
  const user = await requireAuth(request);
  if (user.role?.toLowerCase() !== 'admin') {
    throw new Error('FORBIDDEN');
  }
  return user;
}

type AppRouteHandler = (request: NextRequest, context: any, user?: SessionUser) => Promise<NextResponse> | NextResponse;

export function withAuth(handler: AppRouteHandler) {
  return async (request: NextRequest, context: any) => {
    try {
      const user = await requireAuth(request);
      return handler(request, context, user);
    } catch (error: any) {
      if (error.message === 'UNAUTHORIZED') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  };
}

export function withAdmin(handler: AppRouteHandler) {
  return async (request: NextRequest, context: any) => {
    try {
      const user = await requireAdmin(request);
      return handler(request, context, user);
    } catch (error: any) {
      if (error.message === 'UNAUTHORIZED') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      if (error.message === 'FORBIDDEN') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  };
}
