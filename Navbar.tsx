import { ShoppingCart, Menu, X, Sun, Moon } from 'lucide-react'
import { useCart } from './CartContext'
import { useTheme } from './ThemeContext'

import { useState } from 'react'

export function Navbar() {
  const { totalItems, toggleCart } = useCart()
  const { isDark, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-16 flex items-center justify-between px-6 lg:px-10 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#7928ca] flex items-center justify-center text-base">
          ⚽
        </div>
        <span className="font-extrabold text-xl tracking-tight text-foreground">eFootball Store</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <button onClick={() => scrollTo('products')} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Products</button>
        <button onClick={() => scrollTo('features')} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</button>
        <button onClick={() => scrollTo('about')} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border border-border hover:border-border/80 hover:bg-secondary transition-all text-foreground"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button
          onClick={toggleCart}
          className="relative p-2 rounded-lg border border-border hover:border-border/80 hover:bg-secondary transition-all text-foreground"
        >
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full bg-[#00e5ff] text-black text-[11px] font-extrabold flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
        <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#7928ca] text-white text-sm font-semibold hover:opacity-90 hover:-translate-y-px transition-all">
          Get Started
        </button>
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b border-border p-4 md:hidden flex flex-col gap-3">
          <button onClick={() => scrollTo('products')} className="text-left text-sm font-medium text-muted-foreground hover:text-foreground py-2">Products</button>
          <button onClick={() => scrollTo('features')} className="text-left text-sm font-medium text-muted-foreground hover:text-foreground py-2">Features</button>
          <button onClick={() => scrollTo('about')} className="text-left text-sm font-medium text-muted-foreground hover:text-foreground py-2">About</button>
        </div>
      )}
    </nav>
  )
}
