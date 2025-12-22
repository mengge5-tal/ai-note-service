/**
 * Postrequisites component - displays 5 postrequisite knowledge points
 * Following FR-007, FR-008
 */

import { motion } from 'framer-motion'
import { fadeInScale, hoverGlow, clickDisplacement } from '../../utils/animations'
import type { KnowledgePoint } from '../../types'

interface PostrequisitesProps {
  points: KnowledgePoint[]
  onPointClick: (point: KnowledgePoint) => void
  selectedPoint: KnowledgePoint | null
}

export const Postrequisites: React.FC<PostrequisitesProps> = ({
  points,
  onPointClick,
  selectedPoint,
}) => {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-white mb-4">后置知识点</h2>
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

