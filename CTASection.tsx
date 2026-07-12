import { ArrowRight, MessageSquare } from 'lucide-react'

export function CTASection() {
  return (
    <section className="relative py-24 px-6 text-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,229,255,0.06),transparent)]" />
      <div className="relative z-10 max-w-[700px] mx-auto">
        <h2 className="text-[clamp(32px,5vw,56px)] font-extrabold tracking-tight mb-5 text-foreground">
          Ready to <span className="text-gradient-accent">Level Up</span>?
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Join 50,000+ players who trust eFootball Store for their gear. Free shipping on orders over $100.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#7928ca] text-white text-base font-semibold hover:opacity-90 hover:-translate-y-px transition-all">
            Shop Now <ArrowRight className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-8 py-3.5 rounded-lg border border-border hover:border-border/80 hover:bg-card text-foreground text-base font-semibold transition-all">
            <MessageSquare className="w-4 h-4" /> Contact Sales
          </button>
        </div>
      </div>
    </section>
  )
}
