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

export const limitCharsCentered = (str: string, characters: number) => {
  if (str.length > characters) {
    return (
      str.substring(0, characters / 2) +
      '...' +
      str.substring(str.length - characters / 2, str.length)
    );
  }
  return str;
};
