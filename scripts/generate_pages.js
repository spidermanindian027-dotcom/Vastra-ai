const fs = require('fs');
const path = require('path');

const root = 'c:\\Users\\Harshil Parmar\\Music\\fashion\\vestra-ai\\src\\app';

const files = {
  'layout.tsx': `import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VESTRA AI - See it. Style it. Own it.',
  description: 'AI styling built around your wardrobe, proportions, colours and real life.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={\`\${inter.className} bg-[#0d0d0d] text-[#f5f0e8] antialiased min-h-screen\`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
`,
  'page.tsx': `"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Camera, ArrowRight, Sparkles, Shirt, Zap, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f5f0e8] overflow-x-hidden">
      {/* Header */}
      <header className="absolute top-0 w-full flex justify-between items-center p-6 md:px-12 z-50">
        <div className="font-bold tracking-widest text-xl">VESTRA AI</div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-[#f5f0e8]">Log In</Button>
          </Link>
          <Link href="/register">
            <Button className="bg-[#8b5cf6] text-white hover:bg-[#7c3aed]">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center px-6 md:px-24 pt-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#8b5cf6]/10 to-transparent pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl z-10"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-6">
            <span className="block text-gray-400">Your look.</span>
            <span className="block text-[#f5f0e8]">Understood.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl font-light">
            AI styling built around your wardrobe, proportions, colours and real life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-[#8b5cf6] text-white hover:bg-[#7c3aed] text-lg px-8 py-6 rounded-full w-full sm:w-auto">
                <Camera className="mr-2 h-6 w-6" /> Scan My Look
              </Button>
            </Link>
            <Link href="/wardrobe">
              <Button size="lg" variant="outline" className="border-gray-700 text-[#f5f0e8] hover:bg-white/5 text-lg px-8 py-6 rounded-full w-full sm:w-auto">
                Explore My Wardrobe
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Feature Sections */}
      <div className="py-24 px-6 md:px-24 space-y-32">
        {features.map((feature, idx) => (
          <motion.section 
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-12 items-center"
          >
            <div className="md:w-1/2">
              <div className="text-[#8b5cf6] font-mono text-xl mb-4">0{idx + 1}</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">{feature.title}</h2>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed">{feature.desc}</p>
            </div>
            <div className="md:w-1/2 h-80 bg-[#1a1a1a] rounded-3xl border border-white/10 flex items-center justify-center p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#8b5cf6]/20 to-transparent opacity-50" />
              {feature.icon}
            </div>
          </motion.section>
        ))}
      </div>

      <footer className="border-t border-white/10 py-12 px-6 md:px-24 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-bold tracking-widest text-xl text-gray-500">VESTRA AI</div>
        <div className="flex gap-6 text-sm text-gray-500">
          <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition">Terms</Link>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: "Scan",
    desc: "Simply snap a photo of your outfit. Our AI instantly recognizes items, fit, colours, and style context.",
    icon: <Camera className="w-24 h-24 text-[#8b5cf6]" />
  },
  {
    title: "Get Your Style Score",
    desc: "Receive an objective score based on color harmony, proportions, and modern styling principles.",
    icon: <Zap className="w-24 h-24 text-[#8b5cf6]" />
  },
  {
    title: "Understand Why",
    desc: "Detailed breakdowns of what works and what doesn't, teaching you the fundamentals of personal style.",
    icon: <Check className="w-24 h-24 text-[#8b5cf6]" />
  },
  {
    title: "Build Your Digital Wardrobe",
    desc: "Digitize your closet effortlessly. Keep track of what you own and discover new combinations.",
    icon: <Shirt className="w-24 h-24 text-[#8b5cf6]" />
  },
  {
    title: "Your Personal AI Stylist",
    desc: "Chat with our intelligent stylist for occasion-specific recommendations tailored to your wardrobe.",
    icon: <Sparkles className="w-24 h-24 text-[#8b5cf6]" />
  }
];
`,
  '(auth)/layout.tsx': `export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center p-4">
      {children}
    </div>
  );
}`,
  '(auth)/login/page.tsx': `"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Mock login
    setTimeout(() => {
      if (email === 'admin@vestra.ai') {
        router.push('/admin');
      } else if (password.length < 6) {
        setError('Wrong password. Please try again.');
        setLoading(false);
      } else {
        router.push('/dashboard');
      }
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md bg-[#1a1a1a] border-white/10 text-white">
      <CardHeader className="text-center space-y-2">
        <div className="font-bold tracking-widest text-2xl mb-4">VESTRA AI</div>
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription className="text-gray-400">Enter your credentials to access your stylist.</CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent className="space-y-4">
          {error && <div className="p-3 bg-red-500/20 text-red-400 rounded-md text-sm">{error}</div>}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Email</label>
            <Input 
              type="email" 
              required 
              className="bg-[#0d0d0d] border-white/10 focus-visible:ring-[#8b5cf6]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Password</label>
            <Input 
              type="password" 
              required 
              className="bg-[#0d0d0d] border-white/10 focus-visible:ring-[#8b5cf6]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </Button>
          <p className="text-sm text-gray-400 text-center">
            Don't have an account? <Link href="/register" className="text-[#8b5cf6] hover:underline">Register</Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}`,
  '(auth)/register/page.tsx': `"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md bg-[#1a1a1a] border-white/10 text-white my-8">
      <CardHeader className="text-center space-y-2">
        <div className="font-bold tracking-widest text-2xl mb-4">VESTRA AI</div>
        <CardTitle className="text-2xl">Create Account</CardTitle>
        <CardDescription className="text-gray-400">Start your style journey today.</CardDescription>
      </CardHeader>
      <form onSubmit={handleRegister}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Full Name</label>
            <Input required className="bg-[#0d0d0d] border-white/10 focus-visible:ring-[#8b5cf6]" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Email</label>
            <Input type="email" required className="bg-[#0d0d0d] border-white/10 focus-visible:ring-[#8b5cf6]" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Password</label>
            <Input type="password" required className="bg-[#0d0d0d] border-white/10 focus-visible:ring-[#8b5cf6]" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Confirm Password</label>
            <Input type="password" required className="bg-[#0d0d0d] border-white/10 focus-visible:ring-[#8b5cf6]" />
          </div>
          
          <div className="flex items-start space-x-2 pt-4">
            <Checkbox id="terms" required className="border-white/20 data-[state=checked]:bg-[#8b5cf6]" />
            <label htmlFor="terms" className="text-xs text-gray-400 leading-tight">
              I consent to image analysis and agree to the <Link href="/privacy" className="text-[#8b5cf6]">Privacy Policy</Link> and <Link href="/terms" className="text-[#8b5cf6]">Terms of Service</Link>.
            </label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </Button>
          <p className="text-sm text-gray-400 text-center">
            Already have an account? <Link href="/login" className="text-[#8b5cf6] hover:underline">Log In</Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}`,
  '(app)/layout.tsx': `"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Camera, Shirt, MessageSquare, User, LayoutGrid } from 'lucide-react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Scan', href: '/scan', icon: Camera },
    { name: 'Wardrobe', href: '/wardrobe', icon: Shirt },
    { name: 'Looks', href: '/looks', icon: LayoutGrid },
    { name: 'Stylist', href: '/stylist', icon: MessageSquare },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f5f0e8] flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col fixed h-full border-r border-white/10 bg-[#0d0d0d] p-6 z-40">
        <div className="font-bold tracking-widest text-xl mb-12">VESTRA AI</div>
        <nav className="space-y-2 flex-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link key={item.name} href={item.href} 
                className={\`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors \${isActive ? 'bg-[#8b5cf6]/10 text-[#8b5cf6]' : 'text-gray-400 hover:text-white hover:bg-white/5'}\`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 pb-24 md:pb-0 min-h-screen">
        {children}
      </main>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 w-full bg-[#1a1a1a]/90 backdrop-blur-md border-t border-white/10 flex justify-around p-4 z-50">
        {navItems.slice(0, 5).map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link key={item.name} href={item.href} className={\`flex flex-col items-center gap-1 \${isActive ? 'text-[#8b5cf6]' : 'text-gray-500'}\`}>
              <item.icon className="w-6 h-6" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}`,
  '(app)/dashboard/page.tsx': `"use client";
import { motion } from 'framer-motion';
import { Camera, Shirt, MessageSquare, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  const greeting = new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <header>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-2"
        >
          {greeting}, Alex.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400"
        >
          Your style score is trending upwards this week.
        </motion.p>
      </header>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: 'Scan Outfit', icon: Camera, href: '/scan', color: 'bg-blue-500/10 text-blue-400' },
          { title: 'Add Item', icon: Shirt, href: '/wardrobe', color: 'bg-green-500/10 text-green-400' },
          { title: 'Ask Stylist', icon: MessageSquare, href: '/stylist', color: 'bg-[#8b5cf6]/10 text-[#8b5cf6]' },
          { title: 'Try On', icon: Sparkles, href: '/try-on', color: 'bg-amber-500/10 text-amber-400' }
        ].map((action, i) => (
          <Link key={i} href={action.href}>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-white/20 transition-colors"
            >
              <div className={\`p-4 rounded-full \${action.color}\`}>
                <action.icon className="w-6 h-6" />
              </div>
              <span className="font-medium text-sm md:text-base">{action.title}</span>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card className="bg-[#1a1a1a] border-white/5 text-white">
            <CardHeader>
              <CardTitle className="text-lg">Recent Looks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {[85, 92, 78].map((score, i) => (
                  <div key={i} className="space-y-2">
                    <div className="aspect-[3/4] bg-gray-800 rounded-lg animate-pulse" />
                    <div className="flex justify-between items-center px-1">
                      <span className="text-xs text-gray-400">Oct {12 - i}</span>
                      <span className="text-xs font-bold text-[#8b5cf6]">{score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-8">
          <Card className="bg-[#1a1a1a] border-white/5 text-white">
            <CardHeader>
              <CardTitle className="text-lg">Style Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-gray-400 mb-1">Primary Style</div>
                <div className="font-medium">Minimalist Streetwear</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Average Score</div>
                <div className="text-3xl font-bold text-[#8b5cf6]">84.2</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}`,
  '(app)/scan/page.tsx': `"use client";
import { useState } from 'react';
import { Camera, Upload, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function ScanPage() {
  const [step, setStep] = useState<'select' | 'analyzing' | 'result'>('select');

  const handleScan = () => {
    setStep('analyzing');
    setTimeout(() => setStep('result'), 2500);
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto min-h-[80vh] flex flex-col">
      <h1 className="text-3xl font-bold mb-8">Scan Outfit</h1>

      {step === 'select' && (
        <div className="flex-1 grid md:grid-cols-2 gap-6">
          <Card className="bg-[#1a1a1a] border-white/5 hover:border-[#8b5cf6]/50 cursor-pointer transition-colors group" onClick={handleScan}>
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[400px] gap-6 text-white">
              <div className="w-24 h-24 rounded-full bg-[#8b5cf6]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Camera className="w-10 h-10 text-[#8b5cf6]" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Use Camera</h3>
                <p className="text-gray-400 text-sm">Take a full body photo now</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-white/5 hover:border-white/20 cursor-pointer transition-colors group" onClick={handleScan}>
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[400px] gap-6 text-white">
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload className="w-10 h-10 text-gray-300" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Upload Photo</h3>
                <p className="text-gray-400 text-sm">Choose from gallery</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {step === 'analyzing' && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-20 h-20 border-4 border-t-[#8b5cf6] border-r-[#8b5cf6] border-b-transparent border-l-transparent rounded-full mb-8"
          />
          <h2 className="text-2xl font-bold mb-2 animate-pulse">Analyzing Proportions...</h2>
          <p className="text-gray-400">Evaluating color harmony and fit</p>
        </div>
      )}

      {step === 'result' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-[#8b5cf6]/20 border-4 border-[#8b5cf6] text-5xl font-bold text-white shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              88
            </div>
            <h2 className="text-2xl font-bold">Great Look!</h2>
            <p className="text-gray-400">Your colour coordination is on point.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-[#1a1a1a] border-green-500/20 text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-green-400 mb-4">What Works</h3>
                <ul className="space-y-2 text-gray-300 list-disc list-inside">
                  <li>Excellent contrast between top and bottom</li>
                  <li>Proportions elongate your silhouette</li>
                  <li>Minimalist accessories fit the aesthetic</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#8b5cf6]/20 text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-[#8b5cf6] mb-4">How to Improve</h3>
                <ul className="space-y-2 text-gray-300 list-disc list-inside">
                  <li>Try a slightly chunkier shoe to balance the wide leg trousers</li>
                  <li>Adding a silver chain would complete the neckline</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center gap-4 pt-8">
            <Button variant="outline" onClick={() => setStep('select')} className="border-white/10 text-white hover:bg-white/5">Scan Another</Button>
            <Button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white">Save Look</Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}`,
  '(app)/wardrobe/page.tsx': `"use client";
import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function WardrobePage() {
  const categories = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Shoes', 'Accessories'];
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Digital Wardrobe</h1>
        <Button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Item
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Search items, colors, brands..." 
            className="w-full bg-[#1a1a1a] border-white/10 pl-10 focus-visible:ring-[#8b5cf6]"
          />
        </div>
        <Button variant="outline" className="border-white/10 text-white bg-[#1a1a1a] hover:bg-white/5">
          <Filter className="w-4 h-4 mr-2" /> Sort
        </Button>
      </div>

      <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={\`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors \${activeTab === cat ? 'bg-white text-black' : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-white/5'}\`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 pt-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="group cursor-pointer">
            <div className="aspect-square bg-[#1a1a1a] rounded-xl overflow-hidden relative border border-white/5 group-hover:border-white/20 transition-all">
              <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                Image {i}
              </div>
            </div>
            <div className="mt-3">
              <h4 className="font-medium text-sm truncate">Black Oversized Tee</h4>
              <p className="text-xs text-gray-400">Tops • Cotton</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  '(app)/stylist/page.tsx': `"use client";
import { useState } from 'react';
import { Send, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function StylistPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your VESTRA AI stylist. What are we dressing for today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Based on your wardrobe, I recommend pairing those dark wash jeans with your cream oversized sweater. It matches your minimalist style profile perfectly.' }]);
    }, 1500);
  };

  const prompts = [
    "What goes with my brown shirt?",
    "Give me a streetwear look",
    "What to wear for a date?",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-screen p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#8b5cf6]/20 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-[#8b5cf6]" />
        </div>
        <div>
          <h1 className="text-xl font-bold">AI Stylist</h1>
          <p className="text-xs text-green-400">Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pb-4 scrollbar-hide">
        {messages.map((msg, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={i} 
            className={\`flex \${msg.role === 'user' ? 'justify-end' : 'justify-start'}\`}
          >
            <div className={\`max-w-[80%] rounded-2xl p-4 \${msg.role === 'user' ? 'bg-[#8b5cf6] text-white' : 'bg-[#1a1a1a] border border-white/10 text-gray-200'}\`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
      </div>

      {messages.length === 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {prompts.map(prompt => (
            <button 
              key={prompt}
              onClick={() => { setInput(prompt); handleSend(); }}
              className="text-xs bg-[#1a1a1a] border border-white/10 text-gray-300 px-3 py-2 rounded-full hover:bg-white/5 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSend} className="relative mt-2">
        <Button type="button" variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white hover:bg-white/5">
          <ImageIcon className="w-5 h-5" />
        </Button>
        <Input 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask your stylist..." 
          className="w-full bg-[#1a1a1a] border-white/10 pl-12 pr-12 py-6 rounded-full focus-visible:ring-[#8b5cf6]"
        />
        <Button type="submit" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}`
};

Object.entries(files).forEach(([filePath, content]) => {
  const fullPath = path.join(root, filePath);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(fullPath, content);
  console.log(\`Created: \${fullPath}\`);
});
