import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { PartialDeep } from 'type-fest';

import { brandColors } from '@gateway/theme';

import { Stack, IconButton, CircularProgress } from '@mui/material';

import { Credential } from '../../../../../../services/gateway-protocol/types';
import ModalContent from '../../../../../molecules/modal-content';
import InfoTitle from '../../../components/info-title';
import { useProtocolTemplateContext } from '../../../context';

type Props = {
  credential: PartialDeep<Credential>;
};

export default function CredentialTitleAndImage({ credential }: Props) {
  const { t } = useTranslation('protocol');
  const [QRCodeIsOpen, setQRCodeIsOpen] = useState<boolean>(false);
  const { qrCode } = useProtocolTemplateContext();

  return (
    <>
      <Stack direction="row" gap={3} sx={{ mb: 3 }}>
        <IconButton
          onClick={() => setQRCodeIsOpen(true)}
          disabled={!credential?.image && !qrCode}
          sx={{
            width: 80,
            height: 80,
            backgroundColor: brandColors.background.elevated,
            textAlign: 'center',
            verticalAlign: 'center',
            borderRadius: 1.5,
            p: 0,
            overflow: 'hidden',
          }}
        >
          {credential?.image || qrCode ? (
            <img
              src={credential?.image ?? qrCode}
              alt={credential.title}
              width="100%"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <CircularProgress size={40} />
          )}
        </IconButton>
        <InfoTitle
          title={credential?.title}
          labelId={t('credential.credential-id')}
          id={credential?._id}
          copySucessMessage={t('credential.copy-id')}
        />
      </Stack>
      <ModalContent
        open={QRCodeIsOpen}
        imageUrl={credential?.image ?? qrCode}
        title={credential?.title}
        handleClose={() => setQRCodeIsOpen(false)}
        handleOpen={() => setQRCodeIsOpen(true)}
        swipeableDrawer={true}
      >
        <img
          src={credential?.image ?? qrCode}
          alt={credential?.title}
          width="100%"
        />
      </ModalContent>
    </>
  );
}