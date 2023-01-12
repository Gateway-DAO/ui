import Link from 'next/link';

import { PartialObjectDeep } from 'type-fest/source/partial-deep';

import { brandColors } from '@gateway/theme';

import { Stack, Typography } from '@mui/material';

import { Files } from '../../../../services/hasura/types';
import { AvatarFile } from '../../../atoms/avatar-file';
import CardCell from './card-cell';

type Props = {
  label: string;
  name: string;
  picture: PartialObjectDeep<Files>;
  href: string;
  hasLink?: boolean;
  alignRight?: boolean;
};

export default function CardUserCell({
  label,
  name,
  picture,
  href,
  alignRight = false,
  hasLink = false,
}: Props) {
  return (
    <Stack
      sx={{
        flexDirection: alignRight ? 'row-reverse' : 'row',
        alignItems: 'center',
        flexBasis: '100%',
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
          <Link href={href} passHref>
            <Stack
              component="a"
              target="_blank"
              title={`${label} ${name}`}
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
