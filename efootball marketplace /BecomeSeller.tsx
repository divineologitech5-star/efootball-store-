import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, CheckCircle, Globe, CreditCard, ArrowRight, Lock } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { usePaystack } from '../contexts/PaystackContext'

const COUNTRIES = [
  { code: 'NG', name: 'Nigeria', currency: 'NGN', flag: '🇳🇬', fee: 2000 },
  { code: 'US', name: 'United States', currency: 'USD', flag: '🇺🇸', fee: 5 },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧', fee: 4 },
  { code: 'CA', name: 'Canada', currency: 'CAD', flag: '🇨🇦', fee: 7 },
  { code: 'GH', name: 'Ghana', currency: 'GHS', flag: '🇬🇭', fee: 60 },
  { code: 'KE', name: 'Kenya', currency: 'KES', flag: '🇰🇪', fee: 650 },
  { code: 'ZA', name: 'South Africa', currency: 'ZAR', flag: '🇿🇦', fee: 90 },
]

export function BecomeSeller() {
  const navigate = useNavigate()
  const { user, isLoggedIn, upgradeToSeller } = useAuth()
  const { initializePayment } = usePaystack()
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0])
  const [step, setStep] = useState(1)

  const handlePayment = () => {
    if (!isLoggedIn) {
      navigate('/signup?redirect=become-seller')
      return
    }

    initializePayment(
      user?.email || 'seller@demo.com',
      selectedCountry.code === 'NG' ? 2000 : selectedCountry.fee,
      { type: 'seller_registration', country: selectedCountry.name },
      () => {
        upgradeToSeller()
        setStep(3)
      }
    )
  }

  if (user?.isSeller) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 px-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">You are already a seller!</h2>
          <p className="text-zinc-400 mb-6">Go to your dashboard to start listing accounts.</p>
          <button
            onClick={() => navigate('/seller-dashboard')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#7928ca] text-white font-semibold"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white mb-4">Become a Seller</h1>
          <p className="text-zinc-400">Join our trusted seller community and start earning from your eFootball accounts</p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-gradient-to-r from-[#00e5ff] to-[#7928ca] text-white' : 'bg-[#2a2a2a] text-zinc-500'}`}>
                {s}
              </div>
              {s < 3 && <div className={`w-16 h-0.5 ${step > s ? 'bg-gradient-to-r from-[#00e5ff] to-[#7928ca]' : 'bg-[#2a2a2a]'}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Select Your Country</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {COUNTRIES.map(country => (
                <button
                  key={country.code}
                  onClick={() => setSelectedCountry(country)}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${selectedCountry.code === country.code ? 'border-[#00e5ff] bg-[#00e5ff]/10' : 'border-[#2a2a2a] hover:border-[#3a3a3a]'}`}
                >
                  <span className="text-2xl">{country.flag}</span>
                  <div className="text-left">
                    <div className="text-white font-semibold">{country.name}</div>
                    <div className="text-sm text-zinc-400">Fee: {country.currency === 'NGN' ? '₦' : country.currency === 'USD' ? '$' : country.currency === 'GBP' ? '£' : country.currency}{country.fee.toLocaleString()}</div>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#7928ca] text-white font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Continue <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Payment Summary</h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-3 border-b border-[#2a2a2a]">
                <span className="text-zinc-400">Country</span>
                <span className="text-white font-medium">{selectedCountry.flag} {selectedCountry.name}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#2a2a2a]">
                <span className="text-zinc-400">Registration Fee</span>
                <span className="text-white font-medium">
                  {selectedCountry.currency === 'NGN' ? '₦' : selectedCountry.currency === 'USD' ? '$' : selectedCountry.currency === 'GBP' ? '£' : selectedCountry.currency}
                  {selectedCountry.fee.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#2a2a2a]">
                <span className="text-zinc-400">Platform Commission</span>
                <span className="text-white font-medium">20% per sale</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-zinc-400">You Earn</span>
                <span className="text-green-400 font-bold">80% per sale</span>
              </div>
            </div>

            <div className="bg-[#0a0a0a] rounded-xl p-4 mb-8 border border-[#2a2a2a]">
              <div className="flex items-center gap-3 text-amber-400">
                <Lock className="w-5 h-5" />
                <span className="text-sm">Secure payment via Paystack. Your information is encrypted.</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-4 rounded-xl border border-[#2a2a2a] text-white font-semibold hover:bg-[#161616] transition-colors"
              >
                Back
              </button>
              <button
                onClick={handlePayment}
                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#7928ca] text-white font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" /> Pay Now
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Welcome, Seller!</h2>
            <p className="text-zinc-400 mb-6">Your seller account is now active. Start listing your eFootball accounts.</p>
            <button
              onClick={() => navigate('/seller-dashboard')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#7928ca] text-white font-bold hover:opacity-90 transition-opacity"
            >
              Go to Seller Dashboard
            </button>
          </div>
        )}

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-6 text-center">
            <Shield className="w-10 h-10 text-[#00e5ff] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Secure Sales</h3>
            <p className="text-sm text-zinc-400">We hold payments until buyer confirms receipt</p>
          </div>
          <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-6 text-center">
            <Globe className="w-10 h-10 text-[#00e5ff] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Global Buyers</h3>
            <p className="text-sm text-zinc-400">Access buyers from Nigeria, US, UK, and more</p>
          </div>
          <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-6 text-center">
            <CreditCard className="w-10 h-10 text-[#00e5ff] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Instant Payout</h3>
            <p className="text-sm text-zinc-400">Get paid directly to your bank account</p>
          </div>
        </div>
      </div>
    </div>
  )
}
