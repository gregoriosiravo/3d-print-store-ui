export const useDeliveryEstimate = () => {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const range = (minDays = 3, maxDays = 9) => {
    const start = new Date()
    start.setDate(start.getDate() + minDays)

    const end = new Date()
    end.setDate(end.getDate() + maxDays)

    return {
      start,
      end,
      formatted: `${formatDate(start)} - ${formatDate(end)}`,
    }
  }

  const formatted = computed(() => range().formatted)

  return { range, formatted, formatDate }
}
