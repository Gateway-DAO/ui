/** A method that clones an object and remove it's undefined, null or empty values */
const validateKey = (value: any): boolean => {
  const isNotUndefined = value !== undefined;
  const isNotNull = value !== null;
  const isNotEmpty = value?.length && value.length > 0;
  return isNotUndefined && isNotNull && isNotEmpty;
};
export const clearObject = <T extends object>(obj: T): Partial<T> => {
  const res = Object.keys(obj).reduce((acc, key) => {
    const value = obj[key as keyof T];
    if (validateKey(value)) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
  return res;
};
