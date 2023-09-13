import useTranslation from 'next-translate/useTranslation';

import { query } from '@/constants/queries';
import { useAuth } from '@/providers/auth';
import { useQuery } from '@tanstack/react-query';

import {
  Card,
  CardContent,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

import { UsageLimitItem } from './usage-limit-item';

export function UsageLimit() {
  const { hasuraUserService } = useAuth();
  const { t } = useTranslation('settings');

  const limitUsage = useQuery(
    [query.limit_usage],
    () => hasuraUserService.limit_usage(),
    {
      select: ({ protocol }) => protocol?.getMontlyUserUsage,
    }
  );

  return (
    <Stack mb={3}>
      <Card sx={{ pt: 1 }}>
        <CardContent>
          <Typography variant="body1" mb={1}>
            {t('developer-portal.usage-limit.title')}
          </Typography>
          {limitUsage?.isLoading ? (
            <Skeleton />
          ) : (
            <Stack divider={<Divider sx={{ margin: ' 0 -1rem' }} />}>
              <UsageLimitItem
                title={t('developer-portal.usage-limit.issued-credentials')}
                usage={limitUsage?.data?.monthlyCredentials}
                limit={limitUsage?.data?.datamodelsUsageAllowedByMonth}
              />
              <UsageLimitItem
                title={t('developer-portal.usage-limit.data-model-created')}
                usage={limitUsage?.data?.monthlyDatamodels}
                limit={limitUsage?.data?.datamodelsUsageAllowedByMonth}
              />
            </Stack>
          )}
        </CardContent>
      </Card>
    </Stack>
  );
}
