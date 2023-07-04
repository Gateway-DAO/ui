import useTranslation from 'next-translate/useTranslation';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import MorePopover from '@/components/atoms/more-popover';
import { TitleSubtitleField } from '@/components/atoms/title-field';
import { Protocol_Api_AuthType } from '@/services/hasura/types';
import { brandColors } from '@/theme';
import { PartialDeep } from 'type-fest/source/partial-deep';
import { v4 as uuidv4 } from 'uuid';

import { Chip, Divider, Skeleton, Stack, Typography } from '@mui/material';

type Props = {
  authentications: PartialDeep<{
    type: Protocol_Api_AuthType;
    data: {
      [x: string]: string;
    };
  }>[];
  isLoading: boolean;
};

export function EmailAlias({ authentications, isLoading }: Props) {
  const { t } = useTranslation('settings');

  const options = (email: string) => {
    return [
      {
        text: 'Disconnect',
        action: () => console.log('Joao', email),
        hidden: false,
      },
    ];
  };

  return (
    <Stack gap={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <TitleSubtitleField
          title={t('account-management.email-section-title')}
          subtitle={t('account-management.email-section-desc')}
        />
        <LoadingButton variant="text" sx={{ display: 'none' }}>
          {t('account-management.email-section-btn')}
        </LoadingButton>
      </Stack>
      {isLoading ? (
        <Skeleton sx={{ height: 30 }} />
      ) : (
        <Stack divider={<Divider sx={{ margin: ' 0 -3.7rem' }} />}>
          {authentications
            ?.filter((a) => a.type === 'EMAIL')
            .map((item, index) => (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                gap={2}
                py={2}
                key={index}
              >
                <Typography sx={{ flexGrow: 1 }}>
                  {item?.data?.email}
                </Typography>
                <Chip
                  label="Primary"
                  color="success"
                  size="small"
                  sx={{ backgroundColor: brandColors.green.main }}
                />
                {authentications.length > 1 && (
                  <MorePopover
                    options={options(item?.data?.email)}
                    withBackground
                    key={uuidv4()}
                  />
                )}
              </Stack>
            ))}
        </Stack>
      )}
    </Stack>
  );
}
