import { prisma } from '../db/prisma';

export async function trackEvent(userId: string, eventType: string, data: any, route?: string, method?: string) {
  console.log(`Track Event: ${eventType} for User: ${userId}`, data);
  // Implement tracking logic to DB here
}

export async function getAdminOverview() {
  return {
    totalUsers: 150,
    activeUsers: 45,
    scans: 300,
    tryOns: 120
  };
}

export async function getUsersPerDay(days: number) {
  // Mock data for charts
  return Array.from({ length: days }).map((_, i) => ({
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    users: Math.floor(Math.random() * 20)
  })).reverse();
}

export async function getScansPerDay(days: number) {
  return Array.from({ length: days }).map((_, i) => ({
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    scans: Math.floor(Math.random() * 50)
  })).reverse();
}

export async function getPopularStyles() {
  return [
    { style: 'Minimalist', count: 45 },
    { style: 'Streetwear', count: 30 },
    { style: 'Classic', count: 25 },
    { style: 'Avant-Garde', count: 15 }
  ];
}

export async function getErrorStats(days: number) {
  return Array.from({ length: days }).map((_, i) => ({
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    errors: Math.floor(Math.random() * 5)
  })).reverse();
}
