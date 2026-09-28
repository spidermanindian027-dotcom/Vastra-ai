import { hashPassword, verifyPassword, validatePasswordStrength } from '../src/lib/auth/password';
import { registerSchema } from '../src/lib/validation/schemas';

describe('Auth Tests', () => {
  test('Password validation', () => {
    const valid = validatePasswordStrength('StrongPass123!');
    expect(valid.valid).toBe(true);
    expect(valid.errors).toHaveLength(0);

    const weak = validatePasswordStrength('weak');
    expect(weak.valid).toBe(false);
    expect(weak.errors.length).toBeGreaterThan(0);
  });

  test('Password hashing', async () => {
    const password = 'TestPassword123!';
    const hash = await hashPassword(password);
    
    expect(hash).not.toBe(password);
    
    const isValid = await verifyPassword(password, hash);
    expect(isValid).toBe(true);
    
    const isInvalid = await verifyPassword('WrongPassword123!', hash);
    expect(isInvalid).toBe(false);
  });

  test('Registration schema validation', () => {
    const validData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'StrongPassword123!',
      confirmPassword: 'StrongPassword123!',
      consentImageAnalysis: true,
      consentPrivacyPolicy: true,
    };
    
    const result = registerSchema.safeParse(validData);
    expect(result.success).toBe(true);

    const invalidData = {
      ...validData,
      confirmPassword: 'DifferentPassword123!',
    };
    
    const invalidResult = registerSchema.safeParse(invalidData);
    expect(invalidResult.success).toBe(false);
  });
});
