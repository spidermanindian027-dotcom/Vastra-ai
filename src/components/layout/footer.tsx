import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#0d0d0d] py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <span className="font-serif text-xl font-bold tracking-wider text-[#f5f0e8]">VESTRA</span>
              <span className="text-xl font-bold text-[#8b5cf6]">AI</span>
            </div>
            <p className="text-sm text-[#a0a0a0] max-w-xs">
              Elevate your personal style with the world's most advanced AI fashion stylist.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-[#f5f0e8] mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-[#a0a0a0]">
              <li><Link href="/scan" className="hover:text-[#8b5cf6] transition-colors">Style Scanner</Link></li>
              <li><Link href="/wardrobe" className="hover:text-[#8b5cf6] transition-colors">Smart Wardrobe</Link></li>
              <li><Link href="/ai-stylist" className="hover:text-[#8b5cf6] transition-colors">AI Chat Stylist</Link></li>
              <li><Link href="/looks" className="hover:text-[#8b5cf6] transition-colors">Virtual Try-On</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-[#f5f0e8] mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-[#a0a0a0]">
              <li><Link href="/about" className="hover:text-[#8b5cf6] transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-[#8b5cf6] transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-[#8b5cf6] transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-[#f5f0e8] mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-[#a0a0a0]">
              <li><Link href="/privacy" className="hover:text-[#8b5cf6] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#8b5cf6] transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-[#8b5cf6] transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#a0a0a0]">
          <p>© {new Date().getFullYear()} VESTRA AI. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            {/* Social icons would go here */}
            <span className="hover:text-white cursor-pointer">Instagram</span>
            <span className="hover:text-white cursor-pointer">Twitter</span>
            <span className="hover:text-white cursor-pointer">TikTok</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
