import React, { createContext, useContext, useCallback } from 'react'
import PaystackPop from '@paystack/inline-js'
import { useToast } from './ToastContext'

interface PaystackContextType {
  initializePayment: (email: string, amount: number, onSuccess?: () => void) => void
}

const PaystackContext = createContext<PaystackContextType | undefined>(undefined)

// Replace with your actual Paystack public key
const PAYSTACK_PUBLIC_KEY = 'pk_test_YOUR_PAYSTACK_PUBLIC_KEY_HERE'

export function PaystackProvider({ children }: { children: React.ReactNode }) {
  const { showToast } = useToast()

  const initializePayment = useCallback((email: string, amount: number, onSuccess?: () => void) => {
    if (PAYSTACK_PUBLIC_KEY === 'pk_test_YOUR_PAYSTACK_PUBLIC_KEY_HERE') {
      showToast('Please add your Paystack public key in PaystackContext.tsx', '⚠️')
      return
    }

    const handler = PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email,
      amount: amount * 100,
      currency: 'NGN',
      ref: `EFS_${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
      metadata: {
        custom_fields: [
          {
            display_name: 'Store',
            variable_name: 'store_name',
            value: 'eFootball Store',
          },
        ],
      },
      callback: (response: { reference: string }) => {
        showToast(`Payment successful! Ref: ${response.reference}`, '🎉')
        onSuccess?.()
      },
      onClose: () => {
        showToast('Payment window closed', 'ℹ️')
      },
    })

    handler.openIframe()
  }, [showToast])

  return (
    <PaystackContext.Provider value={{ initializePayment }}>
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
