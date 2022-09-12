import { useRouter } from 'next/router';

import { DateTime } from 'luxon';

// Milisseconds to DateTime
const milissecondsToDateTime = (milisseconds: number) => {
  return DateTime.fromMillis(milisseconds);
};

// Get relative time. Ex: 1 hour ago, 1 day ago, 1 week ago, 1 month ago, 1 year ago
export const useTimeAgo = (timestamp: string) => {
  const { locale } = useRouter();
  const date = milissecondsToDateTime(parseInt(timestamp, 10));
  return date.setLocale(locale).toRelative();
};
