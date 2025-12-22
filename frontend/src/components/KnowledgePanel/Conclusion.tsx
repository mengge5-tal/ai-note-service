/**
 * Conclusion component - displays final summary
 */

import React from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '../../utils/animations'

interface ConclusionProps {
  content: string
}

export const Conclusion: React.FC<ConclusionProps> = ({ content }) => {
  return (
    <motion.div {...fadeInUp} className="space-y-3">
      <h2 className="text-xl font-bold text-white mb-4">总结</h2>
      <div className="glass rounded-lg p-6 border border-white/20">
        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
          {content}
        </p>
      </div>
    </motion.div>
  )
}

