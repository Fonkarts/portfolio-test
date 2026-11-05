const monthYearFormatter = new Intl.DateTimeFormat('fr-FR', { month: 'short', year: 'numeric' })

/** Convertit une date "YYYY-MM" en objet Date (1er du mois). */
function parseYearMonth(value: string): Date {
  const [year, month] = value.split('-').map(Number)
  return new Date(year, month - 1, 1)
}

function formatMonthYear(value: string): string {
  return monthYearFormatter.format(parseYearMonth(value))
}

/** "mars 2023 → aujourd'hui" */
export function formatPeriod(start: string, end: string | null): string {
  return `${formatMonthYear(start)} → ${end ? formatMonthYear(end) : "aujourd'hui"}`
}

/** "2 ans 3 mois" (mois de début et de fin inclus) */
export function formatDuration(start: string, end: string | null): string {
  const from = parseYearMonth(start)
  const to = end ? parseYearMonth(end) : new Date()
  const totalMonths =
    (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth()) + 1
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  const parts = [
    years > 0 && `${years} an${years > 1 ? 's' : ''}`,
    months > 0 && `${months} mois`,
  ].filter(Boolean)

  return parts.join(' ')
}
