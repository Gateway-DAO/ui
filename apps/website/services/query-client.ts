import { QueryClient } from 'react-query';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';

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
  const localStoragePersistor = createWebStoragePersistor({
    storage: localStorage,
  });

  const persistedKeys = ['me', 'token'];

  persistQueryClient({
    queryClient,
    persistor: localStoragePersistor,
    dehydrateOptions: {
      shouldDehydrateQuery: (query) =>
        query.state.status === 'success' &&
        persistedKeys.includes(query.queryKey[0] as string),
    },
  });
}
