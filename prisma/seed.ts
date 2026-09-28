import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@vestra.ai';
  const adminPassword = process.env.ADMIN_PASSWORD || 'VestraAdmin@2024!';
  
  // Check if admin already exists
  const existingAdmin = await prisma.user.findFirst({ where: { role: 'admin' } });
  if (existingAdmin) {
    console.log('Admin already exists, skipping seed.');
    return;
  }
  
  const passwordHash = await bcrypt.hash(adminPassword, 12);
  
  // Create admin
  const admin = await prisma.user.create({
    data: {
      name: 'VESTRA Admin',
      email: adminEmail,
      passwordHash,
      role: 'admin',
      isActive: true,
      emailVerified: true,
      consentImageAnalysis: true,
      consentPrivacyPolicy: true,
      profile: { create: { onboardingCompleted: true } },
    },
  });
  console.log('Admin created:', admin.email);
  
  // Create demo user
  const demoHash = await bcrypt.hash('DemoUser@2024!', 12);
  const demo = await prisma.user.create({
    data: {
      name: 'Alex Morgan',
      email: 'alex@example.com',
      passwordHash: demoHash,
      role: 'user',
      isActive: true,
      emailVerified: true,
      consentImageAnalysis: true,
      consentPrivacyPolicy: true,
      profile: { create: { gender: 'male', ageGroup: 'age_18_24', onboardingCompleted: true } },
      stylePreferences: { create: {
        preferredStyles: ['minimal', 'streetwear', 'smart_casual'],
        favouriteColours: ['black', 'navy', 'white', 'charcoal'],
        dislikedColours: ['neon_green', 'hot_pink'],
        preferredFits: ['relaxed', 'slim'],
      }},
      bodyProfile: { create: {
        visualBuild: 'athletic',
        bodyShape: 'inverted_triangle',
        muscleDev: 'fit_defined',
        shoulderProportion: 'broad',
        recommendedSilhouettes: ['straight', 'relaxed', 'structured'],
        confidence: 82.5,
      }},
      colourProfile: { create: {
        undertone: 'neutral',
        bestColours: ['cream', 'navy', 'forest green', 'muted burgundy'],
        neutralColours: ['white', 'black', 'charcoal', 'beige'],
        accentColours: ['rust', 'teal', 'deep olive'],
        avoidColours: ['icy blue', 'neon shades'],
        confidence: 71.0,
      }},
      wardrobeItems: { create: [
        { name: 'White Oversized T-Shirt', category: 't_shirt', dominantColour: 'White', pattern: 'solid', style: 'Streetwear', fit: 'oversized', formality: 'casual', season: 'all_season' },
        { name: 'Black Slim Jeans', category: 'jeans', dominantColour: 'Black', pattern: 'solid', style: 'Minimal', fit: 'slim', formality: 'casual', season: 'all_season' },
        { name: 'Navy Oxford Shirt', category: 'shirt', dominantColour: 'Navy Blue', pattern: 'solid', style: 'Smart Casual', fit: 'regular', formality: 'smart_casual', season: 'all_season' },
        { name: 'Charcoal Trousers', category: 'trousers', dominantColour: 'Charcoal', pattern: 'solid', style: 'Formal', fit: 'tailored', formality: 'semi_formal', season: 'autumn' },
        { name: 'White Sneakers', category: 'shoes', dominantColour: 'White', pattern: 'solid', style: 'Minimal', fit: 'regular', formality: 'casual', season: 'all_season' },
        { name: 'Black Leather Jacket', category: 'jacket', dominantColour: 'Black', pattern: 'solid', style: 'Streetwear', fit: 'slim', formality: 'casual', season: 'autumn' },
        { name: 'Silver Watch', category: 'watch', dominantColour: 'Silver', pattern: 'solid', style: 'Minimal', fit: 'regular', formality: 'smart_casual', season: 'all_season' },
        { name: 'Black Sunglasses', category: 'sunglasses', dominantColour: 'Black', pattern: 'solid', style: 'Minimal', fit: 'regular', formality: 'casual', season: 'summer' },
        { name: 'Beige Chinos', category: 'trousers', dominantColour: 'Beige', pattern: 'solid', style: 'Smart Casual', fit: 'relaxed', formality: 'smart_casual', season: 'spring' },
        { name: 'Grey Hoodie', category: 'hoodie', dominantColour: 'Grey', pattern: 'solid', style: 'Streetwear', fit: 'oversized', formality: 'casual', season: 'winter' },
      ]},
    },
  });
  console.log('Demo user created:', demo.email);
  
  // Create demo locations
  await prisma.location.createMany({
    data: [
      { name: 'Ahmedabad', city: 'Ahmedabad', region: 'Gujarat', country: 'India', latitude: 23.0225, longitude: 72.5714 },
      { name: 'Mumbai', city: 'Mumbai', region: 'Maharashtra', country: 'India', latitude: 19.076, longitude: 72.8777 },
      { name: 'Delhi', city: 'Delhi', region: 'Delhi', country: 'India', latitude: 28.7041, longitude: 77.1025 },
      { name: 'Vadodara', city: 'Vadodara', region: 'Gujarat', country: 'India', latitude: 22.3072, longitude: 73.1812 },
      { name: 'Rajkot', city: 'Rajkot', region: 'Gujarat', country: 'India', latitude: 22.3039, longitude: 70.8022 },
    ],
  });
  console.log('Locations seeded');
  
  console.log('Seed completed successfully!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
