import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import { AvatarFile } from '@/components/atoms/avatar-file';
import MorePopover from '@/components/atoms/more-popover';
import { useDaoProfile } from '@/components/features/daos/view';
import ConfirmDialog from '@/components/molecules/modal/confirm-dialog';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';
import { Gates } from '@/services/hasura/types';
import { badgeProps } from '@/utils/badge-props';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import type { PartialDeep } from 'type-fest';

import {
  CardActionArea,
  CardHeader,
  Box,
  Divider,
  Button,
} from '@mui/material';
import MUICard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { AddOrganizationIcon } from '@/components/atoms/icons/add-organization-icon';
import Image from 'next/image';

/* TODO: Arias and Labels */
type InfoCardProps = {
  image: string;
  slug: string;
  href: string;
  description: string;
  title: string;
  options: string[];
  backgroundColor: string;
  disabled: boolean;
};

export function InfoCard({
  title,
  image,
  description,
  slug,
  options,
  href,
  backgroundColor,
  disabled,
}: InfoCardProps): JSX.Element {
  const contentChildren = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <CardHeader
          sx={{
            background: backgroundColor,
            width: '56px',
            height: '56px',
            borderRadius: '64px',
            ml: 1,
            px: 1.4,
          }}
          avatar={
            <Image src={image} alt={title} width={'32px'} height={'32px'} />
          }
        />
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              fontSize: '20px',
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: '16px',
            }}
          >
            {description}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: '16px',
              mb: '32px',
              fontSize: '16px',
            }}
          >
            {slug}
          </Typography>
          {options.map((option) => (
            <>
              <Typography
                color="text.secondary"
                sx={{
                  my: '9px',
                  fontSize: '16px',
                }}
              >
                {option}
              </Typography>
              <Divider />
            </>
          ))}
          <Button
            variant="contained"
            disabled={disabled}
            fullWidth
            sx={{ height: 48, mt: 10 }}
          >
            {disabled ? 'Coming Soon' : 'Create'}
          </Button>
        </CardContent>
      </Box>
    </>
  );

  return (
    <>
      {
        <MUICard
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignContent: 'flex-start',
            padding: '32px',
            width: '450px',
          }}
        >
          {contentChildren}
        </MUICard>
      }
    </>
  );
}
