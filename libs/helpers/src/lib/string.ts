/**
 * Shows a string content if not empty,
 * otherwise shows a placeholder.
 */
export function showIfNotEmpty(
  content: string | undefined,
  placeholder: string
) {
  if (!content || content.length === 0) {
    return placeholder;
  }
  return content;
}

/**
 * Limit String by length, adding "..." if necessary.
 */
export const limitChars = (str: string, limit: number) => {
  if (str.length > limit) {
    return str.substring(0, limit) + '...';
  }
  return str;
};

/**
 * Convert ISO date to string.
 */
export const ISOToString = (datetime: string, locale = 'en-US') => {
  const now = new Date();
  const date = new Date(datetime);
  if (!date) {
    return '';
  }
  const formatted = date.toLocaleDateString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });
  return now.getTime() - date.getTime() < 120000 ? `now` : `${formatted}`;
};
