import { DateTime } from 'luxon';

/**
 * Convert ISO date to string.
 */
export const ISOToString = (datetime: string, locale = 'en-US') => {
  return DateTime.fromISO(datetime, { zone: 'utc' })
    .setLocale(locale)
    .toRelative();
};

export const timestampToString = (
  datetime: string,
  locale = 'en-US',
  nullableMessage: string
) => {
  console.log('entrou', datetime);
  if (!datetime) {
    return nullableMessage;
  }
  return new Date(datetime?.toLocaleString()).toLocaleString(locale);
};
