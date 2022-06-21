import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { useMutation } from 'react-query';

import { TOKENS } from '@gateway/theme';

import { Box, Stack, Typography } from '@mui/material';

import { useSnackbar } from '../../../hooks/use-snackbar';
import { gqlMethods } from '../../../services/api';
import PocModalCreated from '../../organisms/poc-modal-created/poc-modal-created';
import { AvatarUploadCard } from './avatar-upload-card';
import { Form } from './form';
import { schema, NewCredentialSchema } from './schema';

export function NewCredentialTemplate() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const methods = useForm<NewCredentialSchema>({
    resolver: yupResolver(schema),
  });

  const session = useSession();
  const snackbar = useSnackbar();

  const updateMutation = useMutation(
    'updateCredential',
    session.data?.user && gqlMethods(session.data.user).create_credential_group,
    {
      onSuccess() {
        snackbar.handleClick({ message: 'Credential created!' });
      },
      onError(error: string) {
        console.log('An error occurred: ' + error);
      },
    }
  );

  const onSubmit = (data: NewCredentialSchema) => {
    const parsedWallets: Array<string> = data.wallets.split('\n');

    updateMutation.mutate(
      {
        ...data,
        image: '',
        wallets: parsedWallets,
      },
      {
        onSuccess: () => handleOpen(),
      }
    );
  };

  return (
    <Stack direction="column" gap={6} p={TOKENS.CONTAINER_PX}>
      <PocModalCreated open={open} handleClose={handleClose} />
      <Typography variant="h4">Create Proof of Credential</Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={6}
      >
        <Box sx={{ width: '25%' }}>
          <Typography variant="h5">Details</Typography>
          {/* <Typography variant="caption">
            Use typography to present your design and content as clearly and
            efficiently as possible.
          </Typography> */}
        </Box>
        <FormProvider {...methods}>
          <Box sx={{ width: '25%' }}>
            <Form onSubmit={onSubmit} />
          </Box>
          <AvatarUploadCard />
        </FormProvider>
      </Stack>
    </Stack>
  );
}
