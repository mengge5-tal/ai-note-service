/**
 * KnowledgePanel container component
 * Following FR-003, FR-004, FR-005, FR-006, FR-007, FR-008
 */

import { motion } from 'framer-motion'
import { fadeInUp } from '../../utils/animations'
import { DetailedExplanation } from './DetailedExplanation'
import { Prerequisites } from './Prerequisites'
import { KeyPoints } from './KeyPoints'
import { FunExamples } from './FunExamples'
import { Postrequisites } from './Postrequisites'
import { Conclusion } from './Conclusion'
import type { KnowledgeAnalysisResponse, KnowledgePoint } from '../../types/knowledge'

interface KnowledgePanelProps {
  data: KnowledgeAnalysisResponse
  onKnowledgePointClick: (point: KnowledgePoint) => void
  selectedPoint: KnowledgePoint | null
}

export const KnowledgePanel: React.FC<KnowledgePanelProps> = ({
  data,
  onKnowledgePointClick,
  selectedPoint,
}) => {
  return (
    <motion.div
      {...fadeInUp}
      className="h-full overflow-y-auto p-6 space-y-6"
    >
      {/* 1. 完整的对这张图片的知识点详解 */}
      <DetailedExplanation content={data.detailedExplanation} />
      
      {/* 2. 前置知识点 */}
      <Prerequisites
        points={data.prerequisites}
        onPointClick={onKnowledgePointClick}
        selectedPoint={selectedPoint}
      />
      
      {/* 3. 这张图片中的重点知识点 */}
      <KeyPoints
        points={data.keyPoints}
        onPointClick={onKnowledgePointClick}
        selectedPoint={selectedPoint}
      />
      
      {/* 4. 重点知识点对应的趣味示例 */}
      <FunExamples examples={data.funExamples} />
      
      {/* 5. 这张图片对应的后置知识点 */}
      <Postrequisites
        points={data.postrequisites}
        onPointClick={onKnowledgePointClick}
        selectedPoint={selectedPoint}
      />
      
      {/* 6. 最后的汇总 */}
      <Conclusion content={data.conclusion} />
    </motion.div>
  )
}

