import useTranslation from 'next-translate/useTranslation';

import { Protocol_Api_CredentialData } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Stack, Paper, Typography, Divider } from '@mui/material';

import CardCell from '../../../components/card-cell';
import { claimFields, getClaimType } from '../../create/components/ClaimTypes';
import { ImageView } from './image-view';
import { LinkView } from './link-view';
import { ListView } from './list-view';

type Props = {
  title: string;
  data: PartialDeep<Protocol_Api_CredentialData>[];
};

function ClaimView(fieldData: PartialDeep<Protocol_Api_CredentialData>) {
  const { t } = useTranslation('protocol');

  const type = getClaimType(
    fieldData.type,
    fieldData.metadata?.contentMediaType,
    fieldData.metadata?.format
  );
  if (!fieldData.value || fieldData.value === '')
    return <span>{t('credential.unfilled')}</span>;
  switch (type) {
    case claimFields.image:
      return <ImageView {...fieldData} />;
    case claimFields.array:
      return <ListView {...fieldData} />;
    case claimFields.link:
      return <LinkView {...fieldData} />;
    default:
      return <span>{fieldData.value}</span>;
  }
}

export default function DataTable({ title, data }: Props) {
  return (
    <Paper
      elevation={2}
      component={Stack}
      sx={{
        border: '1px solid rgba(229, 229, 229, 0.12)',
        borderRadius: 2,
        mb: 2,
      }}
    >
      <Typography sx={{ px: 2, pt: 2, fontWeight: 700 }}>{title}</Typography>
      <Stack divider={<Divider />}>
        {data?.map((fieldData, index) => (
          <Stack key={index} direction="row" justifyContent="space-between">
            <CardCell
              label={fieldData?.label}
              margin={false}
              inverted={false}
              py={3}
              disabled={!fieldData.value || fieldData.value === ''}
            >
              <ClaimView {...fieldData} />
            </CardCell>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}