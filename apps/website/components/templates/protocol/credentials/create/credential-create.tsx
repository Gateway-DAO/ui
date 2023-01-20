import { useEffect, useRef } from 'react';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { brandColors } from '@gateway/theme';

import { Stack, Typography, alpha } from '@mui/material';

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
  return (
    <Stack>
      <Typography fontWeight={600}>Add details</Typography>
      <Typography
        fontSize={14}
        sx={{ color: alpha(brandColors.white.main, 0.7), mb: 3 }}
      >
        Add the details of the credential
      </Typography>
      <CredentialCreateForm dataModel={dataModel} />
    </Stack>
  );
}
