/**
 * Framer Motion Spring animation presets
 * Following Constitution Principle 1 & 3: Physics-based Spring animations
 */

export const springConfig = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
}

export const springGentle = {
  type: 'spring' as const,
  stiffness: 200,
  damping: 25,
}

export const springBouncy = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 25,
}

// Entrance animations
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: springConfig,
}

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: springConfig,
}

// Interaction feedback animations
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: springGentle,
}

export const hoverGlow = {
  whileHover: {
    boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)',
    scale: 1.02,
  },
  transition: springGentle,
}

export const clickDisplacement = {
  whileTap: {
    y: 2,
    scale: 0.98,
  },
  transition: springBouncy,
}

