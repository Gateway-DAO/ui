import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { GatesCard } from '@/components/molecules/gates-card';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';
import { GateQuery, Gates } from '@/services/hasura/types';
import { useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  SxProps,
  Dialog,
  Stack,
  Avatar,
  IconButton,
} from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type GatePublishedModalProps = {
  gate?: PartialDeep<Gates>;
  open: boolean;
  handleClose: () => void;
};

export default function GatePublishedModal({
  gate: gateProp,
  open,
  handleClose,
}: GatePublishedModalProps) {
  const router = useRouter();
  const { gqlAuthMethods } = useAuth();

  const {
    data: { gates_by_pk: gate },
  } = useQuery(
    ['gate', gateProp?.id],
    () =>
      gqlAuthMethods.gate({
        id: gateProp.id,
      }),
    {
      initialData: {
        gates_by_pk: {
          title: '',
          image: '',
          description: '',
          categories: [],
          dao: {
            name: '',
          },
          id: '',
          published: '',
          ...gateProp,
        },
      } as GateQuery,
    }
  );

  return (
    <Dialog
      open={open}
      fullScreen={true}
      onClose={handleClose}
      sx={{
        '& .MuiPaper-root': {
          bgcolor: 'background.paper',
          backgroundImage: 'none',
        },
        backgroundImage: 'none',
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack
        direction="column"
        sx={{
          bgcolor: 'background.paper',
          px: { xs: 2, md: 6, lg: 12 },
          py: { xs: 1, md: 5 },
          height: '100%',
          width: { md: '100%' },
          display: 'flex',
        }}
      >
        <Stack justifyContent="flex-start" direction="row">
          <Avatar
            src={'/favicon-512.png'}
            alt={'gateway-logo'}
            sizes={'40px'}
          />
        </Stack>

        <Stack
          direction="column"
          flex={1}
          alignSelf="center"
          alignItems="center"
          justifyContent="center"
          sx={{
            background:
              'radial-gradient(50% 50% at 50% 50%, rgba(154, 83, 255, 0.3) 0%, rgba(154, 83, 255, 0) 100%)',
            width: '100%',
          }}
        >
          <Box>
            <Typography
              id="modal-modal-title"
              variant="h3"
              component="h3"
              textAlign="center"
              sx={{
                mb: 3,
                fontSize: { xs: 24, md: 48 },
                fontWeight: 700,
              }}
            >
              Congratulations!
            </Typography>
            <Typography
              id="modal-modal-description"
              fontSize={16}
              color={'#FFFFFFB2'}
              sx={{
                mx: { xs: 4 },
                textAlign: 'center',
                alignSelf: 'center',
              }}
            >
              You have published the{' '}
              <span style={{ color: '#D083FF' }}>{gate.title}</span> Credential
              from <span style={{ color: '#D083FF' }}>{gate.dao?.name}</span>.
            </Typography>
          </Box>
          <Box
            sx={(theme) => ({
              height: { xs: theme.spacing(45.49), md: theme.spacing(59.78) },
              width: { xs: theme.spacing(28.75), md: theme.spacing(37.75) },
              marginY: (theme) => theme.spacing(5),
            })}
          >
            <GatesCard
              href={
                gate.loyalty_id
                  ? ROUTES.LOYALTY_PROGRAM_CREDENTIAL.replace('[id]', gate.id)
                  : ROUTES.GATE_PROFILE.replace('[id]', gate.id)
              }
              {...gate}
            />
          </Box>
          <Stack
            direction="row"
            justifyContent="center"
            sx={{ mt: { xs: 6, md: 2 }, mb: 3 }}
          >
            <Link
              href={
                gate.loyalty_id
                  ? ROUTES.LOYALTY_PROGRAM_CREDENTIAL.replace('[id]', gate.id)
                  : ROUTES.GATE_PROFILE.replace('[id]', gate.id)
              }
              passHref
            >
              <Button variant="outlined" component="a" size="medium">
                Check Credential
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
}
