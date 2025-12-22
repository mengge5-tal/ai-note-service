/**
 * Error handling utilities
 * Following FR-020, FR-026
 */

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export const formatErrorMessage = (error: unknown): string => {
  if (error instanceof AppError) {
    return error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return '发生未知错误，请稍后重试'
}

export const getErrorSuggestions = (error: unknown): string[] => {
  const suggestions: string[] = []

  if (error instanceof AppError) {
    switch (error.code) {
      case 'NETWORK_ERROR':
        suggestions.push('检查网络连接')
        suggestions.push('确认后端服务是否运行')
        break
      case 'FILE_TOO_LARGE':
        suggestions.push('请选择小于10MB的图片文件')
        break
      case 'INVALID_FILE_TYPE':
        suggestions.push('请选择jpg、jpeg、png、gif或webp格式的图片')
        break
      case 'API_ERROR':
        suggestions.push('检查API配置是否正确')
        suggestions.push('确认后端服务是否可用')
        break
      default:
        suggestions.push('请稍后重试')
    }
  }

  return suggestions
}

