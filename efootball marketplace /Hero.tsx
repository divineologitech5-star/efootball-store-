import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Zap, Users } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 pt-32 pb-20 overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,229,255,0.08),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_50%,rgba(121,40,202,0.06),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161616] border border-[#2a2a2a] text-[13px] text-zinc-400 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Trusted by 10,000+ Players
        </div>

        <h1 className="text-[clamp(36px,7vw,72px)] font-extrabold leading-[1.05] tracking-tight text-white mb-6">
          Buy & Sell <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00e5ff] to-[#7928ca]">eFootball</span><br />
          Game Accounts
        </h1>

        <p className="text-[clamp(16px,2vw,20px)] text-zinc-400 max-w-[600px] mb-10 leading-relaxed">
          The safest marketplace for eFootball accounts. Verified sellers, secure payments, instant delivery.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/marketplace"
            className="flex items-center gap-2 px-7 py-3 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#7928ca] text-white text-[15px] font-semibold hover:opacity-90 hover:-translate-y-px transition-all shadow-[0_0_40px_rgba(0,229,255,0.15)]"
          >
            Browse Accounts <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/become-seller"
            className="flex items-center gap-2 px-7 py-3 rounded-lg border border-[#2a2a2a] hover:border-[#3a3a3a] hover:bg-[#161616] text-white text-[15px] font-semibold transition-all"
          >
            <Store className="w-4 h-4" /> Become a Seller
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-10 md:gap-16 mt-20 px-10 py-6 rounded-2xl bg-[#161616] border border-[#2a2a2a]">
          <div className="text-center">
            <div className="text-[28px] font-extrabold text-white">500+</div>
            <div className="text-[13px] text-zinc-400 mt-1">Accounts Sold</div>
          </div>
          <div className="text-center">
            <div className="text-[28px] font-extrabold text-white">₦2M+</div>
            <div className="text-[13px] text-zinc-400 mt-1">Traded</div>
          </div>
          <div className="text-center">
            <div className="text-[28px] font-extrabold text-white">4.9★</div>
            <div className="text-[13px] text-zinc-400 mt-1">Trust Score</div>
          </div>
          <div className="text-center">
            <div className="text-[28px] font-extrabold text-white">100%</div>
            <div className="text-[13px] text-zinc-400 mt-1">Secure</div>
          </div>
        </div>
      </div>
    </section>
  )
}
