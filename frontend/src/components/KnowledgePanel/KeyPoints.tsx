/**
 * KeyPoints component - displays key knowledge points from the image
 */

import React from 'react'
import { motion } from 'framer-motion'
import { fadeInScale, hoverGlow, clickDisplacement } from '../../utils/animations'
import type { KnowledgePoint } from '../../types'

interface KeyPointsProps {
  points: KnowledgePoint[]
  onPointClick: (point: KnowledgePoint) => void
  selectedPoint: KnowledgePoint | null
}

export const KeyPoints: React.FC<KeyPointsProps> = ({
  points,
  onPointClick,
  selectedPoint,
}) => {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-white mb-4">重点知识点</h2>
      <div className="space-y-2">
        {points.map((point, index) => (
          <motion.div
            key={point.id}
            initial={fadeInScale.initial}
            animate={fadeInScale.animate}
            whileHover={hoverGlow.whileHover}
            whileTap={clickDisplacement.whileTap}
            transition={{ ...fadeInScale.transition, delay: index * 0.1 }}
            onClick={() => onPointClick(point)}
            className={`glass rounded-lg p-4 cursor-pointer transition-all ${
              selectedPoint?.id === point.id
                ? 'border-2 border-purple-500 glow'
                : 'border border-white/20'
            }`}
          >
            <h3 className="font-semibold text-white">{point.title}</h3>
            <p className="text-sm text-gray-400 mt-1">{point.description}</p>
            {point.category && (
              <span className="inline-block mt-2 px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded">
                {point.category}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

