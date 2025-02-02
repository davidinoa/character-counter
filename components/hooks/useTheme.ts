"use client"

import { useState, useEffect } from "react"

export function useTheme() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  const toggleTheme = () => setIsDark(!isDark)

  return { isDark, toggleTheme }
}

