import React, { createContext, useContext, useCallback } from 'react'
import PaystackPop from '@paystack/inline-js'

interface PaystackContextType {
  initializePayment: (email: string, amount: number, metadata?: Record<string, string>, onSuccess?: () => void) => void
  getCurrencyRate: (currency: string) => number
}

const PaystackContext = createContext<PaystackContextType | undefined>(undefined)

const PAYSTACK_PUBLIC_KEY = 'pk_test_YOUR_PAYSTACK_PUBLIC_KEY_HERE'

// Exchange rates (approximate)
const RATES: Record<string, number> = {
  NGN: 1,
  USD: 0.00065,
  EUR: 0.0006,
  GBP: 0.0005,
}

export function PaystackProvider({ children }: { children: React.ReactNode }) {
  const initializePayment = useCallback((email: string, amount: number, metadata?: Record<string, string>, onSuccess?: () => void) => {
    if (PAYSTACK_PUBLIC_KEY === 'pk_test_YOUR_PAYSTACK_PUBLIC_KEY_HERE') {
      alert('Please add your Paystack public key in PaystackContext.tsx')
      return
    }

    const handler = PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email,
      amount: amount * 100,
      currency: 'NGN',
      ref: `EFM_${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
      metadata: {
        custom_fields: Object.entries(metadata || {}).map(([key, value]) => ({
          display_name: key,
          variable_name: key.toLowerCase().replace(/\s/g, '_'),
          value,
        })),
      },
      callback: (response: { reference: string }) => {
        alert(`Payment successful! Ref: ${response.reference}`)
        onSuccess?.()
      },
      onClose: () => {
        console.log('Payment window closed')
      },
    })

    handler.openIframe()
  }, [])

  const getCurrencyRate = useCallback((currency: string) => {
    return RATES[currency] || RATES.NGN
  }, [])

  return (
    <PaystackContext.Provider value={{ initializePayment, getCurrencyRate }}>
      {children}
    </PaystackContext.Provider>
  )
}

export function usePaystack() {
  const context = useContext(PaystackContext)
  if (context === undefined) {
    throw new Error('usePaystack must be used within a PaystackProvider')
  }
  return context
}
