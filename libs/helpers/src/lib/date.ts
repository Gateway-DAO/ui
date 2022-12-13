import { DateTime } from 'luxon';

/**
 * Convert ISO date to string.
 */
export const ISOToString = (datetime: string, locale = 'en-US') => {
  return DateTime.fromISO(datetime, { zone: 'utc' })
    .setLocale(locale)
    .toRelative();
};