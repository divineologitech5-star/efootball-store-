import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const redirect = new URLSearchParams(location.search).get('redirect') || '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const success = await login(email, password)
    if (success) {
      navigate(redirect)
    } else {
      setError('Invalid email or password. Try buyer@demo.com / any password')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 px-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00e5ff] to-[#7928ca] flex items-center justify-center text-2xl mx-auto mb-4">
            ⚽
          </div>
          <h1 className="text-2xl font-extrabold text-white">Welcome Back</h1>
          <p className="text-zinc-400 mt-2">Login to buy or sell eFootball accounts</p>
        </div>

        <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-6">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Email</label>
              <input
                required
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#2a2a2a] text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#00e5ff]"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Password</label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-[#0a0a0a] border border-[#2a2a2a] text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#00e5ff]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#7928ca] text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-zinc-400 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#00e5ff] hover:underline">Sign up</Link>
            </p>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-[#0a0a0a] border border-[#2a2a2a]">
            <p className="text-xs text-zinc-500">Demo credentials:</p>
            <p className="text-xs text-zinc-400">Buyer: buyer@demo.com (any password)</p>
            <p className="text-xs text-zinc-400">Seller: seller@demo.com (any password)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
