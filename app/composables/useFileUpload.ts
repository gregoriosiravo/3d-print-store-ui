interface FileUploadOptions {
  validTypes?: string[]
  maxSizeMB?: number
}

export const useFileUpload = (options: FileUploadOptions = {}) => {
  const { validTypes = ['.stl', '.obj', '.step'], maxSizeMB = 100 } = options

  const file = ref<File | null>(null)
  const fileName = ref('')
  const isDragging = ref(false)
  const error = ref<string | null>(null)

  const processFile = (f: File): boolean => {
    error.value = null

    const ext = '.' + f.name.split('.').pop()?.toLowerCase()
    if (!ext || !validTypes.includes(ext)) {
      error.value = `Please upload a valid file (${validTypes.join(', ')})`
      return false
    }

    if (f.size > maxSizeMB * 1024 * 1024) {
      error.value = `File size must be less than ${maxSizeMB}MB`
      return false
    }

    file.value = f
    fileName.value = f.name
    return true
  }

  const reset = () => {
    file.value = null
    fileName.value = ''
    isDragging.value = false
    error.value = null
  }

  return {
    file: computed(() => file.value),
    fileName: computed(() => fileName.value),
    isDragging,
    error: computed(() => error.value),
    processFile,
    reset,
  }
}
