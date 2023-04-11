import { useRouter } from 'next/router';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { brandColors } from '@gateway/theme';

import { Stack, Typography, alpha } from '@mui/material';

import Loading from '../../../../../components/atoms/loading';
import { ROUTES } from '../../../../../constants/routes';
import { useGateCompleted } from '../../../../../hooks/use-gate-completed';
import { Gates } from '../../../../../services/hasura/types';

type Props = {
  gate: PartialDeep<Gates>;
};

export function CredentialListItem({ gate }: Props) {
  const gateCompleted = useGateCompleted(gate);
  const router = useRouter();

  return (
    <Stack
      key={gate.id}
      component="a"
      alignItems="center"
      direction="row"
      gap={0.5}
      sx={{
        padding: { xs: 2, md: '36px 60px' },
        borderBottom: '1px solid rgba(229, 229, 229, 0.12)',
        cursor: 'pointer',
      }}
      onClick={() =>
        router.push({
          pathname: ROUTES.LOYALTY_PROGRAM_CREDENTIAL,
          query: { id: gate.id },
        })
      }
    >
      <Stack
        sx={{
          borderRadius: 1.5,
          aspectRatio: 1,
          overflow: 'hidden',
          alignItems: 'center',
          direction: 'row',
          mr: { xs: 1, md: 4 },
        }}
      >
        <img src={gate?.image} alt={gate?.title} width={56} />
      </Stack>
      <Stack sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{gate?.title}</Typography>
        <Typography
          fontSize={12}
          sx={{ color: alpha(brandColors.white.main, 0.7) }}
        >
          {gate?.description}
        </Typography>
      </Stack>
      <Typography variant="h6">
        {gateCompleted.isLoading ? (
          <Loading />
        ) : (
          <>
            {gateCompleted?.isCompleted
              ? 'Completed ' + gateCompleted.completedTasksCount
              : 'Not completed'}
          </>
        )}
      </Typography>
    </Stack>
  );
}
