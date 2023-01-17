import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { useSnackbar } from 'notistack';

import { brandColors } from '@gateway/theme';

import IosShareIcon from '@mui/icons-material/IosShare';
import LinkIcon from '@mui/icons-material/Link';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { Stack, alpha } from '@mui/material';

import ShareOn from '../../../atoms/share-on';
import ModalContent from '../../../molecules/modal-content';
import { taskErrorMessages } from '../../../organisms/tasks/task-error-messages';
import { useProtocolTemplateContext } from '../context';
import FloatingCtaButton from './floating-cta-button';

export default function FloatingCta() {
  const { t } = useTranslation('protocol');
  const { enqueueSnackbar } = useSnackbar();
  const [shareIsOpen, setShareIsOpen] = useState<boolean>(false);
  const [qrCodeIsOpen, setQrCodeIsOpen] = useState<boolean>(false);
  const { qrCode } = useProtocolTemplateContext();

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      enqueueSnackbar(t('credential.copy-link'));
    } catch (err) {
      enqueueSnackbar(taskErrorMessages['UNEXPECTED_ERROR']);
    }
  };

  return (
    <>
      <Stack
        gap={1}
        sx={{
          position: 'fixed',
          right: { xs: '20px', md: '60px' },
          bottom: { xs: '20px', md: '60px' },
        }}
      >
        <FloatingCtaButton handlerClick={() => setShareIsOpen(true)}>
          <IosShareIcon />
        </FloatingCtaButton>
        <FloatingCtaButton handlerClick={() => copyUrl()}>
          <LinkIcon />
        </FloatingCtaButton>
        <FloatingCtaButton
          handlerClick={() => setQrCodeIsOpen(true)}
          bgColor={brandColors.purple.main}
          bgColorHover={alpha(brandColors.purple.main, 0.7)}
          color={brandColors.white.main}
        >
          <QrCodeIcon />
        </FloatingCtaButton>
      </Stack>
      <ModalContent
        open={shareIsOpen}
        title={t('common:social.share-on')}
        handleClose={() => setShareIsOpen(false)}
        handleOpen={() => setShareIsOpen(true)}
        swipeableDrawer={true}
      >
        <ShareOn />
      </ModalContent>
      <ModalContent
        open={qrCodeIsOpen}
        title={t('credential.qrcode')}
        handleClose={() => setQrCodeIsOpen(false)}
        handleOpen={() => setQrCodeIsOpen(true)}
        swipeableDrawer={true}
        imageUrl={qrCode}
      >
        <img src={qrCode} alt={t('credential.qrcode')} width="100%" />
      </ModalContent>
    </>
  );
}
