import { useRouter } from 'next/router';

import { SearchTemplate } from '@/components/features/search';
import { DashboardTemplate } from '@/components/templates/dashboard';

/** TODO: Prevent template remount when navigating between dashboard pages
 * https://nextjs.org/docs/basic-features/layouts
 * */

export default function Search() {
  const router = useRouter();
  const { key } = router.query;

  if (!key) return null;

  return (
    <DashboardTemplate
      containerProps={{
        sx: {
          pt: 2,
          overflow: 'hidden',
        },
      }}
    >
      <SearchTemplate query={key as string} />
    </DashboardTemplate>
  );
}
