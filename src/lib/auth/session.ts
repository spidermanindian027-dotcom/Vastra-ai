import crypto from 'crypto';
import { prisma } from '../db/prisma';
import { SessionUser } from '../../types';

const SECRET = process.env.SESSION_SECRET || 'vestra-ai-fallback-secret-key-32-chars-long-minimum';
export const SESSION_MAX_AGE = process.env.SESSION_MAX_AGE ? parseInt(process.env.SESSION_MAX_AGE, 10) : 60 * 60 * 24 * 7; // 7 days

interface TokenPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
  exp: number;
}

function signPayload(payload: TokenPayload): string {
  const json = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const hmac = crypto.createHmac('sha256', SECRET).update(json).digest('base64url');
  return `${json}.${hmac}`;
}

function verifyPayload(token: string): TokenPayload | null {
  try {
    const [json, hmac] = token.split('.');
    if (!json || !hmac) return null;
    const expected = crypto.createHmac('sha256', SECRET).update(json).digest('base64url');
    if (hmac !== expected) return null;
    const payload: TokenPayload = JSON.parse(Buffer.from(json, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function createSession(
  userId: string,
  userMeta?: { email?: string; name?: string; role?: string },
  ipAddress?: string,
  userAgent?: string
) {
  const email = userMeta?.email || 'user@vestra.ai';
  const name = userMeta?.name || 'Vestra Member';
  const role = userMeta?.role || (email.toLowerCase().includes('admin') ? 'admin' : 'user');
  const exp = Date.now() + SESSION_MAX_AGE * 1000;

  const payload: TokenPayload = { userId, email, name, role, exp };
  const token = signPayload(payload);
  const expiresAt = new Date(exp);

  try {
    await prisma.session.create({
      data: {
        userId,
        token,
        expiresAt,
        ipAddress: ipAddress || '127.0.0.1',
        userAgent: userAgent || 'Vestra Browser',
      },
    }).catch(() => {
      // Gracefully continue in demo/offline mode if DB is unavailable
    });
  } catch {
    // Ignore DB session write errors in offline mode
  }

  const session = { id: userId, userId, token, expiresAt, ipAddress, userAgent, createdAt: new Date() };
  return { token, session };
}

export async function validateSession(token: string): Promise<SessionUser | null> {
  if (!token) return null;

  // 1. Verify signed token payload
  const payload = verifyPayload(token);
  if (payload) {
    return {
      id: payload.userId,
      email: payload.email,
      name: payload.name,
      role: payload.role as any,
    };
  }

  // 2. Fallback check in database if DB is reachable
  try {
    const session = await prisma.session.findFirst({
      where: {
        token,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    }).catch(() => null);

    if (session && session.user) {
      return {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role as any,
      };
    }
  } catch {
    // Ignore DB errors
  }

  return null;
}

export async function deleteSession(token: string) {
  try {
    await prisma.session.deleteMany({
      where: { token },
    }).catch(() => {});
  } catch {
    // Ignore
  }
}

export async function deleteUserSessions(userId: string) {
  try {
    await prisma.session.deleteMany({
      where: { userId },
    }).catch(() => {});
  } catch {
    // Ignore
  }
}

export async function cleanExpiredSessions() {
  try {
    await prisma.session.deleteMany({
      where: {
        expiresAt: { lte: new Date() },
      },
    }).catch(() => {});
  } catch {
    // Ignore
  }
}
