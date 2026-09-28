import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { logError, createRequestId } from '@/lib/errors';
import { requireAuth } from '@/lib/auth/guards';
import { getAIProvider } from '@/lib/ai/provider';

export async function POST(req: NextRequest) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const body = await req.json();
    const { message, image } = body;
    
    if (!message) {
      return NextResponse.json({ success: false, error: 'Message is required' }, { status: 400 });
    }

    const ai = getAIProvider();
    
    // Save user message to database
    await prisma.styleChatMessage.create({
      data: {
        userId: user.id,
        role: 'user',
        content: message,
        imageUrl: image || null
      }
    });

    const [profile, preferences, wardrobe] = await Promise.all([
      prisma.userProfile.findUnique({ where: { userId: user.id } }),
      prisma.stylePreference.findUnique({ where: { userId: user.id } }),
      prisma.wardrobeItem.findMany({ where: { userId: user.id }, take: 20 })
    ]);
    
    const replyText = await ai.chat(
      [{ id: '1', userId: user.id, role: 'user', content: message, createdAt: new Date() } as any],
      { profile, preferences, wardrobe }
    );

    // Save assistant reply to database
    const assistantMsg = await prisma.styleChatMessage.create({
      data: {
        userId: user.id,
        role: 'assistant',
        content: replyText
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      data: { 
        reply: replyText,
        message: assistantMsg 
      } 
    }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/stylist/chat' });
    return NextResponse.json({ success: false, error: 'Failed to communicate with AI stylist' }, { status: 500 });
  }
}
