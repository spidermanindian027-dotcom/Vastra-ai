"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Invalid credentials. Please try again.');
        setLoading(false);
        return;
      }

      // Successful login - redirect to appropriate dashboard
      if (data.data?.role === 'admin' || email.includes('admin')) {
        window.location.href = '/admin';
      } else {
        window.location.href = '/dashboard';
      }
    } catch {
      setError('Unable to reach server. Please check your connection.');
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md bg-[#1a1a1a] border-white/10 text-white shadow-2xl">
      <CardHeader className="text-center space-y-2">
        <div className="font-bold tracking-widest text-2xl mb-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-[#8b5cf6]">
          VESTRA AI
        </div>
        <CardTitle className="text-2xl font-serif">Welcome Back</CardTitle>
        <CardDescription className="text-gray-400">Enter your credentials to access your stylist.</CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 text-red-300 rounded-md text-sm">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Email</label>
            <Input 
              type="email" 
              required 
              placeholder="you@example.com"
              className="bg-[#0d0d0d] border-white/10 focus-visible:ring-[#8b5cf6] text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">Password</label>
            </div>
            <Input 
              type="password" 
              required 
              placeholder="••••••••"
              className="bg-[#0d0d0d] border-white/10 focus-visible:ring-[#8b5cf6] text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            type="submit" 
            className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-medium py-2.5 transition-all shadow-lg shadow-purple-900/30" 
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </Button>
          <div className="text-xs text-gray-500 text-center">
            Demo login works with any credentials (e.g. your email or admin@vestra.ai)
          </div>
          <p className="text-sm text-gray-400 text-center">
            Don't have an account? <Link href="/register" className="text-[#8b5cf6] hover:underline font-medium">Register</Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
