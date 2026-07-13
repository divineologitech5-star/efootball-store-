import React, { createContext, useContext, useState, useCallback } from 'react'
import { User } from '../types'

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  isSeller: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string, country: string) => Promise<boolean>
  logout: () => void
  upgradeToSeller: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo users (in production, use Firebase/Backend)
const DEMO_USERS: User[] = [
  {
    id: '1',
    email: 'buyer@demo.com',
    name: 'Demo Buyer',
    isSeller: false,
    sellerPaid: false,
    country: 'Nigeria',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'seller@demo.com',
    name: 'Demo Seller',
    isSeller: true,
    sellerPaid: true,
    country: 'Nigeria',
    createdAt: new Date().toISOString(),
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Demo login - check demo users
    const found = DEMO_USERS.find(u => u.email === email)
    if (found) {
      setUser(found)
      return true
    }
    // Check localStorage for signed up users
    const users = JSON.parse(localStorage.getItem('efootball_users') || '[]')
    const stored = users.find((u: User) => u.email === email)
    if (stored) {
      setUser(stored)
      return true
    }
    return false
  }, [])

  const signup = useCallback(async (name: string, email: string, password: string, country: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('efootball_users') || '[]')
    if (users.find((u: User) => u.email === email)) {
      return false // Email exists
    }
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      isSeller: false,
      sellerPaid: false,
      country,
      createdAt: new Date().toISOString(),
    }
    users.push(newUser)
    localStorage.setItem('efootball_users', JSON.stringify(users))
    setUser(newUser)
    return true
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const upgradeToSeller = useCallback(() => {
    if (user) {
      const updated = { ...user, isSeller: true, sellerPaid: true }
      setUser(updated)
      // Update in localStorage
      const users = JSON.parse(localStorage.getItem('efootball_users') || '[]')
      const idx = users.findIndex((u: User) => u.id === user.id)
      if (idx >= 0) users[idx] = updated
      else users.push(updated)
      localStorage.setItem('efootball_users', JSON.stringify(users))
    }
  }, [user])

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      isSeller: user?.isSeller ?? false,
      login,
      signup,
      logout,
      upgradeToSeller,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
