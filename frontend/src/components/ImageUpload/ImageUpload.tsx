/**
 * ImageUpload component
 * Following FR-001, FR-043, FR-044
 */

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, hoverScale } from '../../utils/animations'
import { validateImageFile } from '../../utils/imageValidation'
import type { Image } from '../../types/knowledge'

interface ImageUploadProps {
  onUpload: (file: File) => Promise<void>
  image: Image | null
  loading: boolean
  error: string | null
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onUpload,
  image,
  loading,
  error,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleFileSelect = async (file: File) => {
    const validation = validateImageFile(file)
    if (!validation.valid) {
      // Error will be handled by parent
      return
    }

    await onUpload(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  return (
    <motion.div
      {...fadeInUp}
      className="w-full max-w-2xl"
    >
      <div
        className={`glass rounded-xl p-12 border-2 border-dashed transition-all ${
          dragActive
            ? 'border-purple-500 bg-purple-500/10'
            : 'border-white/20 hover:border-white/40'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {image ? (
          <div className="space-y-4">
            <img
              src={image.url}
              alt={image.name}
              className="max-w-full max-h-96 rounded-lg mx-auto"
            />
            {loading && (
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                <p className="mt-2 text-sm text-gray-400">正在分析图片...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center space-y-4">
            <motion.button
              {...hoverScale}
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-gradient-purple-pink rounded-lg font-medium text-white shadow-lg hover:shadow-xl transition-shadow"
            >
              选择图片
            </motion.button>
            <p className="text-sm text-gray-400">或拖拽图片到此处</p>
            <p className="text-xs text-gray-500">
              支持 JPG、PNG、GIF、WEBP，最大 10MB
            </p>
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300"
          >
            {error}
          </motion.div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          onChange={handleChange}
          className="hidden"
        />
      </div>
    </motion.div>
  )
}

