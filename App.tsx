import { ThemeProvider } from './contexts/ThemeContext'
import { CartProvider } from './contexts/CartContext'
import { ToastProvider } from './contexts/ToastContext'
import { PaystackProvider } from './contexts/PaystackContext'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { ProductsSection } from './components/ProductsSection'
import { FeaturesSection } from './components/FeaturesSection'
import { CTASection } from './components/CTASection'
import { Footer } from './components/Footer'
import { CartDrawer } from './components/CartDrawer'

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
