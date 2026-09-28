import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { logError, createRequestId } from '@/lib/errors';
import { requireAuth } from '@/lib/auth/guards';
import { getAIProvider } from '@/lib/ai/provider';
import { getStorageProvider } from '@/lib/storage';

export async function GET(req: NextRequest) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const favouritesOnly = searchParams.get('favourite') === 'true';

    const where: any = { userId: user.id };
    if (category && category !== 'all') {
      where.category = category as any;
    }
    if (favouritesOnly) {
      where.isFavourite = true;
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { dominantColour: { contains: search, mode: 'insensitive' } },
        { style: { contains: search, mode: 'insensitive' } }
      ];
    }

    const items = await prisma.wardrobeItem.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, data: items }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/wardrobe' });
    return NextResponse.json({ success: false, error: 'Failed to fetch wardrobe items' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const customName = formData.get('name') as string;
    const customCategory = formData.get('category') as string;
    
    if (!file) return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    
    const storage = getStorageProvider();
    const buffer = Buffer.from(await file.arrayBuffer());
    const safeName = `${user.id}-wardrobe-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const url = await storage.upload(buffer, safeName, file.type || 'image/jpeg');
    
    const ai = getAIProvider();
    const tags = await ai.classifyClothing(url);

    const categoryMap: Record<string, any> = {
      'shirt': 'shirt',
      't_shirt': 't_shirt',
      'top': 'top',
      'pants': 'pants',
      'jeans': 'jeans',
      'trousers': 'trousers',
      'shorts': 'shorts',
      'dress': 'dress',
      'skirt': 'skirt',
      'jacket': 'jacket',
      'overshirt': 'overshirt',
      'sweater': 'sweater',
      'hoodie': 'hoodie',
      'shoes': 'shoes',
      'boots': 'boots',
      'watch': 'watch',
      'sunglasses': 'sunglasses',
      'cap': 'cap',
      'bag': 'bag',
      'jewellery': 'jewellery',
      'other_accessory': 'other_accessory'
    };

    const finalCategory = customCategory && categoryMap[customCategory] 
      ? categoryMap[customCategory] 
      : 'shirt';
    
    const itemName = customName || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ") || 'Wardrobe Item';

    const item = await prisma.wardrobeItem.create({
      data: {
        userId: user.id,
        name: itemName,
        imageUrl: url,
        category: finalCategory,
        dominantColour: (tags as any).dominantColour || (tags as any).color || 'Navy Blue',
        pattern: 'solid',
        fit: 'relaxed',
        formality: 'casual',
        season: 'all_season',
        aiTags: [finalCategory, (tags as any).dominantColour || 'dark', 'smart_casual']
      }
    });
    
    return NextResponse.json({ success: true, data: item }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/wardrobe' });
    return NextResponse.json({ success: false, error: 'Failed to create wardrobe item' }, { status: 500 });
  }
}
