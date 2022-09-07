export const getMapValueFromObject = (
  objectToMap,
  identifier,
  defaultValue
) => {
  if (objectToMap) {
    return objectToMap[identifier] || defaultValue;
  }
  return defaultValue;
};

export default function objectToParams(object: {
  [key: string]: string | number | undefined | null;
}) {
  const params = Object.entries(object)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    );

  return params.length > 0 ? `?${params.join('&')}` : '';
}
