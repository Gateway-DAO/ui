import { PartialDeep } from 'type-fest/source/partial-deep';

import { brandColors } from '@gateway/theme';

import { Stack, Paper, Typography, alpha, Divider } from '@mui/material';

import { CredentialData } from '../../../../../../services/gateway-protocol/types';
import CardCell from '../../../components/card-cell';
import ChipInputType from '../../../components/chip-input-type';
import { getClaimType } from '../../../credentials/create/components/ClaimTypes';

type Props = {
  title: string;
  data: PartialDeep<CredentialData>[];
  subtitle1: string;
  subtitle2: string;
};

export default function TableSchema({
  title,
  data,
  subtitle1,
  subtitle2,
}: Props) {
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
      <Stack
        sx={{ px: 2, pt: 2 }}
        direction="row"
        justifyContent="space-between"
      >
        <Typography
          fontSize={12}
          sx={{
            textTransform: 'uppercase',
            fontWeight: 600,
            color: alpha(brandColors.white.main, 0.7),
          }}
        >
          {subtitle1}
        </Typography>
        <Typography
          fontSize={12}
          sx={{
            fontWeight: 600,
            textTransform: 'uppercase',
            color: alpha(brandColors.white.main, 0.7),
          }}
        >
          {subtitle2}
        </Typography>
      </Stack>

      <Stack divider={<Divider />}>
        {Object.keys(data)?.map((item, index) => (
          <Stack
            key={index}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <CardCell label={data[item].title} margin={false} py={3}>
              {data[item].description}
            </CardCell>
            <Stack sx={{ mr: 2, my: 2 }}>
              <ChipInputType
                type={getClaimType(
                  data[item]?.type,
                  data[item]?.contentMediaType
                )}
              />
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}
