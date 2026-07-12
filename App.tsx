import { ThemeProvider } from './ThemeContext'
import { CartProvider } from './CartContext'
import { ToastProvider } from './ToastContext'
import { PaystackProvider } from './PaystackContext'
import { Navbar } from './Navbar'
import { Hero } from './Hero'
import { ProductsSection } from './ProductsSection'
import { FeaturesSection } from './FeaturesSection'
import { CTASection } from './CTASection'
import { Footer } from './Footer'
import { CartDrawer } from './CartDrawer'



function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <ToastProvider>
          <PaystackProvider>
            <div className="min-h-screen bg-background text-foreground">
              <Navbar />
              <Hero />
              <ProductsSection />
              <FeaturesSection />
              <CTASection />
              <Footer />
              <CartDrawer />
            </div>
          </PaystackProvider>
        </ToastProvider>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
