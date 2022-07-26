import { QueryClient } from 'react-query';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

if (typeof window !== 'undefined') {
  const localStoragePersistor = createWebStoragePersistor({
    storage: localStorage,
  });

  persistQueryClient({
    queryClient,
    persistor: localStoragePersistor,
  });
}
