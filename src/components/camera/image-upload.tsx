"use client"

import React, { useState, useRef } from "react"
import { UploadCloud, X, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ImageUpload({ onUpload }: { onUpload: (file: File) => void }) {
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (selectedFile: File) => {
    // Validate
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(selectedFile.type)) {
      alert("Please upload a valid image file (JPEG, PNG, WEBP)")
      return
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB limit")
      return
    }

    setFile(selectedFile)
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(selectedFile)
    onUpload(selectedFile)
  }

  const removeFile = () => {
    setFile(null)
    setPreview(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {!preview ? (
        <div 
          className={cn(
            "relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl transition-colors bg-[#1a1a1a]/50",
            dragActive ? "border-[#8b5cf6] bg-[#8b5cf6]/10" : "border-white/20 hover:bg-[#252525]/50"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input 
            ref={inputRef}
            type="file" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/jpeg, image/png, image/webp"
            onChange={handleChange}
          />
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4 pointer-events-none">
            <div className="p-4 bg-[#252525] rounded-full mb-4">
              <UploadCloud className="w-8 h-8 text-[#a0a0a0]" />
            </div>
            <p className="mb-2 text-sm text-[#f5f0e8]">
              <span className="font-semibold text-[#8b5cf6]">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-[#a0a0a0]">SVG, PNG, JPG or WEBP (Max. 10MB)</p>
          </div>
        </div>
      ) : (
        <div className="relative w-full aspect-[3/4] sm:aspect-square rounded-xl overflow-hidden border border-white/10 group bg-black">
          <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
            <Button variant="destructive" size="icon" onClick={removeFile} className="rounded-full shadow-lg">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
