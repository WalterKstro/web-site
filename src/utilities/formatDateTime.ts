export const formatDateTime = (
  timestamp: string | { date: string; format?: 'default' | 'monthYear' | 'year' },
): string => {
  let dateStr: string
  let format: 'default' | 'monthYear' | 'year' = 'default'

  if (typeof timestamp === 'object' && timestamp !== null) {
    dateStr = timestamp.date
    format = timestamp.format || 'default'
  } else {
    dateStr = timestamp
  }

  const date = dateStr ? new Date(dateStr) : new Date()

  if (format === 'year') {
    return date.getFullYear().toString()
  }

  if (format === 'monthYear') {
    const monthNames = [
      'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
      'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
    ]
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`
  }

  const months = date.getMonth()
  const days = date.getDate()
  const MM = months + 1 < 10 ? `0${months + 1}` : months + 1
  const DD = days < 10 ? `0${days}` : days
  const YYYY = date.getFullYear()

  return `${MM}/${DD}/${YYYY}`
}
