import { useEffect } from 'react';

import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { PartialDeep } from 'type-fest';

export type VirtualContainerProps<T> = {
  data: PartialDeep<T>[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  itemHeight: (index: number) => number;
  overscan?: number;
};

export function useWindowVirtualInfiniteScroll<T>({
  data,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  itemHeight,
  overscan,
}: VirtualContainerProps<T>) {
  const rowVirtualizer = useWindowVirtualizer<T>({
    count: hasNextPage ? data.length + 1 : data.length,
    estimateSize: itemHeight,
    overscan,
  });

  const items = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    if (
      items.length &&
      items[items.length - 1].index > data.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, items, data.length]);

  return {
    rowVirtualizer,
    items,
  };
}
