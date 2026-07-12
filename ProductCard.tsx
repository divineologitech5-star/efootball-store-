import { Plus } from 'lucide-react'
import { Product } from '../types'
import { useCart } from './CartContext'
import { useToast } from './ToastContext'


interface ProductCardProps {
  product: Product
}

const tagStyles = {
  new: 'bg-[#00e5ff] text-black',
  hot: 'bg-amber-500 text-black',
  sale: 'bg-red-500 text-white',
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { showToast } = useToast()

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product)
    showToast(`${product.name} added to cart!`)
  }

  return (
    <div className="group bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-border/80 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] cursor-pointer">
      <div className="h-[200px] bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center relative overflow-hidden">
        <span className="text-[80px] transition-transform duration-400 group-hover:scale-105">
          {product.emoji}
        </span>
        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${tagStyles[product.tag]}`}>
          {product.tagText}
        </span>
      </div>
      <div className="p-5">
        <div className="text-xs text-[#00e5ff] font-semibold uppercase tracking-wider mb-1.5">
          {product.category}
        </div>
        <h3 className="text-base font-bold mb-2 text-foreground">{product.name}</h3>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-foreground">${product.price}</span>
            {product.oldPrice && (
              <span className="text-sm text-muted-foreground line-through font-medium">${product.oldPrice}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center text-foreground hover:bg-[#00e5ff] hover:border-[#00e5ff] hover:text-black transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
