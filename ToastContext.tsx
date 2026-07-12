import React, { createContext, useContext, useState, useCallback } from 'react'

interface Toast {
  id: number
  message: string
  icon: string
}

interface ToastContextType {
  showToast: (message: string, icon?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

let toastId = 0

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, icon = '✅') => {
    const id = ++toastId
    setToasts(prev => [...prev, { id, message, icon }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 2500)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] flex flex-col gap-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="bg-card border border-border rounded-xl px-6 py-3.5 flex items-center gap-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.5)] animate-fade-in-up"
          >
            <span className="text-xl">{toast.icon}</span>
            <span className="text-sm font-medium text-foreground">{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
