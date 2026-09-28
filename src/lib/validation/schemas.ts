import { z } from 'zod';

export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: passwordSchema,
  confirmPassword: z.string(),
  gender: z.string().optional(),
  ageGroup: z.string().optional(),
  preferredStyles: z.array(z.string()).optional(),
  consentImageAnalysis: z.boolean().refine(val => val === true, {
    message: "You must consent to image analysis"
  }),
  consentPrivacyPolicy: z.boolean().refine(val => val === true, {
    message: "You must agree to the privacy policy"
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const profileUpdateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  gender: z.string().optional(),
  ageGroup: z.string().optional(),
});

export const wardrobeItemSchema = z.object({
  imageUrl: z.string().url(),
  category: z.string(),
  subcategory: z.string().optional(),
  color: z.string().optional(),
  fit: z.string().optional(),
  pattern: z.string().optional(),
  season: z.string().optional(),
  formality: z.string().optional(),
  brand: z.string().optional(),
});

export const outfitUploadSchema = z.object({
  imageUrl: z.string().url(),
  occasion: z.string().optional(),
});

export const stylePreferenceSchema = z.object({
  preferredStyles: z.array(z.string()),
  avoidStyles: z.array(z.string()),
  formalityLevels: z.array(z.string()),
});

export const bodyProfileSchema = z.object({
  bodyShape: z.string().optional(),
  visualBuild: z.string().optional(),
  muscleDevelopment: z.string().optional(),
  heightCm: z.number().positive().optional(),
  weightKg: z.number().positive().optional(),
});

export const colourProfileSchema = z.object({
  undertone: z.string().optional(),
  season: z.string().optional(),
  recommendedColours: z.array(z.string()),
  avoidColours: z.array(z.string()),
});

export const chatMessageSchema = z.object({
  content: z.string().min(1, "Message cannot be empty"),
});

export const tryonRequestSchema = z.object({
  personImageUrl: z.string().url(),
  clothingImageUrl: z.string().url(),
});

export const locationEventSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  eventType: z.string(),
  occasion: z.string().optional(),
});
