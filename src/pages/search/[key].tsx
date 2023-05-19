import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { DashboardTemplate } from '@/components/templates/dashboard';
import { SearchTemplate } from '@/components/templates/search';

/** TODO: Prevent template remount when navigating between dashboard pages
 * https://nextjs.org/docs/basic-features/layouts
 * */

export default function Search() {
  const { t } = useTranslation('explore');
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
