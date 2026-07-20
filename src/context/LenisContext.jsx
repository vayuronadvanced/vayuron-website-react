{/*LenisContext.jsx*/}

import { createContext, useContext } from 'react'

export const LenisContext = createContext(null)

/**
 * Access the app-wide Lenis instance (null if reduced-motion disabled it,
 * or if called outside SmoothScrollProvider).
 */
export function useLenis() {
  return useContext(LenisContext)
}
