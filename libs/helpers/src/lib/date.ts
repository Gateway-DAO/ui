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
  if (!datetime) {
    return nullableMessage;
  }
  return new Date(datetime?.toLocaleString()).toLocaleString(locale);
};

export const isToday = (ISODate: string): boolean => {
  const day = DateTime.fromISO(ISODate).day;
  const month = DateTime.fromISO(ISODate).month;
  const year = DateTime.fromISO(ISODate).year;
  return (
    year === DateTime.now().year &&
    month === DateTime.now().month &&
    day === DateTime.now().day
  );
};
