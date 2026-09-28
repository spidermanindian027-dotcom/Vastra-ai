"use client"

import React, { useState } from "react"
import { ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function OnboardingWizard() {
  const [step, setStep] = useState(1)
  const totalSteps = 4

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#1e1e1e]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
      <div className="mb-8">
        <div className="flex justify-between text-xs text-[#a0a0a0] mb-2">
          <span>Step {step} of {totalSteps}</span>
          <span>{Math.round((step / totalSteps) * 100)}% Completed</span>
        </div>
        <Progress value={(step / totalSteps) * 100} className="h-1.5" />
      </div>

      <div className="min-h-[300px]">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-serif text-[#f5f0e8] mb-2">Welcome to VESTRA AI</h2>
            <p className="text-[#a0a0a0] mb-8">Let's set up your profile to give you personalized styling advice.</p>
            {/* Step 1 content placeholder */}
            <div className="h-48 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center bg-[#1a1a1a]">
              <span className="text-[#a0a0a0]">Upload your primary photo</span>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-serif text-[#f5f0e8] mb-2">Style DNA</h2>
            <p className="text-[#a0a0a0] mb-8">Select the styles that inspire you.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-24 bg-[#1a1a1a] rounded-lg border border-[#8b5cf6] flex items-center justify-center relative">
                 <CheckCircle2 className="absolute top-2 right-2 text-[#8b5cf6] h-4 w-4" />
                 <span className="text-[#f5f0e8]">Minimalist</span>
              </div>
              <div className="h-24 bg-[#1a1a1a] rounded-lg border border-white/10 flex items-center justify-center">
                 <span className="text-[#a0a0a0]">Streetwear</span>
              </div>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-serif text-[#f5f0e8] mb-2">Body & Fit Profile</h2>
            <p className="text-[#a0a0a0] mb-8">Our AI has analyzed your photo. Please verify these details.</p>
            <div className="space-y-4">
               <div className="p-4 bg-[#1a1a1a] rounded-lg border border-white/5">
                 <p className="text-sm text-emerald-400 mb-1">Body Shape Detected</p>
                 <p className="text-lg text-[#f5f0e8]">Inverted Triangle</p>
               </div>
            </div>
          </div>
        )}
        
        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center justify-center text-center h-[300px]">
            <div className="h-20 w-20 bg-[#8b5cf6]/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="h-10 w-10 text-[#8b5cf6]" />
            </div>
            <h2 className="text-2xl font-serif text-[#f5f0e8] mb-2">Profile Complete</h2>
            <p className="text-[#a0a0a0]">Your AI Stylist is ready to transform your wardrobe.</p>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-10 pt-6 border-t border-white/10">
        <Button 
          variant="outline" 
          onClick={prevStep}
          disabled={step === 1}
          className="text-[#a0a0a0]"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <Button 
          onClick={step === totalSteps ? () => console.log('done') : nextStep}
          className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white min-w-[120px]"
        >
          {step === totalSteps ? "Enter VESTRA" : "Continue"}
          {step !== totalSteps && <ChevronRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
