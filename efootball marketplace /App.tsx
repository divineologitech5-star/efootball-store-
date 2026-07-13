import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { MarketplaceProvider } from './contexts/MarketplaceContext'
import { PaystackProvider } from './contexts/PaystackContext'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Marketplace } from './pages/Marketplace'
import { AccountDetail } from './pages/AccountDetail'
import { BecomeSeller } from './pages/BecomeSeller'
import { SellerDashboard } from './pages/SellerDashboard'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'

function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Hero />

      {/* How It Works */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white mb-4">How It Works</h2>
          <p className="text-zinc-400">Simple, secure, and fast</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-8 text-center">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00e5ff] to-[#7928ca] flex items-center justify-center text-2xl mx-auto mb-5">🔍</div>
            <h3 className="text-lg font-bold text-white mb-2">1. Browse</h3>
            <p className="text-sm text-zinc-400">Find the perfect eFootball account from verified sellers</p>
          </div>
          <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-8 text-center">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00e5ff] to-[#7928ca] flex items-center justify-center text-2xl mx-auto mb-5">💳</div>
            <h3 className="text-lg font-bold text-white mb-2">2. Pay Securely</h3>
            <p className="text-sm text-zinc-400">Pay with Paystack. Your money is held safely until delivery</p>
          </div>
          <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-8 text-center">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00e5ff] to-[#7928ca] flex items-center justify-center text-2xl mx-auto mb-5">🎮</div>
            <h3 className="text-lg font-bold text-white mb-2">3. Play!</h3>
            <p className="text-sm text-zinc-400">Get instant login details and start playing immediately</p>
          </div>
        </div>
      </section>

      {/* For Sellers */}
      <section className="py-20 px-6 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Want to Sell Your Account?</h2>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            Join thousands of sellers earning from their eFootball accounts. 
            Pay a one-time registration fee and keep 80% of every sale.
          </p>
          <a
            href="/become-seller"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#7928ca] text-white font-bold hover:opacity-90 transition-opacity"
          >
            Become a Seller →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2a2a2a] py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#7928ca] flex items-center justify-center">⚽</div>
            <span className="font-extrabold text-xl text-white">eFootball Market</span>
          </div>
          <p className="text-zinc-500 text-sm">© 2026 eFootball Account Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <MarketplaceProvider>
        <PaystackProvider>
          <div className="min-h-screen bg-[#0a0a0a] text-white">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/account/:id" element={<AccountDetail />} />
              <Route path="/become-seller" element={<BecomeSeller />} />
              <Route path="/seller-dashboard" element={<SellerDashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </PaystackProvider>
      </MarketplaceProvider>
    </AuthProvider>
  )
}

export default App
