import crypto from 'crypto';
import { ErrorSeverity } from '../../types';

export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  AI_PROVIDER_ERROR = 'AI_PROVIDER_ERROR',
  STORAGE_ERROR = 'STORAGE_ERROR'
}

export class AppError extends Error {
  public code: ErrorCode;
  public statusCode: number;
  public metadata?: any;

  constructor(message: string, code: ErrorCode, statusCode: number = 500, metadata?: any) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.metadata = metadata;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function createRequestId(): string {
  return crypto.randomUUID();
}

export async function logError(error: any, context?: any) {
  console.error('Logged Error:', error, context);
  // Implementation to save to error_logs table via Prisma
  /*
  try {
    await prisma.errorLog.create({
      data: {
        severity: ErrorSeverity.HIGH,
        errorCode: error instanceof AppError ? error.code : ErrorCode.INTERNAL_ERROR,
        message: error.message || 'Unknown error',
        stackTrace: error.stack,
        metadata: context,
      }
    });
  } catch(e) {
    console.error("Failed to log error to db", e);
  }
  */
}

export function formatUserError(error: any): string {
  if (error instanceof AppError) {
    if (error.statusCode < 500) {
      return error.message;
    }
    return 'An unexpected error occurred. Please try again later.';
  }
  return 'Something went wrong. Please try again later.';
}
