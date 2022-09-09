import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

if (typeof window !== 'undefined') {
  const localStoragePersister = createSyncStoragePersister({
    storage: localStorage,
  });

  const persistedKeys = ['me', 'token'];

  persistQueryClient({
    queryClient,
    persister: localStoragePersister,
    dehydrateOptions: {
      shouldDehydrateQuery: (query) =>
        query.state.status === 'success' &&
        persistedKeys.includes(query.queryKey[0] as string),
    },
  });
}
