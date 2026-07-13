import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Shield, Lock, CheckCircle, AlertTriangle, ArrowLeft, Star } from 'lucide-react'
import { useMarketplace } from '../contexts/MarketplaceContext'
import { useAuth } from '../contexts/AuthContext'
import { usePaystack } from '../contexts/PaystackContext'

export function AccountDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getAccountById, buyAccount } = useMarketplace()
  const { user, isLoggedIn } = useAuth()
  const { initializePayment } = usePaystack()
  const [showLogins, setShowLogins] = useState(false)
  const [purchased, setPurchased] = useState(false)

  const account = getAccountById(id || '')

  if (!account) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 px-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">❌</div>
          <p className="text-zinc-400 text-lg">Account not found</p>
          <button onClick={() => navigate('/marketplace')} className="mt-4 text-[#00e5ff] hover:underline">
            Back to Marketplace
          </button>
        </div>
      </div>
    )
  }

  const handleBuy = () => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }

    initializePayment(
      user?.email || 'buyer@demo.com',
      account.price,
      { account_id: account.id, account_title: account.title },
      () => {
        const tx = buyAccount(account.id, user?.id || '')
        if (tx) {
          setPurchased(true)
          setShowLogins(true)
        }
      }
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/marketplace')}
          className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Marketplace
        </button>

        <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="h-64 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center relative">
            <div className="text-8xl">⚽</div>
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 text-sm font-bold">
              {account.status === 'available' ? 'Available' : 'Sold'}
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-[#00e5ff]" />
                  <span className="text-sm text-[#00e5ff] font-semibold">Verified Seller: {account.sellerName}</span>
                </div>
                <h1 className="text-3xl font-extrabold text-white mb-2">{account.title}</h1>
                <p className="text-zinc-400">{account.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-extrabold text-white">₦{account.price.toLocaleString()}</div>
                <div className="text-sm text-zinc-500">Platform fee: 20%</div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#0a0a0a] rounded-xl p-4 border border-[#2a2a2a]">
                <div className="text-sm text-zinc-500 mb-1">Team Strength</div>
                <div className="text-2xl font-extrabold text-[#00e5ff]">{account.teamStrength}</div>
              </div>
              <div className="bg-[#0a0a0a] rounded-xl p-4 border border-[#2a2a2a]">
                <div className="text-sm text-zinc-500 mb-1">Players</div>
                <div className="text-2xl font-extrabold text-white">{account.players.length}</div>
              </div>
              <div className="bg-[#0a0a0a] rounded-xl p-4 border border-[#2a2a2a]">
                <div className="text-sm text-zinc-500 mb-1">Seller Earns</div>
                <div className="text-2xl font-extrabold text-green-400">₦{Math.round(account.price * 0.8).toLocaleString()}</div>
              </div>
              <div className="bg-[#0a0a0a] rounded-xl p-4 border border-[#2a2a2a]">
                <div className="text-sm text-zinc-500 mb-1">Platform Fee</div>
                <div className="text-2xl font-extrabold text-amber-400">₦{Math.round(account.price * 0.2).toLocaleString()}</div>
              </div>
            </div>

            {/* Players */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-white mb-4">Key Players</h3>
              <div className="flex flex-wrap gap-3">
                {account.players.map(player => (
                  <div key={player} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0a0a0a] border border-[#2a2a2a]">
                    <Star className="w-4 h-4 text-amber-400" />
                    <span className="text-white font-medium">{player}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Login Details (Hidden until purchased) */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-white mb-4">Account Login Details</h3>
              {showLogins ? (
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4 text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Payment Successful! Here are your login details:</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-green-500/20">
                      <span className="text-zinc-400">Email:</span>
                      <span className="text-white font-mono">{account.loginEmail}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-zinc-400">Password:</span>
                      <span className="text-white font-mono">{account.loginPassword}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-zinc-500">Please change the password immediately after login for security.</p>
                </div>
              ) : (
                <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-6 text-center">
                  <Lock className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                  <p className="text-zinc-400 mb-2">Login details are hidden</p>
                  <p className="text-sm text-zinc-500">Purchase this account to unlock the login credentials</p>
                </div>
              )}
            </div>

            {/* Buy Button */}
            {!purchased && account.status === 'available' && (
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBuy}
                  className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#7928ca] text-white font-bold text-lg hover:opacity-90 transition-opacity"
                >
                  Buy Now - ₦{account.price.toLocaleString()}
                </button>
              </div>
            )}

            {purchased && (
              <div className="flex items-center gap-2 text-green-400 bg-green-500/10 rounded-xl p-4">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">You own this account! Login details are shown above.</span>
              </div>
            )}

            {!isLoggedIn && (
              <div className="mt-4 flex items-center gap-2 text-amber-400 bg-amber-500/10 rounded-xl p-4">
                <AlertTriangle className="w-5 h-5" />
                <span className="text-sm">Please <button onClick={() => navigate('/login')} className="underline">login</button> to purchase this account</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
