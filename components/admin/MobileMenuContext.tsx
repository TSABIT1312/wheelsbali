'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

type MobileMenuValue = {
  open: boolean
  toggle: () => void
  close: () => void
}

const MobileMenuContext = createContext<MobileMenuValue | null>(null)

export function MobileMenuProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const toggle = useCallback(() => setOpen((v) => !v), [])
  const close = useCallback(() => setOpen(false), [])

  // Auto-close on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <MobileMenuContext.Provider value={{ open, toggle, close }}>
      {children}
    </MobileMenuContext.Provider>
  )
}

export function useMobileMenu(): MobileMenuValue {
  const ctx = useContext(MobileMenuContext)
  if (!ctx) throw new Error('useMobileMenu must be used inside MobileMenuProvider')
  return ctx
}
