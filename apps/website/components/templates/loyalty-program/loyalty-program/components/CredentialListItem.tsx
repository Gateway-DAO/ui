import { useContext, useEffect } from 'react';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { brandColors } from '@gateway/theme';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Chip, Stack, Typography, alpha } from '@mui/material';

import SuccessfullyIcon from '../../../../../components/atoms/icons/successfully-icon';
import SuccessfullyRoundedIcon from '../../../../../components/atoms/icons/successfully-rounded';
import Loading from '../../../../../components/atoms/loading';
import { ROUTES } from '../../../../../constants/routes';
import { useGateStatus } from '../../../../../hooks/use-gate-completed';
import { Gates } from '../../../../../services/hasura/types';
import { useLoyaltyProgramContext } from '../../LoyaltyProgramContext';

type Props = {
  gate: PartialDeep<Gates>;
};

export function CredentialListItem({ gate }: Props) {
  const gateStatus = useGateStatus(gate);
  const { setTotalPoints } = useLoyaltyProgramContext();

  useEffect(() => {
    if (gateStatus.isCompleted) {
      setTotalPoints((prev) => {
        return prev + gate.points;
      });
    }
  }, [gateStatus]);

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
        color: brandColors.white.main,
        textDecoration: 'none',
        background: !gateStatus.isCompleted
          ? alpha(brandColors.purple.main, 0.1)
          : 'none',
        transition: 'background .3s ease',
        '&:hover': {
          background: !gateStatus.isCompleted
            ? alpha(brandColors.purple.main, 0.12)
            : alpha(brandColors.purple.main, 0.03),
        },
      }}
      href={ROUTES.LOYALTY_PROGRAM_CREDENTIAL.replace('[id]', gate.id)}
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
      {gate.points && gate.points > 0 && (
        <Chip
          variant="filled"
          label={`+${gate.points} pts`}
          size="medium"
          sx={{
            color: brandColors.white.main,
            background: alpha(brandColors.white.main, 0.16),
            fontSize: '13px',
            fontWeight: 400,
            lineHeight: 1,
            mr: { xs: 0.5, md: 1 },
          }}
        />
      )}
      {gateStatus.isLoading ? (
        <Loading />
      ) : (
        <>
          {gateStatus?.isCompleted ? (
            <SuccessfullyIcon size="small" sx={{ width: 28, height: 28 }} />
          ) : (
            <SuccessfullyRoundedIcon />
          )}
        </>
      )}
      <KeyboardArrowRightIcon
        sx={{
          color: alpha(brandColors.white.main, 0.7),
          ml: { xs: 0.5, md: 2 },
        }}
      />
    </Stack>
  );
}
