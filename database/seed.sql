-- ============================================================
-- VESTRA AI - Seed Data for Development
-- ============================================================

-- Insert admin user (password: VestraAdmin@2024 - bcrypt hashed)
-- This hash should be regenerated in production using the seed script
INSERT INTO users (id, name, email, password_hash, role, is_active, email_verified, consent_image_analysis, consent_privacy_policy)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'VESTRA Admin',
  'admin@vestra.ai',
  '$2b$12$LJ3m4ys8Oy6Km8Y8o.YKZeVyJ8QIh8u0tG2VJx6X7m5Fz3Uajivy',
  'admin',
  true,
  true,
  true,
  true
);

-- Insert admin profile
INSERT INTO user_profiles (user_id, onboarding_completed)
VALUES ('a0000000-0000-0000-0000-000000000001', true);

-- Insert demo user (password: DemoUser@2024)
INSERT INTO users (id, name, email, password_hash, role, is_active, email_verified, consent_image_analysis, consent_privacy_policy)
VALUES (
  'b0000000-0000-0000-0000-000000000001',
  'Alex Morgan',
  'alex@example.com',
  '$2b$12$LJ3m4ys8Oy6Km8Y8o.YKZeVyJ8QIh8u0tG2VJx6X7m5Fz3Uajivy',
  'user',
  true,
  true,
  true,
  true
);

-- Insert demo user profile
INSERT INTO user_profiles (user_id, gender, age_group, onboarding_completed)
VALUES ('b0000000-0000-0000-0000-000000000001', 'male', '18_24', true);

-- Insert demo style preferences
INSERT INTO style_preferences (user_id, preferred_styles, favourite_colours, disliked_colours, preferred_fits)
VALUES (
  'b0000000-0000-0000-0000-000000000001',
  ARRAY['minimal', 'streetwear', 'smart_casual'],
  ARRAY['black', 'navy', 'white', 'charcoal', 'cream'],
  ARRAY['neon_green', 'hot_pink'],
  ARRAY['relaxed', 'slim']
);

-- Insert demo body profile
INSERT INTO body_profiles (user_id, visual_build, body_shape, muscle_dev, shoulder_proportion, recommended_silhouettes, confidence)
VALUES (
  'b0000000-0000-0000-0000-000000000001',
  'athletic',
  'inverted_triangle',
  'fit_defined',
  'broad',
  ARRAY['straight', 'relaxed', 'structured'],
  82.5
);

-- Insert demo colour profile
INSERT INTO colour_profiles (user_id, undertone, best_colours, neutral_colours, accent_colours, avoid_colours, confidence)
VALUES (
  'b0000000-0000-0000-0000-000000000001',
  'neutral',
  ARRAY['cream', 'navy', 'forest green', 'muted burgundy', 'warm grey'],
  ARRAY['white', 'black', 'charcoal', 'beige'],
  ARRAY['rust', 'teal', 'deep olive'],
  ARRAY['icy blue', 'neon shades', 'bright orange'],
  71.0
);

-- Insert demo wardrobe items
INSERT INTO wardrobe_items (id, user_id, name, category, dominant_colour, secondary_colour, pattern, style, fit, formality, season)
VALUES 
  ('c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'White Oversized T-Shirt', 't_shirt', 'White', NULL, 'solid', 'Streetwear', 'oversized', 'casual', 'all_season'),
  ('c0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', 'Black Slim Jeans', 'jeans', 'Black', NULL, 'solid', 'Minimal', 'slim', 'casual', 'all_season'),
  ('c0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001', 'Navy Oxford Shirt', 'shirt', 'Navy Blue', NULL, 'solid', 'Smart Casual', 'regular', 'smart_casual', 'all_season'),
  ('c0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000001', 'Charcoal Trousers', 'trousers', 'Charcoal', NULL, 'solid', 'Formal', 'tailored', 'semi_formal', 'autumn'),
  ('c0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000001', 'White Sneakers', 'shoes', 'White', NULL, 'solid', 'Minimal', 'regular', 'casual', 'all_season'),
  ('c0000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000001', 'Black Leather Jacket', 'jacket', 'Black', NULL, 'solid', 'Streetwear', 'slim', 'casual', 'autumn'),
  ('c0000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000001', 'Silver Watch', 'watch', 'Silver', NULL, 'solid', 'Minimal', 'regular', 'smart_casual', 'all_season'),
  ('c0000000-0000-0000-0000-000000000008', 'b0000000-0000-0000-0000-000000000001', 'Black Sunglasses', 'sunglasses', 'Black', NULL, 'solid', 'Minimal', 'regular', 'casual', 'summer'),
  ('c0000000-0000-0000-0000-000000000009', 'b0000000-0000-0000-0000-000000000001', 'Beige Chinos', 'trousers', 'Beige', NULL, 'solid', 'Smart Casual', 'relaxed', 'smart_casual', 'spring'),
  ('c0000000-0000-0000-0000-000000000010', 'b0000000-0000-0000-0000-000000000001', 'Grey Hoodie', 'hoodie', 'Grey', NULL, 'solid', 'Streetwear', 'oversized', 'casual', 'winter');

-- Insert demo outfit with analysis
INSERT INTO outfits (id, user_id, name, occasion, style_label, is_saved, colour_palette)
VALUES (
  'd0000000-0000-0000-0000-000000000001',
  'b0000000-0000-0000-0000-000000000001',
  'Casual Friday Look',
  'Office Casual',
  'Smart Minimal',
  true,
  '["navy", "beige", "white"]'::jsonb
);

INSERT INTO outfit_analyses (id, outfit_id, user_id, overall_score, style_label, confidence, good_points, bad_points, improvements, ai_model, ai_provider)
VALUES (
  'e0000000-0000-0000-0000-000000000001',
  'd0000000-0000-0000-0000-000000000001',
  'b0000000-0000-0000-0000-000000000001',
  8.4,
  'Smart Minimal',
  91.0,
  '["Strong colour contrast between navy top and beige trousers creates visual depth", "Clean silhouette with well-proportioned fit", "Accessories are minimal and cohesive"]'::jsonb,
  '["Footwear could be more polished for the office setting", "Missing a structured layer for cooler environments"]'::jsonb,
  '["Add a structured blazer in charcoal or navy for layering", "Consider leather loafers instead of sneakers for a smarter finish"]'::jsonb,
  'demo',
  'demo'
);

INSERT INTO outfit_score_breakdowns (analysis_id, colour_harmony_score, fit_proportion_score, outfit_coordination_score, occasion_score, accessories_score, style_coherence_score)
VALUES (
  'e0000000-0000-0000-0000-000000000001',
  8.7, 8.5, 8.6, 7.8, 8.0, 8.9
);

-- Insert demo saved look
INSERT INTO saved_looks (user_id, outfit_id, analysis_id, name, score, style_label, occasion, colour_palette, feedback_summary)
VALUES (
  'b0000000-0000-0000-0000-000000000001',
  'd0000000-0000-0000-0000-000000000001',
  'e0000000-0000-0000-0000-000000000001',
  'Casual Friday Look',
  8.4,
  'Smart Minimal',
  'Office Casual',
  '["navy", "beige", "white"]'::jsonb,
  'Strong colour harmony with clean proportions. Consider upgrading footwear for a more polished finish.'
);

-- Insert demo locations
INSERT INTO locations (name, city, region, country, latitude, longitude)
VALUES 
  ('Ahmedabad', 'Ahmedabad', 'Gujarat', 'India', 23.0225000, 72.5714000),
  ('Mumbai', 'Mumbai', 'Maharashtra', 'India', 19.0760000, 72.8777000),
  ('Delhi', 'Delhi', 'Delhi', 'India', 28.7041000, 77.1025000),
  ('Vadodara', 'Vadodara', 'Gujarat', 'India', 22.3072000, 73.1812000),
  ('Rajkot', 'Rajkot', 'Gujarat', 'India', 22.3039000, 70.8022000);

-- Insert demo location usage
INSERT INTO location_usage_events (user_id, city, region, country, latitude, longitude, event_type, occasion)
VALUES 
  ('b0000000-0000-0000-0000-000000000001', 'Ahmedabad', 'Gujarat', 'India', 23.0225000, 72.5714000, 'outfit_scan', 'casual'),
  ('b0000000-0000-0000-0000-000000000001', 'Ahmedabad', 'Gujarat', 'India', 23.0225000, 72.5714000, 'wardrobe_upload', NULL);
