import { useState } from 'react'
import { X, Minus, Plus, Trash2, CreditCard } from 'lucide-react'
import { useCart } from './CartContext'
import { useToast } from './ToastContext'
import { usePaystack } from './PaystackContext'


export function CartDrawer() {
  const { cart, isOpen, toggleCart, updateQty, removeFromCart, totalItems, totalPrice, clearCart } = useCart()
  const { showToast } = useToast()
  const { initializePayment } = usePaystack()
  const [email, setEmail] = useState('')
  const [showPayment, setShowPayment] = useState(false)

  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast('Your cart is empty!', '⚠️')
      return
    }
    setShowPayment(true)
  }

  const handlePay = () => {
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email', '⚠️')
      return
    }
    initializePayment(email, totalPrice, () => {
      clearCart()
      setShowPayment(false)
      toggleCart()
    })
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-[200] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleCart}
      />
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-[400px] bg-background border-l border-border z-[201] flex flex-col transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h3 className="text-lg font-bold text-foreground">Your Cart ({totalItems})</h3>
          <button onClick={toggleCart} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <div className="text-5xl mb-4">🛒</div>
              <p className="font-medium">Your cart is empty</p>
              <p className="text-sm mt-2">Add some gear to get started!</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 p-4 bg-card rounded-xl border border-border mb-3">
                <div className="w-[60px] h-[60px] rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center text-[28px] flex-shrink-0">
                  {item.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-foreground truncate">{item.name}</div>
                  <div className="text-sm text-[#00e5ff] font-bold">${item.price}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="w-7 h-7 rounded-md bg-secondary border border-border flex items-center justify-center hover:border-[#00e5ff] transition-colors text-foreground"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium w-4 text-center text-foreground">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="w-7 h-7 rounded-md bg-secondary border border-border flex items-center justify-center hover:border-[#00e5ff] transition-colors text-foreground"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-muted-foreground hover:text-red-500 transition-colors self-start"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-border">
          {!showPayment ? (
            <>
              <div className="flex justify-between text-lg font-bold mb-4 text-foreground">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#7928ca] text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" /> Checkout →
              </button>
            </>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between text-lg font-bold mb-2 text-foreground">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#00e5ff] transition-colors"
              />
              <button
                onClick={handlePay}
                className="w-full py-3.5 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#7928ca] text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" /> Pay with Paystack
              </button>
              <button
                onClick={() => setShowPayment(false)}
                className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to cart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
