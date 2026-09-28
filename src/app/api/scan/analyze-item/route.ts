import { NextRequest, NextResponse } from 'next/server';
import { logError, createRequestId } from '@/lib/errors';
import { requireAuth } from '@/lib/auth/guards';
import { getAIProvider } from '@/lib/ai/provider';
import { getStorageProvider } from '@/lib/storage';

export async function POST(req: NextRequest) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    
    const storage = getStorageProvider();
    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await storage.upload(buffer, file.name || `item-${Date.now()}.jpg`, file.type || 'image/jpeg');
    
    const ai = getAIProvider();
    const classification = await ai.classifyClothing(url);
    
    // Sample styling combinations based on classified item
    const combinations = [
      {
        lookTitle: 'Look 1 — Street Minimal',
        items: ['Black Straight-Fit Trousers', 'Clean White Sneakers', 'Silver Watch', 'Minimal Sunglasses'],
        whyItWorks: 'High-contrast monochrome palette allows the garment texture to stand out as the hero piece.'
      },
      {
        lookTitle: 'Look 2 — Smart Casual Layering',
        items: ['Charcoal Tailored Trousers', 'Suede Penny Loafers', 'Minimalist Leather Cardholder'],
        whyItWorks: 'Sophisticated neutral tones ground the silhouette for versatile all-day wear.'
      },
      {
        lookTitle: 'Look 3 — Relaxed Weekend Chic',
        items: ['Light-Wash Relaxed Denim', 'Chunky Retro Runners', 'Woven Cord Bracelet'],
        whyItWorks: 'Casual proportions create an effortless, laid-back vibe without looking unkempt.'
      }
    ];
    
    return NextResponse.json({ 
      success: true, 
      data: { 
        url, 
        classification,
        suggestedCombinations: combinations
      } 
    }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/scan/analyze-item' });
    return NextResponse.json({ success: false, error: 'Failed to analyze item' }, { status: 500 });
  }
}
