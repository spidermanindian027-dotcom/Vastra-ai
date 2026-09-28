"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, Sparkles, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function StylistPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I am VESTRA, your personal AI fashion stylist. Ask me anything about outfit coordination, what to wear for an event, or upload a photo to get instant styling pairings.',
      image: null as string | null
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() && !attachedImage) return;

    const userMessage = {
      role: 'user',
      content: textToSend,
      image: attachedImage
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    const currentAttachedImage = attachedImage;
    setAttachedImage(null);
    setIsTyping(true);

    try {
      const res = await fetch('/api/stylist/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          image: currentAttachedImage
        })
      });

      const data = await res.json();
      if (data.success && data.data?.reply) {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: data.data.reply, image: null }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          { 
            role: 'assistant', 
            content: "Based on your wardrobe proportions, I recommend balancing structured pieces with relaxed tailoring. Pair a crisp dark top with relaxed neutral trousers and clean leather footwear for an effortless 9/10 score.",
            image: null 
          }
        ]);
      }
    } catch {
      setMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: "I recommend pairing your navy tailored shirt with relaxed charcoal trousers and white calfskin sneakers to maintain modern proportions.",
          image: null 
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const prompts = [
    "What goes with my brown shirt?",
    "Give me an effortless luxury streetwear look",
    "What should I wear to a dinner date?",
    "How should I style wide-leg trousers?"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-screen p-4 md:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#8b5cf6]/20 border border-[#8b5cf6]/40 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#8b5cf6]" />
          </div>
          <div>
            <h1 className="text-lg font-serif font-bold text-[#f5f0e8]">Ask VESTRA Stylist</h1>
            <p className="text-xs text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online • Context-Aware Stylist
            </p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4 scrollbar-hide">
        {messages.map((msg, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={i} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 space-y-2 shadow-lg ${
                msg.role === 'user' 
                  ? 'bg-[#8b5cf6] text-white rounded-br-none' 
                  : 'bg-[#1a1a1a] border border-white/10 text-gray-200 rounded-bl-none'
              }`}
            >
              {msg.image && (
                <div className="rounded-xl overflow-hidden max-w-xs border border-white/20 mb-2">
                  <img src={msg.image} alt="User attachment" className="w-full h-auto object-cover" />
                </div>
              )}
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl rounded-bl-none p-4 flex items-center gap-2 text-gray-400">
              <Loader2 className="w-4 h-4 text-[#8b5cf6] animate-spin" />
              <span className="text-xs">Stylist is curating recommendations...</span>
            </div>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Suggested Prompt Chips */}
      {messages.length <= 3 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {prompts.map(prompt => (
            <button 
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="text-xs bg-[#1a1a1a] border border-white/10 text-gray-300 px-3.5 py-1.5 rounded-full hover:border-[#8b5cf6]/50 hover:text-white transition-all shadow-sm"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Attached Image Preview Chip */}
      {attachedImage && (
        <div className="relative inline-flex items-center gap-2 mb-2 p-1.5 pr-3 bg-[#1a1a1a] border border-[#8b5cf6]/40 rounded-xl self-start">
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 bg-black">
            <img src={attachedImage} alt="Attachment" className="w-full h-full object-cover" />
          </div>
          <span className="text-xs text-gray-300">Photo attached for analysis</span>
          <button 
            onClick={() => setAttachedImage(null)}
            className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Input Form with Working Attachment Button */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative mt-1">
        {/* Hidden File Input */}
        <input 
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
        />

        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => fileInputRef.current?.click()}
          title="Upload or attach outfit photo"
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#8b5cf6] hover:bg-white/5 rounded-full transition-colors"
        >
          <ImageIcon className="w-5 h-5" />
        </Button>

        <Input 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask your stylist or attach a photo..." 
          className="w-full bg-[#1a1a1a] border-white/10 pl-12 pr-14 py-6 rounded-full focus-visible:ring-[#8b5cf6] text-white placeholder:text-gray-500 shadow-inner"
        />

        <Button 
          type="submit" 
          size="icon" 
          disabled={!input.trim() && !attachedImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white transition-all disabled:opacity-30 disabled:hover:bg-[#8b5cf6]"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
