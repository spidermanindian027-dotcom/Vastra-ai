import { 
  OutfitAnalysisResult, 
  BodyProfile, 
  ColourProfile, 
  WardrobeItem,
  StyleChatMessage 
} from '../../types';
import { DemoAIProvider } from './demo-provider';

export interface AIProvider {
  analyzeOutfit(imageUrl: string, occasion?: string): Promise<OutfitAnalysisResult>;
  analyzeBody(imageUrl: string): Promise<Partial<BodyProfile>>;
  analyzeColour(imageUrl: string): Promise<Partial<ColourProfile>>;
  classifyClothing(imageUrl: string): Promise<Partial<WardrobeItem>>;
  generateStyling(preferences: any, wardrobe: any[]): Promise<any[]>;
  generateOutfitRecommendations(profile: any, wardrobe: any[], location?: string, occasion?: string): Promise<any>;
  chat(messages: StyleChatMessage[], context: any): Promise<string>;
  generateTryOn(personImageUrl: string, clothingImageUrl: string): Promise<string>;
  checkImageQuality(imageUrl: string): Promise<{ isGood: boolean; issues: string[] }>;
}

export class AIProviderFactory {
  static getProvider(): AIProvider {
    return new DemoAIProvider();
  }
}

export const getAIProvider = (): AIProvider => AIProviderFactory.getProvider();
