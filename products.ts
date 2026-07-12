import { Product, Stat, Feature } from '../types'

export const products: Product[] = [
  {
    id: 1,
    name: "Predator Elite FG",
    category: "Football Boots",
    description: "Elite control boots with Gripknit upper for ultimate ball mastery.",
    price: 280,
    oldPrice: 320,
    emoji: "👟",
    tag: "hot",
    tagText: "HOT"
  },
  {
    id: 2,
    name: "Mercurial Superfly 10",
    category: "Football Boots",
    description: "Speed-focused boots with Zoom Air cushioning for explosive acceleration.",
    price: 295,
    oldPrice: null,
    emoji: "👟",
    tag: "new",
    tagText: "NEW"
  },
  {
    id: 3,
    name: "Phantom GX 2 Elite",
    category: "Football Boots",
    description: "Precision passing boots with NikeSkin technology and Gripknit.",
    price: 275,
    oldPrice: 300,
    emoji: "👟",
    tag: "sale",
    tagText: "SALE"
  },
  {
    id: 4,
    name: "Real Madrid Home Kit 26",
    category: "Jerseys",
    description: "Official 2026 home jersey. AeroReady technology keeps you dry.",
    price: 120,
    oldPrice: null,
    emoji: "👕",
    tag: "new",
    tagText: "NEW"
  },
  {
    id: 5,
    name: "Barcelona Away Kit 26",
    category: "Jerseys",
    description: "Stunning away design with Dri-FIT ADV fabric for peak performance.",
    price: 115,
    oldPrice: 130,
    emoji: "👕",
    tag: "sale",
    tagText: "SALE"
  },
  {
    id: 6,
    name: "Nike Flight Ball",
    category: "Equipment",
    description: "Official match ball with Aerowsculpt technology for stable flight.",
    price: 165,
    oldPrice: null,
    emoji: "⚽",
    tag: "hot",
    tagText: "HOT"
  },
  {
    id: 7,
    name: "Pro Shin Guards",
    category: "Equipment",
    description: "Carbon fiber shin guards with Poron XRD foam for maximum protection.",
    price: 45,
    oldPrice: 55,
    emoji: "🛡️",
    tag: "sale",
    tagText: "SALE"
  },
  {
    id: 8,
    name: "Elite Goalkeeper Gloves",
    category: "Equipment",
    description: "Negative cut with 4mm Contact latex for superior grip in all conditions.",
    price: 95,
    oldPrice: null,
    emoji: "🧤",
    tag: "new",
    tagText: "NEW"
  }
]

export const stats: Stat[] = [
  { value: "50K+", label: "Players Equipped" },
  { value: "200+", label: "Pro Teams" },
  { value: "4.9★", label: "Customer Rating" },
  { value: "24h", label: "Fast Delivery" }
]

export const features: Feature[] = [
  {
    icon: "Zap",
    title: "Lightning Fast Shipping",
    description: "Get your gear delivered within 24 hours across major cities. Real-time tracking included with every order."
  },
  {
    icon: "Shield",
    title: "Authentic Guarantee",
    description: "Every product is 100% authentic with official manufacturer warranty. No fakes, ever."
  },
  {
    icon: "RefreshCw",
    title: "Easy Returns",
    description: "Not the right fit? Return within 30 days for a full refund. No questions asked."
  },
  {
    icon: "MessageCircle",
    title: "Pro Support",
    description: "Our team of football experts is available 24/7 to help you find the perfect gear."
  },
  {
    icon: "Trophy",
    title: "Pro Player Approved",
    description: "Trusted by over 200 professional teams and 50,000+ players worldwide."
  },
  {
    icon: "Lock",
    title: "Secure Checkout",
    description: "Bank-grade encryption protects your data. Multiple payment options available."
  }
]
