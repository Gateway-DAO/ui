import useTranslation from 'next-translate/useTranslation';

import { Card, CardContent, Divider, Stack, Typography } from '@mui/material';

import { UsageLimitItem } from './usage-limit-item';

export function UsageLimit() {
  const { t } = useTranslation('settings');

  //MOCK
  const usageLimits = [
    {
      title: 'Issued credentials',
      initialValue: 1000,
      limitValue: 1000,
    },
    {
      title: 'Datamodel created',
      initialValue: 45,
      limitValue: 200,
    },
  ];

  return (
    <Stack mb={3}>
      <Card sx={{ pt: 1 }}>
        <CardContent>
          <Typography variant="body1" mb={1}>
            {t('developer-portal.usage-limit.title')}
          </Typography>
          <Stack divider={<Divider sx={{ margin: ' 0 -1rem' }} />}>
            {usageLimits.map((usageLimitsItem, index) => (
              <UsageLimitItem
                key={index}
                title={usageLimitsItem.title}
                initialValue={usageLimitsItem.initialValue}
                limitValue={usageLimitsItem.limitValue}
              />
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
