import fs from 'fs';
import path from 'path';

export interface StorageProvider {
  upload(file: Buffer, fileName: string, contentType: string): Promise<string>;
  delete(fileUrl: string): Promise<void>;
  getUrl(fileUrl: string): string;
  getSignedUrl(fileUrl: string): Promise<string>;
}

export class LocalStorageProvider implements StorageProvider {
  async upload(file: Buffer, fileName: string, contentType: string): Promise<string> {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const safeName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = path.join(uploadDir, safeName);
    fs.writeFileSync(filePath, file);
    return `/uploads/${safeName}`;
  }

  async delete(fileUrl: string): Promise<void> {
    try {
      if (fileUrl.startsWith('/uploads/')) {
        const filePath = path.join(process.cwd(), 'public', fileUrl);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    } catch {
      // Ignore delete errors in local dev
    }
  }

  getUrl(fileUrl: string): string {
    return fileUrl;
  }

  async getSignedUrl(fileUrl: string): Promise<string> {
    return fileUrl;
  }
}

export class S3StorageProvider implements StorageProvider {
  async upload(file: Buffer, fileName: string, contentType: string): Promise<string> {
    const endpoint = process.env.STORAGE_ENDPOINT || 'https://s3.amazonaws.com';
    const bucket = process.env.STORAGE_BUCKET || 'vestra-uploads';
    return `${endpoint}/${bucket}/${fileName}`;
  }

  async delete(fileUrl: string): Promise<void> {
    // S3 delete implementation
  }

  getUrl(fileUrl: string): string {
    return fileUrl;
  }

  async getSignedUrl(fileUrl: string): Promise<string> {
    return fileUrl;
  }
}

export class StorageFactory {
  static getProvider(): StorageProvider {
    if (process.env.STORAGE_PROVIDER === 's3' && process.env.STORAGE_ACCESS_KEY) {
      return new S3StorageProvider();
    }
    return new LocalStorageProvider();
  }
}

export const getStorageProvider = (): StorageProvider => StorageFactory.getProvider();
