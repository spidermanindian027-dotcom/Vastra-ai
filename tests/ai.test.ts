import { AIProviderFactory } from '../src/lib/ai/provider';
import { DemoAIProvider } from '../src/lib/ai/demo-provider';

describe('AI Service Tests', () => {
  let provider: DemoAIProvider;

  beforeEach(() => {
    provider = AIProviderFactory.getProvider() as DemoAIProvider;
  });

  test('checkImageQuality returns expected response', async () => {
    const result = await provider.checkImageQuality('https://example.com/test.jpg');
    expect(result).toHaveProperty('isGood');
    expect(result).toHaveProperty('issues');
  });

  test('analyzeOutfit returns score breakdown on 10-point scale', async () => {
    const result = await provider.analyzeOutfit('https://example.com/test.jpg');
    expect(result.totalScore).toBeGreaterThanOrEqual(0);
    expect(result.totalScore).toBeLessThanOrEqual(10);
    expect(result.scoreBreakdown).toBeDefined();
    expect(result.goodPoints.length).toBeGreaterThan(0);
    expect(result.badPoints.length).toBeGreaterThan(0);
    expect(result.improvements.length).toBeGreaterThan(0);
  });
});
