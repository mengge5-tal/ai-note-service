/**
 * Image validation utility
 * Following FR-001: File type and size validation
 */

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export interface ValidationResult {
  valid: boolean
  error?: string
}

export const validateImageFile = (file: File): ValidationResult => {
  // Check file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `不支持的图片格式。请上传 jpg、jpeg、png、gif 或 webp 格式的图片。`,
    }
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `图片文件过大。最大支持 10MB，当前文件大小为 ${(file.size / 1024 / 1024).toFixed(2)}MB。`,
    }
  }

  return { valid: true }
}

export const createImageUrl = (file: File): string => {
  return URL.createObjectURL(file)
}

export const revokeImageUrl = (url: string): void => {
  URL.revokeObjectURL(url)
}

