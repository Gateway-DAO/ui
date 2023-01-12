import Link from 'next/link';

import { PartialObjectDeep } from 'type-fest/source/partial-deep';

import { brandColors } from '@gateway/theme';

import { Stack, Typography } from '@mui/material';

import { ROUTES } from '../../../../../../constants/routes';
import { Users } from '../../../../../../services/hasura/types';
import { AvatarFile } from '../../../../../atoms/avatar-file';
import CardCell from '../../../components/card-cell';

type Props = {
  label: string;
  user: PartialObjectDeep<Users>;
  hasLink?: boolean;
  alignRight?: boolean;
};

export default function CardUserCell({
  label,
  user,
  alignRight = false,
  hasLink = false,
}: Props) {
  const name = user?.username ?? user?.ens ?? user?.wallet;

  return (
    <Stack
      sx={{
        flexDirection: alignRight ? 'row-reverse' : 'row',
        alignItems: 'center',
        flexBasis: '100%',
      }}
    >
      <AvatarFile
        file={user?.picture}
        fallback="/avatar.png"
        sx={{ ml: alignRight ? 0 : 2, mr: alignRight ? 2 : 0 }}
      >
        {user?.username}
      </AvatarFile>
      <CardCell label={label} margin={false} alignRight={alignRight}>
        {hasLink ? (
          <Link
            href={ROUTES.PROFILE.replace('[username]', user.username)}
            passHref
          >
            <Stack
              component="a"
              target="_blank"
              title={`${label} ${user?.username}`}
              sx={{ color: brandColors.purple.main, textDecoration: 'none' }}
            >
              {name}
            </Stack>
          </Link>
        ) : (
          <Typography variant="body2">{name}</Typography>
        )}
      </CardCell>
    </Stack>
  );
}
