import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Menu, X, User, LogOut, Store } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export function Navbar() {
  const { user, isLoggedIn, isSeller, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/marketplace', label: 'Buy Accounts' },
    ...(isSeller ? [{ to: '/seller-dashboard', label: 'Seller Dashboard' }] : []),
    ...(isLoggedIn ? [] : [{ to: '/become-seller', label: 'Become a Seller' }]),
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-16 flex items-center justify-between px-6 lg:px-10 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#2a2a2a]">
      <Link to="/" className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#7928ca] flex items-center justify-center text-base">
          ⚽
        </div>
        <span className="font-extrabold text-xl tracking-tight text-white">eFootball Market</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-sm font-medium transition-colors ${location.pathname === link.to ? 'text-[#00e5ff]' : 'text-zinc-400 hover:text-white'}`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {isLoggedIn ? (
          <>
            <span className="hidden md:block text-sm text-zinc-400">{user?.name}</span>
            <button
              onClick={logout}
              className="p-2 rounded-lg border border-[#2a2a2a] hover:border-[#3a3a3a] hover:bg-[#161616] transition-all text-zinc-400 hover:text-white"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Login</Link>
            <Link to="/signup" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#7928ca] text-white text-sm font-semibold hover:opacity-90 transition-all">
              Sign Up
            </Link>
          </>
        )}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#0a0a0a] border-b border-[#2a2a2a] p-4 md:hidden flex flex-col gap-3">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} className="text-sm font-medium text-zinc-400 hover:text-white py-2" onClick={() => setMobileMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          {isLoggedIn && (
            <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-left text-sm font-medium text-red-400 py-2">Logout</button>
          )}
        </div>
      )}
    </nav>
  )
}
