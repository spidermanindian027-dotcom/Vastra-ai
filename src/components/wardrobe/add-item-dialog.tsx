"use client";

import React, { useState } from "react";
import { Wand2, Check, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "@/components/camera/image-upload";

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onItemAdded?: (newItem: any) => void;
}

export function AddItemDialog({ open, onOpenChange, onItemAdded }: AddItemDialogProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("shirt");
  const [color, setColor] = useState("Navy Blue");
  const [style, setStyle] = useState("Smart Casual");
  const [error, setError] = useState("");

  const handleUpload = (file: File) => {
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setName(file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "));
    setStep(2);
  };

  const handleSave = async () => {
    if (!selectedFile) {
      setError("Please select a clothing photo.");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("name", name || "Wardrobe Item");
      formData.append("category", category);
      formData.append("dominantColour", color);
      formData.append("style", style);

      const res = await fetch("/api/wardrobe", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to add item to wardrobe");
      }

      if (onItemAdded) {
        onItemAdded(json.data);
      }

      onOpenChange(false);
      // Reset
      setStep(1);
      setSelectedFile(null);
      setPreviewUrl("");
    } catch (err: any) {
      setError(err.message || "Failed to save item.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={(val) => {
        onOpenChange(val);
        if (!val) {
          setTimeout(() => {
            setStep(1);
            setError("");
          }, 200);
        }
      }}
    >
      <DialogContent className="sm:max-w-[520px] bg-[#1a1a1a] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-[#f5f0e8]">Add Clothing to Wardrobe</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg text-xs">
            {error}
          </div>
        )}

        {step === 1 ? (
          <div className="py-4">
            <p className="text-xs text-gray-400 mb-4">
              Upload a clear photo of your garment. VESTRA AI will automatically classify its category, color, and fit profile.
            </p>
            <ImageUpload onUpload={handleUpload} />
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="flex gap-4 items-center">
              <div className="w-24 h-28 bg-[#0d0d0d] rounded-xl overflow-hidden shrink-0 border border-white/10">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-600">No Image</div>
                )}
              </div>
              <div className="flex-1 space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs text-gray-300">Garment Name</Label>
                  <Input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="e.g. Navy Linen Shirt" 
                    className="bg-[#0d0d0d] border-white/10 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-gray-300">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="bg-[#0d0d0d] border-white/10 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                      <SelectItem value="shirt">Shirts & Tops</SelectItem>
                      <SelectItem value="t_shirt">T-Shirts</SelectItem>
                      <SelectItem value="trousers">Trousers & Chinos</SelectItem>
                      <SelectItem value="jeans">Denim & Jeans</SelectItem>
                      <SelectItem value="jacket">Jackets & Coats</SelectItem>
                      <SelectItem value="hoodie">Hoodies & Sweaters</SelectItem>
                      <SelectItem value="shoes">Footwear & Sneakers</SelectItem>
                      <SelectItem value="watch">Accessories & Watches</SelectItem>
                      <SelectItem value="sunglasses">Eyewear</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <Label className="text-xs text-gray-300">Dominant Colour</Label>
                <Input 
                  value={color} 
                  onChange={(e) => setColor(e.target.value)} 
                  placeholder="e.g. Charcoal" 
                  className="bg-[#0d0d0d] border-white/10 text-white"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-300">Style Aesthetic</Label>
                <Input 
                  value={style} 
                  onChange={(e) => setStyle(e.target.value)} 
                  placeholder="e.g. Street Minimal" 
                  className="bg-[#0d0d0d] border-white/10 text-white"
                />
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0 pt-4 border-t border-white/5">
          {step === 2 && (
            <Button variant="ghost" onClick={() => setStep(1)} disabled={isUploading} className="text-gray-400">
              Change Photo
            </Button>
          )}
          {step === 2 && (
            <Button 
              onClick={handleSave} 
              disabled={isUploading}
              className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" /> Save to Closet
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
