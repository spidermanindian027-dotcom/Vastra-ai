export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export enum GenderType {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NON_BINARY = 'NON_BINARY',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY'
}

export enum AgeGroup {
  GEN_Z = 'GEN_Z',
  MILLENNIAL = 'MILLENNIAL',
  GEN_X = 'GEN_X',
  BOOMER = 'BOOMER'
}

export enum BodyShape {
  HOURGLASS = 'HOURGLASS',
  PEAR = 'PEAR',
  APPLE = 'APPLE',
  RECTANGLE = 'RECTANGLE',
  INVERTED_TRIANGLE = 'INVERTED_TRIANGLE'
}

export enum VisualBuild {
  SLIGHT = 'SLIGHT',
  AVERAGE = 'AVERAGE',
  BROAD = 'BROAD',
  HEAVY = 'HEAVY'
}

export enum MuscleDevelopment {
  LOW = 'LOW',
  AVERAGE = 'AVERAGE',
  HIGH = 'HIGH'
}

export enum ColourUndertone {
  COOL = 'COOL',
  WARM = 'WARM',
  NEUTRAL = 'NEUTRAL'
}

export enum WardrobeCategory {
  TOPS = 'TOPS',
  BOTTOMS = 'BOTTOMS',
  DRESSES = 'DRESSES',
  OUTERWEAR = 'OUTERWEAR',
  SHOES = 'SHOES',
  ACCESSORIES = 'ACCESSORIES'
}

export enum ClothingFit {
  TIGHT = 'TIGHT',
  SLIM = 'SLIM',
  REGULAR = 'REGULAR',
  RELAXED = 'RELAXED',
  OVERSIZED = 'OVERSIZED'
}

export enum FormalityLevel {
  CASUAL = 'CASUAL',
  SMART_CASUAL = 'SMART_CASUAL',
  BUSINESS_CASUAL = 'BUSINESS_CASUAL',
  BUSINESS = 'BUSINESS',
  FORMAL = 'FORMAL',
  BLACK_TIE = 'BLACK_TIE'
}

export enum SeasonType {
  SPRING = 'SPRING',
  SUMMER = 'SUMMER',
  AUTUMN = 'AUTUMN',
  WINTER = 'WINTER',
  ALL_SEASON = 'ALL_SEASON'
}

export enum PatternType {
  SOLID = 'SOLID',
  STRIPED = 'STRIPED',
  CHECKERED = 'CHECKERED',
  FLORAL = 'FLORAL',
  POLKA_DOT = 'POLKA_DOT',
  ANIMAL_PRINT = 'ANIMAL_PRINT',
  GEOMETRIC = 'GEOMETRIC',
  OTHER = 'OTHER'
}

export enum TryonStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export enum ErrorSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum AIRequestType {
  OUTFIT_ANALYSIS = 'OUTFIT_ANALYSIS',
  BODY_ANALYSIS = 'BODY_ANALYSIS',
  COLOUR_ANALYSIS = 'COLOUR_ANALYSIS',
  CLOTHING_CLASSIFICATION = 'CLOTHING_CLASSIFICATION',
  STYLE_GENERATION = 'STYLE_GENERATION',
  TRYON = 'TRYON',
  CHAT = 'CHAT'
}

export enum AIRequestStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface UserProfile {
  id: string;
  userId: string;
  gender?: GenderType;
  ageGroup?: AgeGroup;
  consentImageAnalysis: boolean;
  consentPrivacyPolicy: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StylePreference {
  id: string;
  userId: string;
  preferredStyles: string[];
  avoidStyles: string[];
  formalityLevels: FormalityLevel[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BodyProfile {
  id: string;
  userId: string;
  bodyShape?: BodyShape;
  visualBuild?: VisualBuild;
  muscleDevelopment?: MuscleDevelopment;
  heightCm?: number;
  weightKg?: number;
  aiAnalyzed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ColourProfile {
  id: string;
  userId: string;
  undertone?: ColourUndertone;
  season?: SeasonType;
  recommendedColours: string[];
  avoidColours: string[];
  aiAnalyzed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WardrobeItem {
  id: string;
  userId: string;
  imageUrl: string;
  category: WardrobeCategory;
  subcategory?: string;
  color?: string;
  fit?: ClothingFit;
  pattern?: PatternType;
  season?: SeasonType;
  formality?: FormalityLevel;
  brand?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Outfit {
  id: string;
  userId: string;
  imageUrl: string;
  occasion?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OutfitScoreBreakdown {
  colourHarmony: number;
  fitProportions: number;
  coordination: number;
  occasion: number;
  accessories: number;
  styleCoherence: number;
}

export interface OutfitAnalysisResult {
  totalScore: number;
  scoreBreakdown: OutfitScoreBreakdown;
  goodPoints: string[];
  badPoints: string[];
  improvements: string[];
  formalityLevel: FormalityLevel;
}

export interface OutfitAnalysis {
  id: string;
  outfitId: string;
  result: OutfitAnalysisResult;
  createdAt: Date;
}

export interface SavedLook {
  id: string;
  userId: string;
  imageUrl: string;
  source: string;
  notes?: string;
  createdAt: Date;
}

export interface TryonGeneration {
  id: string;
  userId: string;
  personImageUrl: string;
  clothingImageUrl: string;
  resultImageUrl?: string;
  status: TryonStatus;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  id: string;
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
  createdAt: Date;
}

export interface LocationUsageEvent {
  id: string;
  userId: string;
  locationId: string;
  eventType: string;
  occasion?: string;
  createdAt: Date;
}

export interface AIRequest {
  id: string;
  userId?: string;
  requestType: AIRequestType;
  status: AIRequestStatus;
  provider: string;
  tokensUsed?: number;
  processingTimeMs?: number;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ErrorLog {
  id: string;
  userId?: string;
  severity: ErrorSeverity;
  errorCode: string;
  message: string;
  stackTrace?: string;
  metadata?: any;
  createdAt: Date;
}

export interface AdminAuditLog {
  id: string;
  adminId: string;
  action: string;
  targetId?: string;
  metadata?: any;
  createdAt: Date;
}

export interface StyleChatMessage {
  id: string;
  userId: string;
  role: 'USER' | 'ASSISTANT';
  content: string;
  createdAt: Date;
}
