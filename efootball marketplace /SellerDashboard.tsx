import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Trash2, Eye, DollarSign, TrendingUp, Package, Users } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useMarketplace } from '../contexts/MarketplaceContext'
import { AccountListing } from '../types'

export function SellerDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { listings, addListing, getSellerListings } = useMarketplace()
  const [showForm, setShowForm] = useState(false)

  const myListings = user ? getSellerListings(user.id) : []
  const soldListings = myListings.filter(l => l.status === 'sold')
  const availableListings = myListings.filter(l => l.status === 'available')

  const totalEarnings = soldListings.reduce((sum, l) => sum + Math.round(l.price * 0.8), 0)
  const totalSales = soldListings.length

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    teamStrength: 2000,
    players: '',
    price: '',
    currency: 'NGN',
    loginEmail: '',
    loginPassword: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    const newListing: Omit<AccountListing, 'id' | 'createdAt' | 'status'> = {
      sellerId: user.id,
      sellerName: user.name,
      title: formData.title,
      description: formData.description,
      teamStrength: Number(formData.teamStrength),
      players: formData.players.split(',').map(p => p.trim()).filter(Boolean),
      price: Number(formData.price),
      currency: formData.currency,
      loginEmail: formData.loginEmail,
      loginPassword: formData.loginPassword,
    }

    addListing(newListing)
    setShowForm(false)
    setFormData({
      title: '', description: '', teamStrength: 2000, players: '', price: '', currency: 'NGN', loginEmail: '', loginPassword: '',
    })
  }

  if (!user?.isSeller) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 px-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-white mb-2">Seller Access Required</h2>
          <p className="text-zinc-400 mb-6">You need to register as a seller to access this dashboard.</p>
          <button
            onClick={() => navigate('/become-seller')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#7928ca] text-white font-semibold"
          >
            Become a Seller
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Seller Dashboard</h1>
            <p className="text-zinc-400">Manage your eFootball account listings</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#7928ca] text-white font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" /> List New Account
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span className="text-sm text-zinc-400">Total Earnings</span>
            </div>
            <div className="text-2xl font-extrabold text-white">₦{totalEarnings.toLocaleString()}</div>
          </div>
          <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-[#00e5ff]" />
              <span className="text-sm text-zinc-400">Total Sales</span>
            </div>
            <div className="text-2xl font-extrabold text-white">{totalSales}</div>
          </div>
          <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-5 h-5 text-amber-400" />
              <span className="text-sm text-zinc-400">Active Listings</span>
            </div>
            <div className="text-2xl font-extrabold text-white">{availableListings.length}</div>
          </div>
          <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-zinc-400">Your Cut</span>
            </div>
            <div className="text-2xl font-extrabold text-white">80%</div>
          </div>
        </div>

        {/* New Listing Form */}
        {showForm && (
          <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-6">List New Account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Account Title</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g., Maxed Account - 2500 TS"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#2a2a2a] text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#00e5ff]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Team Strength</label>
                  <input
                    required
                    type="number"
                    min="1500"
                    max="3000"
                    value={formData.teamStrength}
                    onChange={e => setFormData({...formData, teamStrength: Number(e.target.value)})}
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#00e5ff]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Description</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the account features, special players, etc."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#2a2a2a] text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#00e5ff]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Key Players (comma separated)</label>
                  <input
                    required
                    type="text"
                    placeholder="Messi, Ronaldo, Neymar"
                    value={formData.players}
                    onChange={e => setFormData({...formData, players: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#2a2a2a] text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#00e5ff]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Price</label>
                    <input
                      required
                      type="number"
                      min="1000"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#00e5ff]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Currency</label>
                    <select
                      value={formData.currency}
                      onChange={e => setFormData({...formData, currency: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#00e5ff]"
                    >
                      <option value="NGN">NGN (₦)</option>
                      <option value="USD">USD ($)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0a0a] rounded-xl p-4 border border-[#2a2a2a]">
                <h3 className="text-sm font-semibold text-white mb-3">Account Login Credentials (Hidden from buyers)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Game Login Email</label>
                    <input
                      required
                      type="email"
                      value={formData.loginEmail}
                      onChange={e => setFormData({...formData, loginEmail: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#00e5ff]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Game Login Password</label>
                    <input
                      required
                      type="password"
                      value={formData.loginPassword}
                      onChange={e => setFormData({...formData, loginPassword: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#00e5ff]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 rounded-xl border border-[#2a2a2a] text-white font-semibold hover:bg-[#161616]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#7928ca] text-white font-bold hover:opacity-90"
                >
                  List Account
                </button>
              </div>
            </form>
          </div>
        )}

        {/* My Listings */}
        <h2 className="text-xl font-bold text-white mb-4">My Listings</h2>
        {myListings.length === 0 ? (
          <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-12 text-center">
            <Package className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-400">No listings yet. Click "List New Account" to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myListings.map(listing => (
              <div key={listing.id} className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded-md text-xs font-bold ${listing.status === 'available' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                    {listing.status === 'available' ? 'Available' : 'Sold'}
                  </span>
                  <span className="text-lg font-extrabold text-white">₦{listing.price.toLocaleString()}</span>
                </div>
                <h3 className="text-white font-semibold mb-2">{listing.title}</h3>
                <p className="text-sm text-zinc-400 mb-3 line-clamp-2">{listing.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {listing.players.slice(0, 3).map(p => (
                    <span key={p} className="px-2 py-1 rounded bg-[#2a2a2a] text-xs text-zinc-300">{p}</span>
                  ))}
                </div>
                {listing.status === 'sold' && (
                  <div className="pt-3 border-t border-[#2a2a2a]">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Your earnings:</span>
                      <span className="text-green-400 font-bold">₦{Math.round(listing.price * 0.8).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-zinc-400">Platform fee:</span>
                      <span className="text-amber-400">₦{Math.round(listing.price * 0.2).toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
