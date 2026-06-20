import { format, parseISO } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import { de } from 'date-fns/locale'

const TZ = 'Europe/Berlin'

export function formatMatchDate(isoUtc: string): string {
  const zoned = toZonedTime(parseISO(isoUtc), TZ)
  return format(zoned, 'EEE, dd. MMM · HH:mm \'Uhr\'', { locale: de })
}

export function formatShortDate(isoUtc: string): string {
  const zoned = toZonedTime(parseISO(isoUtc), TZ)
  return format(zoned, 'dd.MM.', { locale: de })
}

export function formatTime(isoUtc: string): string {
  const zoned = toZonedTime(parseISO(isoUtc), TZ)
  return format(zoned, 'HH:mm', { locale: de })
}
