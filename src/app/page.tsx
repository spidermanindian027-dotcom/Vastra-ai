"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Camera, Zap, Check, Shirt, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f5f0e8] overflow-x-hidden">
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
  { title: "Scan", desc: "Simply snap a photo of your outfit.", icon: <Camera className="w-24 h-24 text-[#8b5cf6]" /> },
  { title: "Get Your Style Score", desc: "Receive an objective score.", icon: <Zap className="w-24 h-24 text-[#8b5cf6]" /> },
  { title: "Understand Why", desc: "Detailed breakdowns.", icon: <Check className="w-24 h-24 text-[#8b5cf6]" /> },
  { title: "Build Your Digital Wardrobe", desc: "Digitize your closet.", icon: <Shirt className="w-24 h-24 text-[#8b5cf6]" /> },
  { title: "Your Personal AI Stylist", desc: "Chat with our intelligent stylist.", icon: <Sparkles className="w-24 h-24 text-[#8b5cf6]" /> }
];
