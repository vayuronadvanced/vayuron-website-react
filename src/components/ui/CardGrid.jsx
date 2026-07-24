{/* CardGrid.jsx - Reusable component for premium card hover effects */ }

import { useState } from 'react'
import { motion } from 'framer-motion'

export function CardGrid({ children, gridClassName = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6', mobileMax5 = false }) {
  const [hoveredId, setHoveredId] = useState(null)

  // Convert children to array and filter out null/undefined
  const childArray = Array.isArray(children) ? children : [children]

  return (
    <div className={`card-grid ${mobileMax5 ? 'mobile-max-5' : ''} ${gridClassName}`}>
      {childArray.map((child, idx) => {
        // Use child key if available, otherwise use index
        const cardId = child?.key || `card-${idx}`

        return (
          <motion.div
            key={cardId}
            onMouseEnter={() => setHoveredId(cardId)}
            onMouseLeave={() => setHoveredId(null)}
            animate={{
              scale: hoveredId === null || hoveredId === cardId ? 1 : 0.96,
              filter: hoveredId === null || hoveredId === cardId ? 'blur(0px)' : 'blur(2px)',
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ originY: 0 }}
          >
            <motion.div
              animate={{
                scale: hoveredId === cardId ? 1.06 : 1,
                y: hoveredId === cardId ? -16 : 0,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                boxShadow: hoveredId === cardId
                  ? '0 20px 40px rgba(0, 212, 255, 0.25)'
                  : '0 0px 0px rgba(0, 212, 255, 0)',
              }}
              className="h-full"
            >
              {child}
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}

/**
 * Alternative: CardGridWithRef for cases where you need direct ref access
 * Useful for analytics, scroll reveal, or other custom hooks
 */
export function CardGridWithRef({
  children,
  gridClassName = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6',
  onCardHover = null, // Optional callback: (hoveredId) => {}
}) {
  const [hoveredId, setHoveredId] = useState(null)

  const childArray = Array.isArray(children) ? children : [children]

  const handleHover = (cardId) => {
    setHoveredId(cardId)
    onCardHover?.(cardId)
  }

  return (
    <div className={`card-grid ${gridClassName}`}>
      {childArray.map((child, idx) => {
        const cardId = child?.key || `card-${idx}`

        return (
          <motion.div
            key={cardId}
            onMouseEnter={() => handleHover(cardId)}
            onMouseLeave={() => {
              setHoveredId(null)
              onCardHover?.(null)
            }}
            animate={{
              scale: hoveredId === null || hoveredId === cardId ? 1 : 0.96,
              filter: hoveredId === null || hoveredId === cardId ? 'blur(0px)' : 'blur(2px)',
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ originY: 0 }}
          >
            <motion.div
              animate={{
                scale: hoveredId === cardId ? 1.06 : 1,
                y: hoveredId === cardId ? -16 : 0,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                boxShadow: hoveredId === cardId
                  ? '0 20px 40px rgba(0, 212, 255, 0.2)'
                  : '0 0px 0px rgba(0, 212, 255, 0)',
              }}
              className="h-full"
            >
              {child}
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default CardGrid
