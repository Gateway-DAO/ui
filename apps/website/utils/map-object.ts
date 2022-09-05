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
