'use client'

import { useEffect, useState } from 'react'

export type Currency = {
  code: string
  symbol_left: string
  value: number
}

export function useCurrency() {
  const [currency, setCurrency] = useState<Currency | null>(null)

  useEffect(() => {
    const loadCurrency = () => {
      const stored = localStorage.getItem('currency')
      if (stored) {
        setCurrency(JSON.parse(stored))
      }
    }

    loadCurrency()

    window.addEventListener('currencyChange', loadCurrency)

    return () => window.removeEventListener('currencyChange', loadCurrency)
  }, [])

  return currency
}