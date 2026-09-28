import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
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
    const occasion = (formData.get('occasion') as string) || 'Everyday Casual';
    
    if (!file) return NextResponse.json({ success: false, error: 'No image file provided' }, { status: 400 });
    
    const storage = getStorageProvider();
    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await storage.upload(buffer, file.name || `scan-${Date.now()}.jpg`, file.type || 'image/jpeg');
    
    const ai = getAIProvider();
    const quality = await ai.checkImageQuality(url);
    if (!quality.isGood) {
      return NextResponse.json({ 
        success: false, 
        error: 'Low image quality: ' + quality.issues.join(', ') 
      }, { status: 422 });
    }

    const analysis = await ai.analyzeOutfit(url, occasion);
    
    const outfit = await prisma.outfit.create({
      data: {
        userId: user.id,
        imageUrl: url,
        occasion,
        styleLabel: analysis.formalityLevel || 'Smart Casual',
        analyses: {
          create: {
            userId: user.id,
            overallScore: analysis.totalScore,
            styleLabel: analysis.formalityLevel || 'Smart Casual',
            confidence: 91.0,
            goodPoints: analysis.goodPoints,
            badPoints: analysis.badPoints,
            improvements: analysis.improvements,
            aiModel: 'vestra-vision-pro',
            aiProvider: 'demo',
            scoreBreakdown: {
              create: {
                colourHarmonyScore: analysis.scoreBreakdown.colourHarmony,
                fitProportionScore: analysis.scoreBreakdown.fitProportions,
                outfitCoordinationScore: analysis.scoreBreakdown.coordination,
                occasionScore: analysis.scoreBreakdown.occasion,
                accessoriesScore: analysis.scoreBreakdown.accessories,
                styleCoherenceScore: analysis.scoreBreakdown.styleCoherence
              }
            }
          }
        }
      },
      include: {
        analyses: {
          include: { scoreBreakdown: true }
        }
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      data: {
        outfit,
        analysis: outfit.analyses[0],
        analysisResult: analysis
      } 
    }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/scan' });
    return NextResponse.json({ success: false, error: 'Failed to analyze outfit' }, { status: 500 });
  }
}
