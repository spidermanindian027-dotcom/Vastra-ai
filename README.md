# VESTRA AI

> **"See it. Style it. Own it."**

VESTRA AI is a production-ready, AI-powered personal fashion stylist built for Gen Z and modern users. It combines outfit scanning, body/colour profiling, wardrobe management, virtual try-on, and AI-driven style recommendations into a premium dark-luxury web application.

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Folder Structure](#folder-structure)
5. [Prerequisites](#prerequisites)
6. [Environment Variables](#environment-variables)
7. [PostgreSQL Setup](#postgresql-setup)
8. [Prisma Setup](#prisma-setup)
9. [Database Migration](#database-migration)
10. [Seeding the Database](#seeding-the-database)
11. [Running Locally](#running-locally)
12. [AI Integration](#ai-integration)
13. [Storage Integration](#storage-integration)
14. [Maps Integration](#maps-integration)
15. [Authentication](#authentication)
16. [Admin Dashboard](#admin-dashboard)
17. [Demo Mode](#demo-mode)
18. [Testing](#testing)
19. [Deployment](#deployment)
20. [Security](#security)
21. [Troubleshooting](#troubleshooting)

---

## Overview

VESTRA AI is not a basic outfit-rating website. It is a **premium AI fashion studio** that understands:

- **Your proportions** — body shape, build, silhouette recommendations
- **Your colours** — skin undertone, complementary palette, colours to avoid
- **Your wardrobe** — every item catalogued, tagged, and searchable
- **Your style** — preferences, favourites, occasion needs
- **Your context** — location, weather, event, time of day

The application delivers professional-grade fashion advice through an editorial, luxury dark interface.

---

## Features

### Core Features
- Email/Password Authentication with secure sessions
- Camera Access for outfit capture with body-framing guides
- AI Outfit Scanner with 10-point weighted scoring
- Digital Wardrobe with 20+ clothing categories
- AI Stylist Chat using your profile context
- Virtual Try-On architecture
- Location-Aware Styling with occasion recommendations
- Style Analytics and outfit history

### AI Analysis
- Outfit scoring (colour harmony, fit, coordination, occasion, accessories, style)
- Body shape and proportion analysis (Fashion Fit Profile)
- Skin tone and colour palette analysis
- Single clothing item identification and combination suggestions
- Wardrobe-aware outfit matching
- Personalized style recommendations

### Admin Dashboard
- User analytics and activity monitoring
- Location-based usage map with heat visualization
- Error monitoring with severity filters
- AI request tracking
- Single-admin security enforcement

### Privacy and Data Control
- Consent-based image analysis
- Account deletion
- Data export
- Photo deletion
- Privacy policy and terms

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind CSS |
| UI | shadcn/ui components, Radix UI, Lucide icons |
| Animation | Framer Motion |
| Charts | Recharts |
| Backend | Next.js API Routes (server-side) |
| ORM | Prisma |
| Database | PostgreSQL |
| Auth | bcrypt hashing, HTTP-only session cookies |
| Validation | Zod schemas |
| Storage | Local / S3-compatible (MinIO, R2, etc.) |
| AI | Provider abstraction (OpenAI, Google, Anthropic) |
| Maps | Google Maps / Mapbox ready architecture |

---

## Folder Structure

```
vestra-ai/
├── database/
│   ├── schema.sql
│   └── seed.sql
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/uploads/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── (auth)/
│   │   ├── (app)/
│   │   │   ├── dashboard/
│   │   │   ├── scan/
│   │   │   ├── wardrobe/
│   │   │   ├── looks/
│   │   │   ├── stylist/
│   │   │   ├── my-style/
│   │   │   ├── try-on/
│   │   │   ├── occasion/
│   │   │   ├── profile/
│   │   │   └── onboarding/
│   │   ├── (admin)/
│   │   └── api/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── camera/
│   │   ├── outfit/
│   │   ├── wardrobe/
│   │   ├── charts/
│   │   ├── maps/
│   │   ├── profile/
│   │   ├── stylist/
│   │   ├── tryon/
│   │   ├── auth/
│   │   ├── onboarding/
│   │   └── dashboard/
│   ├── hooks/
│   ├── lib/
│   │   ├── ai/
│   │   ├── auth/
│   │   ├── db/
│   │   ├── errors/
│   │   ├── storage/
│   │   ├── validation/
│   │   ├── analytics/
│   │   ├── location/
│   │   └── utils.ts
│   ├── types/
│   └── middleware.ts
├── tests/
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

---

## Prerequisites

- Node.js 18.17 or later
- PostgreSQL 14 or later
- npm 9 or later

---

## Environment Variables

Copy the example:

```bash
cp .env.example .env
```

Key variables:

| Variable | Description | Required |
|----------|-------------|----------|
| DATABASE_URL | PostgreSQL connection string | Yes |
| SESSION_SECRET | Random string (64+ chars) | Yes |
| ADMIN_EMAIL | Admin account email | Yes |
| ADMIN_PASSWORD | Admin account password | Yes |
| AI_PROVIDER | demo, openai, google, anthropic | Yes |
| AI_API_KEY | API key for AI provider | No (demo mode) |
| STORAGE_PROVIDER | local or s3 | Yes |

---

## PostgreSQL Setup

### Local PostgreSQL

```bash
psql -U postgres -c "CREATE DATABASE vestra_ai;"
psql -U postgres -d vestra_ai -f database/schema.sql
psql -U postgres -d vestra_ai -f database/seed.sql
```

### Docker

```bash
docker run --name vestra-db \
  -e POSTGRES_DB=vestra_ai \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:16
```

---

## Prisma Setup

```bash
npx prisma generate
npx prisma db push
npx prisma studio
```

---

## Database Migration

```bash
npx prisma migrate dev --name init
npx prisma migrate deploy
```

---

## Seeding the Database

```bash
npx prisma db seed
```

Default accounts created:
- Admin: admin@vestra.ai / VestraAdmin@2024!
- Demo: alex@example.com / DemoUser@2024!

---

## Running Locally

```bash
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
npm run dev
```

Open http://localhost:3000

---

## AI Integration

Provider abstraction supports swapping AI backends:

| Provider | Config |
|----------|--------|
| Demo | AI_PROVIDER=demo |
| OpenAI | AI_PROVIDER=openai |
| Google AI | AI_PROVIDER=google |
| Anthropic | AI_PROVIDER=anthropic |

Demo mode returns realistic mock data without API keys.

---

## Storage Integration

Development: `STORAGE_PROVIDER=local` (saves to public/uploads/)

Production: `STORAGE_PROVIDER=s3` with S3-compatible endpoints

---

## Maps Integration

Set `GOOGLE_MAPS_API_KEY` or `MAPBOX_ACCESS_TOKEN` for production maps. Demo mode uses built-in SVG visualization.

---

## Authentication

- bcrypt password hashing (12 rounds)
- HTTP-only secure cookies
- Server-side session validation
- Password requirements: 8+ chars, uppercase, lowercase, number, special char
- Middleware route protection
- RBAC: user and admin roles

---

## Admin Dashboard

Single admin enforced by database constraint. Access at /admin after logging in as admin.

Features: User analytics, location map, error monitoring, AI request tracking.

---

## Demo Mode

Set `AI_PROVIDER=demo` and `DEMO_MODE=true`. All features work with realistic mock data, no API keys required.

---

## Testing

```bash
npm test
npx jest --coverage
```

Test suites: Auth, Admin, Wardrobe, AI, Upload

---

## Deployment

### Vercel

```bash
vercel
```

### Production Checklist

- Set NODE_ENV=production
- Set strong SESSION_SECRET
- Change admin credentials
- Configure PostgreSQL with SSL
- Set up S3 storage
- Configure AI provider
- Enable HTTPS
- Set up database backups

---

## Security

- bcrypt password hashing
- HTTP-only secure cookies
- Zod input validation
- Prisma parameterized queries
- File type/size/MIME validation
- Server-side RBAC
- No secrets in frontend
- Single admin database constraint

---

## Troubleshooting

**Database connection**: Check DATABASE_URL and that PostgreSQL is running.

**Prisma client**: Run `npx prisma generate`.

**Camera not working**: Requires HTTPS in production.

**AI empty results**: Check AI_PROVIDER setting.

**Admin access**: Run seed script, verify role in database.

---

Built with care by the VESTRA AI team.
