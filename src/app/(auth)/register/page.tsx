"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [consent, setConsent] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          confirmPassword,
          consentImageAnalysis: consent,
          consentPrivacyPolicy: consent,
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Registration failed. Please try again.');
        setLoading(false);
        return;
      }

      // Successful registration - redirect to onboarding
      window.location.href = '/onboarding';
    } catch {
      setError('Unable to reach server. Please check your connection.');
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md bg-[#1a1a1a] border-white/10 text-white shadow-2xl my-8">
      <CardHeader className="text-center space-y-2">
        <div className="font-bold tracking-widest text-2xl mb-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-[#8b5cf6]">
          VESTRA AI
        </div>
        <CardTitle className="text-2xl font-serif">Create Account</CardTitle>
        <CardDescription className="text-gray-400">Start your personalized styling journey today.</CardDescription>
      </CardHeader>
      <form onSubmit={handleRegister}>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 text-red-300 rounded-md text-sm">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Full Name</label>
            <Input 
              required 
              placeholder="Alex Morgan"
              className="bg-[#0d0d0d] border-white/10 focus-visible:ring-[#8b5cf6] text-white" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <label className="text-sm text-gray-300">Password</label>
            <Input 
              type="password" 
              required 
              placeholder="Minimum 8 characters"
              className="bg-[#0d0d0d] border-white/10 focus-visible:ring-[#8b5cf6] text-white" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Confirm Password</label>
            <Input 
              type="password" 
              required 
              placeholder="Re-enter password"
              className="bg-[#0d0d0d] border-white/10 focus-visible:ring-[#8b5cf6] text-white" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          
          <div className="flex items-start space-x-2 pt-2">
            <Checkbox 
              id="terms" 
              checked={consent}
              onCheckedChange={(checked) => setConsent(!!checked)}
              className="border-white/20 data-[state=checked]:bg-[#8b5cf6]" 
            />
            <label htmlFor="terms" className="text-xs text-gray-400 leading-tight cursor-pointer">
              I consent to fashion image analysis and agree to the <Link href="/privacy" className="text-[#8b5cf6] hover:underline">Privacy Policy</Link> and <Link href="/terms" className="text-[#8b5cf6] hover:underline">Terms of Service</Link>.
            </label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            type="submit" 
            className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-medium py-2.5 transition-all shadow-lg shadow-purple-900/30" 
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </Button>
          <p className="text-sm text-gray-400 text-center">
            Already have an account? <Link href="/login" className="text-[#8b5cf6] hover:underline font-medium">Log In</Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
