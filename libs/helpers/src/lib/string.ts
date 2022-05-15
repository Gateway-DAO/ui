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
