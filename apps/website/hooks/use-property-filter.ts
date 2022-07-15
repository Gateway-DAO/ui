import { useCallback, useMemo, useState } from 'react';

/**
 * @typedef {Object} PropertyFilter
 * @property {Object[]} filteredItems - the current items that are being filtered
 * @property {string[]} availableFilters - List of available filters
 * @property {string[]} selectedFilters - List of selected filters
 * @property {method} toggleFilter - Toggles the filter on or off
 */

/**
 * Generates a filtering functionality based on the given property of an object.
 * It returns:
 * - The available values that of the given property.
 * - The current active filtered values
 * - A filtered version of the given array
 * -
 * @param array - an array of items
 * @param propertyOfItem - the property of the item that should be filtered
 * @returns {PropertyFilter} -
 */
export function usePropertyFilter<Item>(
  array: Item[],
  propertyOfItem: keyof Item
) {
  const availableFilters = useMemo(
    () =>
      Array.from(
        new Set<string>(
          array?.reduce(
            (accumulator, item) =>
              accumulator.concat(item[propertyOfItem] || []),
            []
          )
        )
      ).map((filter) => ({
        label: filter,
        value: filter,
      })),
    [array, propertyOfItem]
  );
  const [selectedFilters, setActiveFilters] = useState<string[]>([]);
  const toggleFilter = useCallback(
    (name: string) =>
      setActiveFilters((oldActiveFilters) =>
        oldActiveFilters.includes(name)
          ? oldActiveFilters.filter((filter) => filter !== name)
          : [...oldActiveFilters, name]
      ),
    []
  );

  const filteredItems = useMemo(() => {
    if (!selectedFilters.length) return array;
    return array.filter((item) => {
      const propertyArray = (item[propertyOfItem] as unknown as string[]) || [];
      return propertyArray.some((value) => selectedFilters.includes(value));
    });
  }, [selectedFilters, array, propertyOfItem]);

  const onClear = useCallback(() => {
    setActiveFilters([]);
  }, []);

  return {
    filteredItems,
    availableFilters,
    selectedFilters,
    toggleFilter,
    onClear,
  };
}
