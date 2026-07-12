import React, { createContext, useContext, useState, useEffect } from 'react'

interface ThemeContextType {
  isDark: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark')
    }
    return true
  })

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.style.setProperty('--background', '0 0% 4%')
      document.documentElement.style.setProperty('--foreground', '0 0% 100%')
      document.documentElement.style.setProperty('--card', '0 0% 8%')
      document.documentElement.style.setProperty('--card-foreground', '0 0% 100%')
      document.documentElement.style.setProperty('--popover', '0 0% 8%')
      document.documentElement.style.setProperty('--popover-foreground', '0 0% 100%')
      document.documentElement.style.setProperty('--primary', '187 100% 50%')
      document.documentElement.style.setProperty('--primary-foreground', '0 0% 0%')
      document.documentElement.style.setProperty('--secondary', '0 0% 12%')
      document.documentElement.style.setProperty('--secondary-foreground', '0 0% 100%')
      document.documentElement.style.setProperty('--muted', '0 0% 12%')
      document.documentElement.style.setProperty('--muted-foreground', '240 5% 65%')
      document.documentElement.style.setProperty('--accent', '274 65% 42%')
      document.documentElement.style.setProperty('--accent-foreground', '0 0% 100%')
      document.documentElement.style.setProperty('--destructive', '0 84% 60%')
      document.documentElement.style.setProperty('--destructive-foreground', '0 0% 100%')
      document.documentElement.style.setProperty('--border', '0 0% 16%')
      document.documentElement.style.setProperty('--input', '0 0% 16%')
      document.documentElement.style.setProperty('--ring', '187 100% 50%')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.setProperty('--background', '0 0% 100%')
      document.documentElement.style.setProperty('--foreground', '0 0% 10%')
      document.documentElement.style.setProperty('--card', '0 0% 100%')
      document.documentElement.style.setProperty('--card-foreground', '0 0% 10%')
      document.documentElement.style.setProperty('--popover', '0 0% 100%')
      document.documentElement.style.setProperty('--popover-foreground', '0 0% 10%')
      document.documentElement.style.setProperty('--primary', '187 100% 45%')
      document.documentElement.style.setProperty('--primary-foreground', '0 0% 100%')
      document.documentElement.style.setProperty('--secondary', '0 0% 96%')
      document.documentElement.style.setProperty('--secondary-foreground', '0 0% 10%')
      document.documentElement.style.setProperty('--muted', '0 0% 96%')
      document.documentElement.style.setProperty('--muted-foreground', '0 0% 45%')
      document.documentElement.style.setProperty('--accent', '274 65% 50%')
      document.documentElement.style.setProperty('--accent-foreground', '0 0% 100%')
      document.documentElement.style.setProperty('--destructive', '0 84% 60%')
      document.documentElement.style.setProperty('--destructive-foreground', '0 0% 100%')
      document.documentElement.style.setProperty('--border', '0 0% 90%')
      document.documentElement.style.setProperty('--input', '0 0% 90%')
      document.documentElement.style.setProperty('--ring', '187 100% 45%')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark(prev => !prev)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
