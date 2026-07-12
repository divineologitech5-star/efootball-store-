import { Github, Twitter, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border pt-16 pb-10 px-6 lg:px-10 max-w-[1200px] mx-auto bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#7928ca] flex items-center justify-center text-base">
              ⚽
            </div>
            <span className="font-extrabold text-xl tracking-tight text-foreground">eFootball Store</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The ultimate destination for football gear. Premium quality, authentic products, and unmatched service for players at every level.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold mb-4 text-foreground">Products</h4>
          <div className="flex flex-col gap-2.5">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Football Boots</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Jerseys</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Equipment</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Accessories</a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold mb-4 text-foreground">Company</h4>
          <div className="flex flex-col gap-2.5">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Press</a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold mb-4 text-foreground">Support</h4>
          <div className="flex flex-col gap-2.5">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Help Center</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Shipping</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Returns</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-border text-muted-foreground text-[13px]">
        <span>© 2026 eFootball Store. All rights reserved.</span>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-foreground transition-colors"><Twitter className="w-4 h-4" /></a>
          <a href="#" className="hover:text-foreground transition-colors"><Instagram className="w-4 h-4" /></a>
          <a href="#" className="hover:text-foreground transition-colors"><Youtube className="w-4 h-4" /></a>
          <a href="#" className="hover:text-foreground transition-colors"><Github className="w-4 h-4" /></a>
        </div>
      </div>
    </footer>
  )
}
