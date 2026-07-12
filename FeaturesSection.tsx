import { Zap, Shield, RefreshCw, MessageCircle, Trophy, Lock } from 'lucide-react'
import { features } from '../data/products'

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  RefreshCw: <RefreshCw className="w-6 h-6" />,
  MessageCircle: <MessageCircle className="w-6 h-6" />,
  Trophy: <Trophy className="w-6 h-6" />,
  Lock: <Lock className="w-6 h-6" />,
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 lg:px-10 max-w-[1200px] mx-auto bg-background">
      <div className="text-center mb-16">
        <h2 className="text-[clamp(28px,4vw,48px)] font-extrabold tracking-tight mb-4 text-foreground">
          Why Choose Us
        </h2>
        <p className="text-lg text-muted-foreground max-w-[500px] mx-auto">
          Engineered for performance, trusted by professionals
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-2xl p-8 transition-all hover:border-border/80 hover:bg-secondary"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00e5ff] to-[#7928ca] flex items-center justify-center text-white mb-5">
              {iconMap[feature.icon]}
            </div>
            <h3 className="text-lg font-bold mb-2 text-foreground">{feature.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
