/**
 * Type definitions for Knowledge domain entities
 * Based on data-model.md
 */

export interface Image {
  id: string
  file: File
  url: string
  name: string
  size: number
  type: string
  uploadTimestamp: Date
  processingStatus: 'pending' | 'processing' | 'completed' | 'error'
}

export interface KnowledgePoint {
  id: string
  title: string
  description: string
  category?: string
  confidence?: number
  position?: { x: number; y: number }
  selected?: boolean
  expanded?: boolean
}

export interface FunExample {
  knowledgePointId: string
  title: string
  content: string
  imageUrl?: string
}

export interface KnowledgeAnalysisResponse {
  detailedExplanation: string // 完整的对这张图片的知识点详解
  prerequisites: KnowledgePoint[] // 前置知识点
  keyPoints: KnowledgePoint[] // 这张图片中的重点知识点
  funExamples: FunExample[] // 重点知识点对应的趣味示例
  postrequisites: KnowledgePoint[] // 这张图片对应的后置知识点
  conclusion: string // 最后的汇总
}

