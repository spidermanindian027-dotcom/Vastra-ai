import { wardrobeItemSchema } from '../src/lib/validation/schemas';

describe('Wardrobe Tests', () => {
  test('Wardrobe item validation', () => {
    const validItem = {
      imageUrl: 'https://example.com/image.jpg',
      category: 'TOPS',
      color: '#000000',
    };
    
    const result = wardrobeItemSchema.safeParse(validItem);
    expect(result.success).toBe(true);
    
    const invalidItem = {
      imageUrl: 'not-a-url',
      category: 'TOPS',
    };
    
    const invalidResult = wardrobeItemSchema.safeParse(invalidItem);
    expect(invalidResult.success).toBe(false);
  });
});
