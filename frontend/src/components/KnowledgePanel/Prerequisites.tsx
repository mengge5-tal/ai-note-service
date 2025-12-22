/**
 * Prerequisites component - displays 5 prerequisite knowledge points
 * Following FR-006, FR-008
 */

import { motion } from 'framer-motion'
import { fadeInScale, hoverGlow, clickDisplacement } from '../../utils/animations'
import type { KnowledgePoint } from '../../types'

interface PrerequisitesProps {
  points: KnowledgePoint[]
  onPointClick: (point: KnowledgePoint) => void
  selectedPoint: KnowledgePoint | null
}

export const Prerequisites: React.FC<PrerequisitesProps> = ({
  points,
  onPointClick,
  selectedPoint,
}) => {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-white mb-4">前置知识点</h2>
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
          </motion.div>
        ))}
      </div>
    </div>
  )
}

