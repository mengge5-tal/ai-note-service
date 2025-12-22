/**
 * React Hook for knowledge points management
 * Following FR-002, FR-003
 */

import { useState, useCallback } from 'react'
import { apiService } from '../services/api'
import type {
  KnowledgeAnalysisResponse,
  Image,
  KnowledgePoint,
} from '../types'

interface UseKnowledgePointsReturn {
  image: Image | null
  knowledgeData: KnowledgeAnalysisResponse | null
  loading: boolean
  error: string | null
  uploadImage: (file: File) => Promise<void>
  selectKnowledgePoint: (point: KnowledgePoint) => void
  selectedKnowledgePoint: KnowledgePoint | null
  reset: () => void
}

export const useKnowledgePoints = (): UseKnowledgePointsReturn => {
  const [image, setImage] = useState<Image | null>(null)
  const [knowledgeData, setKnowledgeData] =
    useState<KnowledgeAnalysisResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedKnowledgePoint, setSelectedKnowledgePoint] =
    useState<KnowledgePoint | null>(null)

  const uploadImage = useCallback(async (file: File) => {
    setLoading(true)
    setError(null)
    setSelectedKnowledgePoint(null)

    try {
      // Create image object
      const imageObj: Image = {
        id: `img-${Date.now()}`,
        file,
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadTimestamp: new Date(),
        processingStatus: 'processing',
      }

      setImage(imageObj)

      // Call API to analyze image
      const data = await apiService.analyzeImage(file)

      setKnowledgeData(data)
      imageObj.processingStatus = 'completed'
      setImage((prev) => ({ ...(prev || imageObj), ...imageObj }))
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '图片分析失败，请稍后重试'
      setError(errorMessage)
      setImage((prev) => {
        if (prev) {
          return { ...prev, processingStatus: 'error' }
        }
        return null
      })
    } finally {
      setLoading(false)
    }
  }, [])

  const selectKnowledgePoint = useCallback((point: KnowledgePoint) => {
    setSelectedKnowledgePoint(point)
  }, [])

  const reset = useCallback(() => {
    if (image?.url) {
      URL.revokeObjectURL(image.url)
    }
    setImage(null)
    setKnowledgeData(null)
    setSelectedKnowledgePoint(null)
    setError(null)
    setLoading(false)
  }, [image])

  return {
    image,
    knowledgeData,
    loading,
    error,
    uploadImage,
    selectKnowledgePoint,
    selectedKnowledgePoint,
    reset,
  }
}

