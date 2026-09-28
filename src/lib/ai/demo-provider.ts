import { AIProvider } from './provider';
import { 
  OutfitAnalysisResult, 
  BodyProfile, 
  ColourProfile, 
  WardrobeItem,
  StyleChatMessage,
  FormalityLevel,
  BodyShape,
  ColourUndertone,
  SeasonType,
  WardrobeCategory,
  ClothingFit,
  PatternType,
  VisualBuild,
  MuscleDevelopment
} from '../../types';
import { sleep } from '../utils';

export class DemoAIProvider implements AIProvider {
  async analyzeOutfit(imageUrl: string, occasion?: string): Promise<OutfitAnalysisResult> {
    await sleep(1000);
    return {
      totalScore: 8.4,
      scoreBreakdown: {
        colourHarmony: 8.7,
        fitProportions: 8.5,
        coordination: 8.6,
        occasion: 7.8,
        accessories: 8.0,
        styleCoherence: 8.9
      },
      goodPoints: [
        'The navy top gives strong contrast against lighter trousers, creating visual depth.',
        'Shoulder seam sits precisely at the natural shoulder line, maintaining clean proportions.',
        'Minimalist silver accents tie the overall streetwear palette together seamlessly.'
      ],
      badPoints: [
        'Oversized upper half slightly unbalances the tapered trousers silhouette.',
        'Footwear selection is a bit too casual for evening and smart-casual transitions.'
      ],
      improvements: [
        'Switch to relaxed straight-fit charcoal trousers to balance the upper volume.',
        'Add a structured minimalist layer or structured crossbody bag.',
        'Opt for clean leather low-top sneakers or minimal leather loafers.'
      ],
      formalityLevel: FormalityLevel.SMART_CASUAL
    };
  }

  async analyzeBody(imageUrl: string): Promise<Partial<BodyProfile>> {
    await sleep(800);
    return {
      bodyShape: BodyShape.INVERTED_TRIANGLE,
      visualBuild: VisualBuild.BROAD,
      muscleDevelopment: MuscleDevelopment.HIGH,
      aiAnalyzed: true,
      confidence: 82.5,
      recommendedSilhouettes: ['straight', 'relaxed', 'structured'],
      suggestedTops: ['Relaxed crewnecks', 'Structured overshirts', 'Cuban collar shirts'],
      suggestedBottoms: ['Straight-leg denim', 'Wide pleated trousers', 'Tailored chinos'],
      avoidStyles: ['Ultra-skinny jeans', 'Heavy padded shoulder blazers']
    } as any;
  }

  async analyzeColour(imageUrl: string): Promise<Partial<ColourProfile>> {
    await sleep(800);
    return {
      undertone: ColourUndertone.NEUTRAL,
      confidence: 71.0,
      bestColours: ['Cream', 'Navy', 'Forest Green', 'Muted Burgundy', 'Warm Grey'],
      neutralColours: ['Off-White', 'Charcoal', 'Muted Black', 'Camel'],
      accentColours: ['Rust', 'Deep Teal', 'Burnt Amber'],
      avoidColours: ['Icy Blue', 'Harsh Neon Green', 'Fluorescent Pink'],
      recommendedColours: ['Cream', 'Navy', 'Forest Green', 'Muted Burgundy'],
      aiAnalyzed: true
    } as any;
  }

  async classifyClothing(imageUrl: string): Promise<Partial<WardrobeItem>> {
    await sleep(800);
    return {
      category: WardrobeCategory.TOPS,
      color: 'Navy Blue',
      pattern: PatternType.SOLID,
      fit: ClothingFit.RELAXED,
      formality: FormalityLevel.SMART_CASUAL,
      season: SeasonType.ALL_SEASON
    } as any;
  }

  async generateStyling(preferences: any, wardrobe: any[]): Promise<any[]> {
    await sleep(800);
    return [
      {
        title: 'Editorial Smart Casual',
        items: wardrobe.slice(0, 3).map(w => w.id),
        description: 'Navy structured shirt paired with relaxed chinos and minimal white sneakers.',
        whyItWorks: 'Tonal cohesion with contrasting textures balances silhouette proportions.'
      },
      {
        title: 'Urban Street Minimal',
        items: wardrobe.slice(1, 4).map(w => w.id),
        description: 'Oversized tee, charcoal trousers, silver watch, and low-profile sneakers.',
        whyItWorks: 'Clean contemporary streetwear without loud logos or visual clutter.'
      }
    ];
  }

  async generateOutfitRecommendations(profile: any, wardrobe: any[], location?: string, occasion?: string): Promise<any> {
    await sleep(1000);
    const loc = location || 'Current Location';
    const occ = occasion || 'Smart Casual Event';
    return {
      occasion: occ,
      location: loc,
      primaryLook: {
        title: `${occ} — Signature Fit`,
        recommendedOutfit: 'Navy Oxford Overshirt + Relaxed Trousers in Sand Beige + Crisp White Tee',
        footwear: 'Minimalist leather sneakers or suede loafers',
        accessories: 'Silver link watch and slim black sunglasses',
        palette: ['Navy Blue', 'Sand Beige', 'Crisp White', 'Burnished Silver'],
        whyItWorks: `Perfect balance of comfort and understated luxury for ${loc}. Breathable fabrics prevent overheating while structured tailoring retains sophistication.`,
        matchingWardrobeItems: wardrobe.slice(0, 2).map(w => w.name)
      },
      backupLook: {
        title: `${occ} — Casual Alternative`,
        recommendedOutfit: 'Black Heavyweight Crewneck + Straight-Leg Selvedge Denim',
        footwear: 'Chunky Derby shoes or monochrome runners',
        accessories: 'Minimal leather cardholder and matte cuff',
        whyItWorks: 'Effortless fallback styling that maintains modern proportions.'
      }
    };
  }

  async chat(messages: StyleChatMessage[], context: any): Promise<string> {
    await sleep(800);
    const lastMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';
    if (lastMsg.includes('brown')) {
      return "For a rich brown top or shirt, pair it with cream or off-white relaxed trousers to create a warm, luxury editorial contrast. Ground the look with black leather loafers and a silver or vintage gold timepiece.";
    }
    if (lastMsg.includes('wedding')) {
      return "For a modern wedding guest look, opt for a tailored unstructured suit in deep olive or slate navy with a crisp spread-collar ecru shirt. Skip the stiff tie and complete with polished oxblood or dark brown monk straps.";
    }
    if (lastMsg.includes('streetwear')) {
      return "To nail modern luxury streetwear: start with an oversized heavyweight boxy tee, straight-cut dark wash selvedge denim, a silver chain, and clean low-profile skate or heritage sneakers. Keep branding minimal for maximum impact.";
    }
    return "Looking at your wardrobe and proportion profile: focus on balancing relaxed fits with structured anchor pieces. Try pairing your navy top with relaxed stone-beige trousers and clean sneakers for an effortless 9/10 score.";
  }

  async generateTryOn(personImageUrl: string, clothingImageUrl: string): Promise<string> {
    await sleep(1200);
    return personImageUrl || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80';
  }

  async checkImageQuality(imageUrl: string): Promise<{ isGood: boolean; issues: string[] }> {
    await sleep(300);
    return {
      isGood: true,
      issues: []
    };
  }
}
