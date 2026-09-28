"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const completeOnboarding = async () => {
    try {
      await fetch('/api/profile/onboarding', { method: 'POST', body: JSON.stringify({}) });
      router.push('/dashboard');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light tracking-wide text-zinc-100">VESTRA <span className="font-semibold">AI</span></h1>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`h-1 w-8 rounded-full ${i <= step ? 'bg-zinc-100' : 'bg-zinc-800'}`} />
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-medium">Your Profile Photo</h2>
              <p className="text-zinc-400">Upload a full-body photo for accurate AI styling.</p>
              <div className="border-2 border-dashed border-zinc-700 h-64 flex items-center justify-center rounded-lg bg-zinc-950/50 hover:bg-zinc-800/50 transition-colors cursor-pointer">
                <span className="text-zinc-500 uppercase tracking-widest text-sm">Upload Image</span>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-medium">Style Preferences</h2>
              <p className="text-zinc-400">Select the styles that speak to you.</p>
              <div className="flex flex-wrap gap-3">
                {['Minimalist', 'Streetwear', 'Formal', 'Avant-Garde', 'Vintage'].map(s => (
                  <button key={s} className="px-4 py-2 rounded-full border border-zinc-700 hover:border-zinc-300 transition-colors text-sm">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-medium">Body Analysis</h2>
              <p className="text-zinc-400">AI has analyzed your proportions.</p>
              <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800">
                <p className="text-lg">Inverted Triangle</p>
                <p className="text-sm text-zinc-500 mt-2">You can correct this later in your profile settings.</p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-medium">Colour Analysis</h2>
              <p className="text-zinc-400">Your seasonal colour palette.</p>
              <div className="flex gap-4">
                <div className="h-16 w-16 rounded-full bg-emerald-900"></div>
                <div className="h-16 w-16 rounded-full bg-amber-700"></div>
                <div className="h-16 w-16 rounded-full bg-slate-800"></div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6 text-center">
              <h2 className="text-3xl font-light">You are ready.</h2>
              <p className="text-zinc-400">Your luxury styling experience awaits.</p>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack} className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">Back</Button>
          ) : <div></div>}
          
          {step < 5 ? (
            <Button onClick={handleNext} className="bg-zinc-100 text-zinc-950 hover:bg-zinc-300 px-8">Next</Button>
          ) : (
            <Button onClick={completeOnboarding} className="bg-zinc-100 text-zinc-950 hover:bg-zinc-300 px-8">Complete Setup</Button>
          )}
        </div>
      </div>
    </div>
  );
}
