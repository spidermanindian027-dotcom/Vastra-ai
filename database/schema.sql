-- ============================================================
-- VESTRA AI - Complete PostgreSQL Database Schema
-- "See it. Style it. Own it."
-- ============================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- ENUM TYPES
-- ============================================================

CREATE TYPE user_role AS ENUM ('user', 'admin');
CREATE TYPE gender_type AS ENUM ('male', 'female', 'non_binary', 'prefer_not_to_say');
CREATE TYPE age_group AS ENUM ('13_17', '18_24', '25_34', '35_44', '45_plus');
CREATE TYPE body_shape AS ENUM (
  'rectangle', 'triangle', 'inverted_triangle', 
  'hourglass', 'oval', 'apple'
);
CREATE TYPE visual_build AS ENUM (
  'very_lean', 'lean', 'slim', 'slim_central_fullness',
  'average', 'fit_toned', 'athletic', 'muscular',
  'highly_muscular', 'stocky'
);
CREATE TYPE muscle_development AS ENUM (
  'low', 'moderate', 'fit_defined', 'athletic', 'muscular', 'highly_muscular'
);
CREATE TYPE colour_undertone AS ENUM ('warm', 'cool', 'neutral', 'olive_neutral');
CREATE TYPE wardrobe_category AS ENUM (
  'shirt', 't_shirt', 'top', 'pants', 'jeans', 'trousers',
  'shorts', 'dress', 'skirt', 'jacket', 'overshirt',
  'sweater', 'hoodie', 'shoes', 'boots', 'watch',
  'sunglasses', 'cap', 'bag', 'jewellery', 'other_accessory'
);
CREATE TYPE clothing_fit AS ENUM (
  'slim', 'regular', 'relaxed', 'oversized', 'tailored'
);
CREATE TYPE formality_level AS ENUM (
  'very_casual', 'casual', 'smart_casual', 'semi_formal', 'formal', 'black_tie'
);
CREATE TYPE season_type AS ENUM ('spring', 'summer', 'autumn', 'winter', 'all_season');
CREATE TYPE pattern_type AS ENUM (
  'solid', 'striped', 'checkered', 'plaid', 'floral',
  'polka_dot', 'graphic', 'abstract', 'camouflage', 'other'
);
CREATE TYPE tryon_status AS ENUM ('pending', 'processing', 'completed', 'failed');
CREATE TYPE error_severity AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE ai_request_type AS ENUM (
  'outfit_analysis', 'body_analysis', 'colour_analysis',
  'clothing_classification', 'wardrobe_matching', 'style_chat',
  'virtual_tryon', 'item_analysis', 'occasion_styling',
  'image_quality_check'
);
CREATE TYPE ai_request_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'timeout');

-- ============================================================
-- USERS
-- ============================================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'user',
  is_active BOOLEAN NOT NULL DEFAULT true,
  email_verified BOOLEAN NOT NULL DEFAULT false,
  consent_image_analysis BOOLEAN NOT NULL DEFAULT false,
  consent_privacy_policy BOOLEAN NOT NULL DEFAULT false,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Single admin constraint: only one user can have role 'admin'
CREATE UNIQUE INDEX idx_single_admin ON users ((1)) WHERE role = 'admin';

CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_users_role ON users (role);
CREATE INDEX idx_users_created_at ON users (created_at);
CREATE INDEX idx_users_is_active ON users (is_active);

-- ============================================================
-- SESSIONS
-- ============================================================

CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(512) NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sessions_token ON sessions (token);
CREATE INDEX idx_sessions_user_id ON sessions (user_id);
CREATE INDEX idx_sessions_expires_at ON sessions (expires_at);

-- ============================================================
-- USER PROFILES
-- ============================================================

CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  gender gender_type,
  age_group age_group,
  primary_photo_url TEXT,
  primary_photo_key TEXT,
  bio TEXT,
  onboarding_completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_user_profiles_user_id ON user_profiles (user_id);

-- ============================================================
-- STYLE PREFERENCES
-- ============================================================

CREATE TABLE style_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  preferred_styles TEXT[] DEFAULT '{}',
  favourite_colours TEXT[] DEFAULT '{}',
  disliked_colours TEXT[] DEFAULT '{}',
  preferred_fits TEXT[] DEFAULT '{}',
  favourite_brands TEXT[] DEFAULT '{}',
  favourite_categories TEXT[] DEFAULT '{}',
  preferred_accessories TEXT[] DEFAULT '{}',
  preferred_occasions TEXT[] DEFAULT '{}',
  style_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_style_preferences_user_id ON style_preferences (user_id);

-- ============================================================
-- BODY PROFILES
-- ============================================================

CREATE TABLE body_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  visual_build visual_build,
  body_shape body_shape,
  muscle_dev muscle_development,
  shoulder_proportion VARCHAR(50),
  waist_proportion VARCHAR(50),
  hip_proportion VARCHAR(50),
  recommended_silhouettes TEXT[] DEFAULT '{}',
  suggested_tops TEXT[] DEFAULT '{}',
  suggested_bottoms TEXT[] DEFAULT '{}',
  avoid_styles TEXT[] DEFAULT '{}',
  confidence DECIMAL(5,2),
  analysis_notes TEXT,
  is_user_corrected BOOLEAN NOT NULL DEFAULT false,
  source_image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_body_profiles_user_id ON body_profiles (user_id);

-- ============================================================
-- COLOUR PROFILES
-- ============================================================

CREATE TABLE colour_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  undertone colour_undertone,
  best_colours TEXT[] DEFAULT '{}',
  neutral_colours TEXT[] DEFAULT '{}',
  accent_colours TEXT[] DEFAULT '{}',
  avoid_colours TEXT[] DEFAULT '{}',
  colour_combinations JSONB DEFAULT '[]',
  confidence DECIMAL(5,2),
  is_user_corrected BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_colour_profiles_user_id ON colour_profiles (user_id);

-- ============================================================
-- WARDROBE ITEMS
-- ============================================================

CREATE TABLE wardrobe_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  category wardrobe_category NOT NULL,
  image_url TEXT,
  image_key TEXT,
  thumbnail_url TEXT,
  dominant_colour VARCHAR(100),
  secondary_colour VARCHAR(100),
  pattern pattern_type DEFAULT 'solid',
  texture VARCHAR(100),
  style VARCHAR(100),
  fit clothing_fit,
  formality formality_level,
  season season_type DEFAULT 'all_season',
  brand VARCHAR(255),
  is_favourite BOOLEAN NOT NULL DEFAULT false,
  times_used INTEGER NOT NULL DEFAULT 0,
  ai_tags JSONB DEFAULT '[]',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_wardrobe_items_user_id ON wardrobe_items (user_id);
CREATE INDEX idx_wardrobe_items_category ON wardrobe_items (category);
CREATE INDEX idx_wardrobe_items_user_category ON wardrobe_items (user_id, category);
CREATE INDEX idx_wardrobe_items_favourite ON wardrobe_items (user_id, is_favourite) WHERE is_favourite = true;

-- ============================================================
-- OUTFITS
-- ============================================================

CREATE TABLE outfits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255),
  image_url TEXT,
  image_key TEXT,
  occasion VARCHAR(255),
  style_label VARCHAR(255),
  colour_palette JSONB DEFAULT '[]',
  notes TEXT,
  is_saved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_outfits_user_id ON outfits (user_id);
CREATE INDEX idx_outfits_user_saved ON outfits (user_id, is_saved) WHERE is_saved = true;
CREATE INDEX idx_outfits_created_at ON outfits (created_at);

-- ============================================================
-- OUTFIT ITEMS (links outfits to wardrobe items)
-- ============================================================

CREATE TABLE outfit_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  outfit_id UUID NOT NULL REFERENCES outfits(id) ON DELETE CASCADE,
  wardrobe_item_id UUID REFERENCES wardrobe_items(id) ON DELETE SET NULL,
  item_description TEXT,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_outfit_items_outfit_id ON outfit_items (outfit_id);
CREATE INDEX idx_outfit_items_wardrobe_item_id ON outfit_items (wardrobe_item_id);

-- ============================================================
-- OUTFIT ANALYSES
-- ============================================================

CREATE TABLE outfit_analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  outfit_id UUID NOT NULL REFERENCES outfits(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  overall_score DECIMAL(4,2),
  style_label VARCHAR(255),
  confidence DECIMAL(5,2),
  good_points JSONB DEFAULT '[]',
  bad_points JSONB DEFAULT '[]',
  improvements JSONB DEFAULT '[]',
  accessory_suggestions JSONB DEFAULT '[]',
  shoe_suggestions JSONB DEFAULT '[]',
  colour_suggestions JSONB DEFAULT '[]',
  style_tags JSONB DEFAULT '[]',
  upgrade_looks JSONB DEFAULT '[]',
  ai_model VARCHAR(100),
  ai_provider VARCHAR(100),
  raw_response JSONB,
  request_id UUID,
  analysis_duration_ms INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_outfit_analyses_outfit_id ON outfit_analyses (outfit_id);
CREATE INDEX idx_outfit_analyses_user_id ON outfit_analyses (user_id);
CREATE INDEX idx_outfit_analyses_score ON outfit_analyses (overall_score);
CREATE INDEX idx_outfit_analyses_created_at ON outfit_analyses (created_at);

-- ============================================================
-- OUTFIT SCORE BREAKDOWNS
-- ============================================================

CREATE TABLE outfit_score_breakdowns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  analysis_id UUID NOT NULL REFERENCES outfit_analyses(id) ON DELETE CASCADE,
  colour_harmony_score DECIMAL(4,2),
  fit_proportion_score DECIMAL(4,2),
  outfit_coordination_score DECIMAL(4,2),
  occasion_score DECIMAL(4,2),
  accessories_score DECIMAL(4,2),
  style_coherence_score DECIMAL(4,2),
  colour_harmony_weight DECIMAL(4,2) DEFAULT 0.20,
  fit_proportion_weight DECIMAL(4,2) DEFAULT 0.25,
  outfit_coordination_weight DECIMAL(4,2) DEFAULT 0.20,
  occasion_weight DECIMAL(4,2) DEFAULT 0.15,
  accessories_weight DECIMAL(4,2) DEFAULT 0.10,
  style_coherence_weight DECIMAL(4,2) DEFAULT 0.10,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_score_breakdowns_analysis_id ON outfit_score_breakdowns (analysis_id);

-- ============================================================
-- STYLE RECOMMENDATIONS
-- ============================================================

CREATE TABLE style_recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  analysis_id UUID REFERENCES outfit_analyses(id) ON DELETE SET NULL,
  recommendation_type VARCHAR(100) NOT NULL,
  title VARCHAR(255),
  description TEXT,
  items JSONB DEFAULT '[]',
  reason TEXT,
  expected_improvement TEXT,
  from_wardrobe BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_style_recommendations_user_id ON style_recommendations (user_id);

-- ============================================================
-- SAVED LOOKS
-- ============================================================

CREATE TABLE saved_looks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  outfit_id UUID REFERENCES outfits(id) ON DELETE SET NULL,
  analysis_id UUID REFERENCES outfit_analyses(id) ON DELETE SET NULL,
  name VARCHAR(255),
  image_url TEXT,
  score DECIMAL(4,2),
  style_label VARCHAR(255),
  occasion VARCHAR(255),
  colour_palette JSONB DEFAULT '[]',
  feedback_summary TEXT,
  is_favourite BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_saved_looks_user_id ON saved_looks (user_id);
CREATE INDEX idx_saved_looks_created_at ON saved_looks (created_at);

-- ============================================================
-- VIRTUAL TRY-ON GENERATIONS
-- ============================================================

CREATE TABLE tryon_generations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  source_photo_url TEXT NOT NULL,
  source_items JSONB DEFAULT '[]',
  wardrobe_item_ids UUID[] DEFAULT '{}',
  generated_image_url TEXT,
  generated_image_key TEXT,
  status tryon_status NOT NULL DEFAULT 'pending',
  ai_model VARCHAR(100),
  ai_provider VARCHAR(100),
  prompt_used TEXT,
  prompt_version VARCHAR(50),
  generation_duration_ms INTEGER,
  error_message TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_tryon_generations_user_id ON tryon_generations (user_id);
CREATE INDEX idx_tryon_generations_status ON tryon_generations (status);
CREATE INDEX idx_tryon_generations_created_at ON tryon_generations (created_at);

-- ============================================================
-- LOCATIONS
-- ============================================================

CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  city VARCHAR(255),
  region VARCHAR(255),
  country VARCHAR(100),
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  timezone VARCHAR(100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_locations_city ON locations (city);
CREATE INDEX idx_locations_coords ON locations (latitude, longitude);

-- ============================================================
-- LOCATION USAGE EVENTS
-- ============================================================

CREATE TABLE location_usage_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
  city VARCHAR(255),
  region VARCHAR(255),
  country VARCHAR(100),
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  event_type VARCHAR(100) NOT NULL,
  occasion VARCHAR(255),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_location_events_user_id ON location_usage_events (user_id);
CREATE INDEX idx_location_events_city ON location_usage_events (city);
CREATE INDEX idx_location_events_created_at ON location_usage_events (created_at);

-- ============================================================
-- AI REQUESTS LOG
-- ============================================================

CREATE TABLE ai_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  request_type ai_request_type NOT NULL,
  status ai_request_status NOT NULL DEFAULT 'pending',
  ai_provider VARCHAR(100),
  ai_model VARCHAR(100),
  prompt_tokens INTEGER,
  completion_tokens INTEGER,
  total_tokens INTEGER,
  duration_ms INTEGER,
  input_summary TEXT,
  output_summary TEXT,
  error_message TEXT,
  request_id UUID DEFAULT uuid_generate_v4(),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_ai_requests_user_id ON ai_requests (user_id);
CREATE INDEX idx_ai_requests_type ON ai_requests (request_type);
CREATE INDEX idx_ai_requests_status ON ai_requests (status);
CREATE INDEX idx_ai_requests_created_at ON ai_requests (created_at);

-- ============================================================
-- USAGE EVENTS
-- ============================================================

CREATE TABLE usage_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  event_type VARCHAR(100) NOT NULL,
  event_data JSONB DEFAULT '{}',
  route VARCHAR(255),
  method VARCHAR(10),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_usage_events_user_id ON usage_events (user_id);
CREATE INDEX idx_usage_events_type ON usage_events (event_type);
CREATE INDEX idx_usage_events_created_at ON usage_events (created_at);

-- ============================================================
-- ERROR LOGS
-- ============================================================

CREATE TABLE error_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  error_type VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  stack_trace TEXT,
  route VARCHAR(255),
  method VARCHAR(10),
  request_id UUID,
  severity error_severity NOT NULL DEFAULT 'medium',
  browser VARCHAR(255),
  device VARCHAR(255),
  status_code INTEGER,
  metadata JSONB DEFAULT '{}',
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX idx_error_logs_severity ON error_logs (severity);
CREATE INDEX idx_error_logs_type ON error_logs (error_type);
CREATE INDEX idx_error_logs_occurred_at ON error_logs (occurred_at);
CREATE INDEX idx_error_logs_resolved ON error_logs (resolved_at) WHERE resolved_at IS NULL;
CREATE INDEX idx_error_logs_route ON error_logs (route);

-- ============================================================
-- ADMIN AUDIT LOGS
-- ============================================================

CREATE TABLE admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action VARCHAR(255) NOT NULL,
  target_type VARCHAR(100),
  target_id UUID,
  details JSONB DEFAULT '{}',
  ip_address INET,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_admin_audit_logs_admin_id ON admin_audit_logs (admin_id);
CREATE INDEX idx_admin_audit_logs_action ON admin_audit_logs (action);
CREATE INDEX idx_admin_audit_logs_created_at ON admin_audit_logs (created_at);

-- ============================================================
-- STYLE CHAT MESSAGES
-- ============================================================

CREATE TABLE style_chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  image_url TEXT,
  ai_request_id UUID REFERENCES ai_requests(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_chat_messages_user_id ON style_chat_messages (user_id);
CREATE INDEX idx_chat_messages_created_at ON style_chat_messages (created_at);

-- ============================================================
-- FUNCTIONS / TRIGGERS
-- ============================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_style_preferences_updated_at BEFORE UPDATE ON style_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_body_profiles_updated_at BEFORE UPDATE ON body_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_colour_profiles_updated_at BEFORE UPDATE ON colour_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wardrobe_items_updated_at BEFORE UPDATE ON wardrobe_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_outfits_updated_at BEFORE UPDATE ON outfits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Prevent more than one admin
CREATE OR REPLACE FUNCTION check_single_admin()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role = 'admin' THEN
    IF EXISTS (SELECT 1 FROM users WHERE role = 'admin' AND id != NEW.id) THEN
      RAISE EXCEPTION 'Only one admin account is allowed';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER enforce_single_admin BEFORE INSERT OR UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION check_single_admin();
