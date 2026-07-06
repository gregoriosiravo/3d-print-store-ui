interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'match' | 'custom'
  value?: unknown
  message?: string
}

interface ValidationField {
  value: string
  rules: ValidationRule[]
}

export const useFormValidation = () => {
  const errors = reactive<Record<string, string>>({})

  const validate = (fields: Record<string, ValidationField>): boolean => {
    let isValid = true

    for (const [key, field] of Object.entries(fields)) {
      const error = applyRules(field)
      if (error) {
        errors[key] = error
        isValid = false
      } else {
        delete errors[key]
      }
    }

    return isValid
  }

  const applyRules = (field: ValidationField): string | null => {
    for (const rule of field.rules) {
      switch (rule.type) {
        case 'required':
          if (!field.value || !field.value.trim()) {
            return rule.message || 'This field is required'
          }
          break

        case 'email':
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
            return rule.message || 'Invalid email address'
          }
          break

        case 'minLength':
          if (field.value.length < (rule.value as number)) {
            return rule.message || `Minimum ${rule.value} characters required`
          }
          break

        case 'maxLength':
          if (field.value.length > (rule.value as number)) {
            return rule.message || `Maximum ${rule.value} characters allowed`
          }
          break

        case 'match':
          if (field.value !== (rule.value as string)) {
            return rule.message || 'Fields do not match'
          }
          break

        case 'custom':
          if (typeof rule.value === 'function' && !(rule.value as (v: string) => boolean)(field.value)) {
            return rule.message || 'Invalid value'
          }
          break
      }
    }

    return null
  }

  const clearErrors = () => {
    for (const key of Object.keys(errors)) {
      delete errors[key]
    }
  }

  const getError = (key: string): string | undefined => {
    return errors[key]
  }

  const hasError = (key: string): boolean => {
    return key in errors
  }

  return { errors, validate, clearErrors, getError, hasError }
}
