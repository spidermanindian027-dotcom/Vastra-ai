import { requireAdmin } from '../src/lib/auth/guards';
import { UserRole } from '../src/types';

jest.mock('../src/lib/auth/session', () => ({
  validateSession: jest.fn().mockImplementation((token: string) => {
    if (token === 'admin-token') {
      return Promise.resolve({ id: '1', role: 'admin', email: 'admin@test.com' });
    }
    if (token === 'user-token') {
      return Promise.resolve({ id: '2', role: 'user', email: 'user@test.com' });
    }
    return Promise.resolve(null);
  })
}));

describe('Admin Access Control Tests', () => {
  test('requireAdmin throws for non-admin', async () => {
    const req: any = {
      cookies: {
        get: (name: string) => (name === 'session_token' || name === 'vestra_session' ? { value: 'user-token' } : undefined)
      }
    };
    
    await expect(requireAdmin(req)).rejects.toThrow('FORBIDDEN');
  });

  test('requireAdmin succeeds for admin', async () => {
    const req: any = {
      cookies: {
        get: (name: string) => (name === 'session_token' || name === 'vestra_session' ? { value: 'admin-token' } : undefined)
      }
    };
    
    const user = await requireAdmin(req);
    expect(user.role.toLowerCase()).toBe('admin');
  });
});
