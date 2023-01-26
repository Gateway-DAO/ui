import Link from 'next/link';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { brandColors } from '@gateway/theme';

import { alpha, Stack, Typography } from '@mui/material';

import { Files } from '../../../../services/hasura/types';
import { AvatarFile } from '../../../atoms/avatar-file';
import CardCell from './card-cell';

type Props = {
  label: string;
  name: string;
  picture: PartialDeep<Files>;
  href: string;
  hasLink?: boolean;
  alignRight?: boolean;
  unique?: boolean;
};

export default function CardUserCell({
  label,
  name,
  picture,
  href,
  alignRight = false,
  hasLink = false,
  unique = false,
}: Props) {
  function UserCell() {
    return (
      <Stack
        sx={{
          flexDirection: alignRight ? 'row-reverse' : 'row',
          alignItems: 'center',
          flexBasis: '100%',
          cursor: hasLink ? 'pointer' : 'default',
          borderRadius: unique
            ? '16px 16px 0 0'
            : alignRight
            ? '0 16px 0 0'
            : '16px 0 0 0',
          transition: 'background .3s ease',
          '&:hover': {
            background: alpha(brandColors.white.main, 0.05),
          },
        }}
      >
        <AvatarFile
          file={picture}
          fallback="/avatar.png"
          sx={{ ml: alignRight ? 0 : 2, mr: alignRight ? 2 : 0 }}
        >
          {name}
        </AvatarFile>
        <CardCell label={label} margin={false} alignRight={alignRight}>
          {hasLink ? (
            <Stack
              component="a"
              target="_blank"
              title={`${label} ${name}`}
              sx={{ color: brandColors.purple.main, textDecoration: 'none' }}
            >
              {name}
            </Stack>
          ) : (
            <Typography variant="body2">{name}</Typography>
          )}
        </CardCell>
      </Stack>
    );
  }

  return (
    <>
      {hasLink ? (
        <Link href={href} passHref>
          <UserCell />
        </Link>
      ) : (
        <UserCell />
      )}
    </>
  );
}
