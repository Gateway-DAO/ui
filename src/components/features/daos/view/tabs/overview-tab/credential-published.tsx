import { GatesCard } from '@/components/molecules/cards/gates-card';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';
import { GateQuery, Gates } from '@/services/hasura/types';
import { useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import { Button, Dialog, Stack, Avatar, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ShareButton } from '@/components/atoms/buttons/share-button';
import IosShareIcon from '@mui/icons-material/IosShare';
import CloseIcon from '@mui/icons-material/Close';

type GatePublishedModalProps = {
  gate?: PartialDeep<Gates>;
  open: boolean;
  handleClose: () => void;
};

export default function CredentialPublishedModal({
  gate: gateProp,
  open,
  handleClose,
}: GatePublishedModalProps) {
  const { hasuraUserService } = useAuth();

  const {
    data: { gates_by_pk: gate },
  } = useQuery(
    ['gate', gateProp?.id],
    () =>
      hasuraUserService.gate({
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
        <Stack justifyContent="space-between" direction="row">
          <Avatar
            src={'/favicon-512.png'}
            alt={'gateway-logo'}
            sizes={'40px'}
          />
          <>
            <Avatar>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Avatar>
          </>
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
          <Box display={'flex'} flexDirection={'column'}>
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
              Quest Published
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
            <div
              style={{
                alignSelf: 'center',
                justifySelf: 'center',
                marginTop: 10,
              }}
            >
              <ShareButton
                customComponent={
                  <Button
                    variant="contained"
                    sx={{ px: 9 }}
                    startIcon={<IosShareIcon />}
                  >
                    Share
                  </Button>
                }
              />
            </div>
          </Box>
          <Box
            sx={(theme) => ({
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
        </Stack>
      </Stack>
    </Dialog>
  );
}
