import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { brandColors } from '@gateway/theme';

import CloseIcon from '@mui/icons-material/Close';
import { Stack, Typography, IconButton, alpha } from '@mui/material';

import { ROUTES } from '../../../../../constants/routes';
import { CreateCredentialInput } from '../../../../../services/gateway-protocol/types';
import { DataModel } from '../../../../../services/gateway-protocol/types';
import CredentialCreateForm from './components/credential-create-form';

type CreateCredentialProps = {
  dataModel: PartialDeep<DataModel>;
  oldData?: CreateCredentialInput;
};

export default function CredentialProtocolCreate({
  dataModel,
  oldData,
}: CreateCredentialProps) {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  const closeForm = () => {
    router
      .push({
        pathname: ROUTES.PROTOCOL_DATAMODEL,
        query: { id: router?.query?.id },
      })
      .then(() => (document.body.style.overflow = 'auto'));
  };

  return (
    <>
      <Stack
        onClick={() => closeForm()}
        sx={{
          background: 'rgba(0,0,0, 0.2)',
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 9998,
          cursor: 'alias',
        }}
      ></Stack>
      <Stack
        sx={{
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.12) 100%), #10041C',
          px: { xs: 3, md: 6 },
          py: { xs: 3, md: 6 },
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100%',
          width: { xs: '100%', md: '600px', lg: '720px' },
          boxShadow: '1px 0px 4px rgba(0,0,0,0.3)',
          zIndex: 9999,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 5 }}
        >
          <Typography variant="h5">Issue Credential</Typography>
          <IconButton
            sx={{ background: alpha(brandColors.white.main, 0.16) }}
            onClick={() => closeForm()}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        <Typography fontWeight={600}>Add details</Typography>
        <Typography
          fontSize={14}
          sx={{ color: alpha(brandColors.white.main, 0.7), mb: 3 }}
        >
          Add the details of the credential
        </Typography>
        <CredentialCreateForm oldData={oldData} dataModel={dataModel} />
      </Stack>
    </>
  );
}
