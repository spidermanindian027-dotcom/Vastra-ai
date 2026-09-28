import { NextRequest, NextResponse } from 'next/server';
import { logError, createRequestId } from '@/lib/errors';
import { requireAuth } from '@/lib/auth/guards';
import { getStorageProvider } from '@/lib/storage';

export async function POST(req: NextRequest) {
  const reqId = createRequestId();
  try {
    const user = await requireAuth(req);
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    
    // File validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ success: false, error: 'Invalid file type. Only JPEG, PNG, and WebP are supported.' }, { status: 400 });
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ success: false, error: 'File size exceeds 10MB limit.' }, { status: 400 });
    }

    const storage = getStorageProvider();
    const buffer = Buffer.from(await file.arrayBuffer());
    const safeName = `${user.id}-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const url = await storage.upload(buffer, safeName, file.type);
    
    return NextResponse.json({ success: true, data: { url } }, { status: 200 });
  } catch (error: any) {
    await logError(error, { reqId, route: 'api/upload' });
    return NextResponse.json({ success: false, error: 'File upload failed' }, { status: 500 });
  }
}
