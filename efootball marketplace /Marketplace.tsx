import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Star, Shield, Eye } from 'lucide-react'
import { useMarketplace } from '../contexts/MarketplaceContext'
import { useAuth } from '../contexts/AuthContext'

export function Marketplace() {
  const { listings } = useMarketplace()
  const { isLoggedIn } = useAuth()
  const [search, setSearch] = useState('')
  const [minStrength, setMinStrength] = useState(0)
  const [maxPrice, setMaxPrice] = useState(100000)

  const filtered = listings.filter(l => {
    if (l.status !== 'available') return false
    const matchesSearch = l.title.toLowerCase().includes(search.toLowerCase()) ||
                         l.players.some(p => p.toLowerCase().includes(search.toLowerCase()))
    const matchesStrength = l.teamStrength >= minStrength
    const matchesPrice = l.price <= maxPrice
    return matchesSearch && matchesStrength && matchesPrice
  })

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white mb-4">Account Marketplace</h1>
          <p className="text-zinc-400">Browse verified eFootball accounts from trusted sellers</p>
        </div>

        {/* Search & Filters */}
        <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search by player name or account title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#2a2a2a] text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#00e5ff] transition-colors"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={minStrength}
                onChange={(e) => setMinStrength(Number(e.target.value))}
                className="px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#00e5ff]"
              >
                <option value={0}>Min Strength</option>
                <option value={2000}>2000+</option>
                <option value={2200}>2200+</option>
                <option value={2400}>2400+</option>
              </select>
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#2a2a2a] text-white focus:outline-none focus:border-[#00e5ff]"
              >
                <option value={100000}>Max Price</option>
                <option value={5000}>₦5,000</option>
                <option value={10000}>₦10,000</option>
                <option value={20000}>₦20,000</option>
                <option value={50000}>₦50,000</option>
              </select>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(account => (
            <Link
              key={account.id}
              to={`/account/${account.id}`}
              className="group bg-[#161616] border border-[#2a2a2a] rounded-2xl overflow-hidden transition-all hover:border-[#3a3a3a] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              <div className="h-48 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center relative">
                <div className="text-6xl">⚽</div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-green-500/20 text-green-400 text-xs font-bold uppercase">
                  Available
                </div>
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-[#00e5ff]/20 text-[#00e5ff] text-xs font-bold">
                  Strength: {account.teamStrength}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-[#00e5ff]" />
                  <span className="text-xs text-[#00e5ff] font-semibold">Verified Seller</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00e5ff] transition-colors">{account.title}</h3>
                <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{account.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {account.players.slice(0, 3).map(player => (
                    <span key={player} className="px-2 py-1 rounded-md bg-[#2a2a2a] text-xs text-zinc-300">{player}</span>
                  ))}
                  {account.players.length > 3 && (
                    <span className="px-2 py-1 rounded-md bg-[#2a2a2a] text-xs text-zinc-500">+{account.players.length - 3}</span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#2a2a2a]">
                  <div>
                    <span className="text-2xl font-extrabold text-white">₦{account.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400 text-sm">
                    <Eye className="w-4 h-4" />
                    <span>Login hidden</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-zinc-400 text-lg">No accounts found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
