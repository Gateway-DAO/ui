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
