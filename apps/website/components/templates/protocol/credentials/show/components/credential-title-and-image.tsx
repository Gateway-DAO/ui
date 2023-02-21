import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { PartialDeep } from 'type-fest';

import { brandColors } from '@gateway/theme';

import { Stack, IconButton, CircularProgress } from '@mui/material';

import {
  ModalTabProps,
  modalContentTypes,
  ModalContentProps,
} from '../../../../../../components/molecules/modal/ModalContentTypes';
import ModalTabs from '../../../../../../components/molecules/modal/modal-tabs';
import { Credential } from '../../../../../../services/gateway-protocol/types';
import InfoTitle from '../../../components/info-title';
import { useProtocolTemplateContext } from '../../../context';

type Props = {
  credential: PartialDeep<Credential>;
};

export default function CredentialTitleAndImage({ credential }: Props) {
  const { t } = useTranslation('protocol');
  const [QRCodeIsOpen, setQRCodeIsOpen] = useState<boolean>(false);
  const { qrCode } = useProtocolTemplateContext();

  const setTabSection = (
    imageUrl: string,
    enableDownloadImage = false
  ): ModalContentProps => {
    return {
      handleClose: () => setQRCodeIsOpen(false),
      children: <img src={imageUrl} alt={credential?.title} width="100%" />,
      imageUrl: imageUrl,
      modalType: modalContentTypes.image,
      swipeableDrawer: true,
      enableDownloadImage,
    };
  };

  const tabs: ModalTabProps[] = [
    {
      key: 'image',
      label: t('credential.image'),
      section: setTabSection(credential?.image),
    },
    {
      key: 'qr-code',
      label: t('credential.qr-code'),
      section: setTabSection(qrCode, true),
    },
  ];

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
          id={credential?.id}
          copySucessMessage={t('credential.copy-id')}
        />
      </Stack>
      <ModalTabs
        open={QRCodeIsOpen}
        title={credential?.title}
        handleClose={() => setQRCodeIsOpen(false)}
        handleOpen={() => setQRCodeIsOpen(true)}
        swipeableDrawer={true}
        tabs={tabs}
      />
    </>
  );
}
