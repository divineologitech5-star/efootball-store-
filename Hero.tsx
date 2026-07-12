import { ArrowRight, Play } from 'lucide-react'
import { stats } from './products'


export function Hero() {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 pt-32 pb-20 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-glow-cyan pointer-events-none" />
      <div className="absolute inset-0 bg-glow-purple pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card border border-border text-[13px] text-muted-foreground mb-8 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-dot" />
          New Season 2026 Collection Live
        </div>

        <h1 className="text-[clamp(40px,8vw,80px)] font-extrabold leading-[1.05] tracking-tight max-w-[900px] text-gradient animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          The Ultimate <span className="text-gradient-accent">eFootball</span><br />
          Gear Destination
        </h1>

        <p className="text-[clamp(16px,2vw,20px)] text-muted-foreground max-w-[600px] mt-6 mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Premium boots, jerseys, and equipment for players who demand excellence. Built for the pitch, designed for champions.
        </p>

        <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={scrollToProducts}
            className="flex items-center gap-2 px-7 py-3 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#7928ca] text-white text-[15px] font-semibold hover:opacity-90 hover:-translate-y-px transition-all shadow-[0_0_40px_rgba(0,229,255,0.15)]"
          >
            Shop Collection <ArrowRight className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-7 py-3 rounded-lg border border-border hover:border-border/80 hover:bg-card text-foreground text-[15px] font-semibold transition-all">
            <Play className="w-4 h-4" /> View Lookbook
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-10 md:gap-16 mt-20 px-10 py-6 rounded-2xl bg-card border border-border animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-[32px] font-extrabold text-foreground">{stat.value}</div>
              <div className="text-[13px] text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
