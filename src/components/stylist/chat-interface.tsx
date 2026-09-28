"use client"

import React, { useState, useRef, useEffect } from "react"
import { Send, Image as ImageIcon, Paperclip, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your VESTRA AI stylist. How can I help you elevate your look today?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "That sounds like a great occasion! Let me look at your wardrobe and suggest some sophisticated outfits that match your style profile.",
          timestamp: new Date()
        }
      ])
    }, 2000)
  }

  return (
    <div className="flex flex-col h-[600px] w-full max-w-3xl mx-auto rounded-xl border border-white/10 bg-[#1e1e1e]/60 backdrop-blur-md overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex items-center px-6 py-4 border-b border-white/10 bg-[#1a1a1a]">
        <Avatar className="h-10 w-10 border border-[#8b5cf6]">
          <AvatarFallback className="bg-[#1a1a1a] text-[#8b5cf6]">AI</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <h3 className="font-serif font-semibold text-[#f5f0e8]">VESTRA Stylist</h3>
          <p className="text-xs text-[#8b5cf6] flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Online
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}>
            <div className={cn("flex max-w-[80%] items-end gap-2", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
              <Avatar className="h-8 w-8 shrink-0">
                {msg.role === "user" ? (
                  <AvatarFallback className="bg-[#252525] text-white">U</AvatarFallback>
                ) : (
                  <AvatarFallback className="bg-[#1a1a1a] text-[#8b5cf6]">AI</AvatarFallback>
                )}
              </Avatar>
              
              <div className={cn(
                "rounded-2xl px-5 py-3 text-sm shadow-md",
                msg.role === "user" 
                  ? "bg-[#8b5cf6] text-white rounded-br-sm" 
                  : "bg-[#252525] border border-white/5 text-[#f5f0e8] rounded-bl-sm"
              )}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex w-full justify-start">
            <div className="flex items-end gap-2">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-[#1a1a1a] text-[#8b5cf6]">AI</AvatarFallback>
              </Avatar>
              <div className="rounded-2xl bg-[#252525] border border-white/5 px-5 py-4 rounded-bl-sm flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#a0a0a0] animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[#a0a0a0] animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[#a0a0a0] animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10 bg-[#1a1a1a]">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-[#a0a0a0] hover:text-white shrink-0">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#a0a0a0] hover:text-white shrink-0">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <Input 
              placeholder="Ask for styling advice..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="pr-12 bg-[#252525] border-white/10 rounded-full h-12"
            />
          </div>
          <Button 
            size="icon" 
            className="rounded-full bg-[#8b5cf6] hover:bg-[#7c3aed] h-12 w-12 shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            onClick={handleSend}
            disabled={!input.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
