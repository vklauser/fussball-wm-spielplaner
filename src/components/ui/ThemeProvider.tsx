'use client'

import { useEffect } from 'react'

const BACKGROUND =
  'radial-gradient(ellipse at 50% -10%, hsl(220,90%,15%) 0%, hsl(255,75%,8%) 45%, hsl(270,65%,4%) 70%, hsl(248,45%,2%) 100%)'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.style.background = BACKGROUND
    document.body.style.minHeight = '100vh'
  }, [])

  return <>{children}</>
}
