import Link from 'next/link';

import {
  SuccessfullyIcon,
  SuccessfullyRoundedIcon,
} from '@/components/atoms/icons';
import { ROUTES } from '@/constants/routes';
import { Gates } from '@/services/hasura/types';
import { brandColors } from '@/theme';
import { limitChars } from '@/utils/string';
import { PartialDeep } from 'type-fest/source/partial-deep';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Chip, Stack, Typography, alpha } from '@mui/material';

type Props = {
  gate: PartialDeep<Gates>;
  gateIsCompleted: boolean;
  image?: string;
  points?: number;
  protocol_id: string;
};

export function CredentialListItem({
  gate,
  gateIsCompleted,
  image,
  points,
  protocol_id,
}: Props) {
  return (
    <Link
      href={
        protocol_id
          ? ROUTES.PROTOCOL_CREDENTIAL.replace('[id]', protocol_id)
          : ROUTES.LOYALTY_PROGRAM_CREDENTIAL.replace('[id]', gate?.id)
      }
      passHref
    >
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
          background: !gateIsCompleted
            ? alpha(brandColors.purple.main, 0.1)
            : 'none',
          transition: 'background .3s ease',
          '&:hover': {
            background: !gateIsCompleted
              ? alpha(brandColors.purple.main, 0.12)
              : alpha(brandColors.purple.main, 0.03),
          },
        }}
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
          <img src={image ?? gate?.image} alt={gate?.title} width={56} />
        </Stack>
        <Stack sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{gate?.title}</Typography>
          <Typography
            fontSize={12}
            sx={{
              color: alpha(brandColors.white.main, 0.7),
            }}
          >
            {limitChars(gate?.description, 90)}
          </Typography>
        </Stack>
        {points && points > 0 && (
          <Chip
            variant="filled"
            label={`+${points} pts`}
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
        {gateIsCompleted ? (
          <SuccessfullyIcon size="small" sx={{ width: 28, height: 28 }} />
        ) : (
          <SuccessfullyRoundedIcon />
        )}
        <KeyboardArrowRightIcon
          sx={{
            color: alpha(brandColors.white.main, 0.7),
            ml: { xs: 0.5, md: 2 },
          }}
        />
      </Stack>
    </Link>
  );
}
