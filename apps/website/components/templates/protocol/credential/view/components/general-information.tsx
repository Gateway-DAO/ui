import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { PartialDeep } from 'type-fest';

import { brandColors, theme } from '@gateway/theme';

import {
  Stack,
  Typography,
  alpha,
  Chip,
  useMediaQuery,
  IconButton,
  CircularProgress,
} from '@mui/material';

import ModalImage from '../../../../../../components/molecules/modal-image';
import { Credential } from '../../../../../../services/gateway-protocol/types';
import { useCredentialTemplateContext } from '../../context';
import CopyPaste from './copy-paste';

type Props = {
  credential: PartialDeep<Credential>;
};

export default function GeneralInformation({ credential }: Props) {
  const { t } = useTranslation('protocol');
  const [QRCodeIsOpen, setQRCodeIsOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  const { qrCode } = useCredentialTemplateContext();

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
        <Stack sx={{ verticalAlign: 'center', justifyContent: 'center' }}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography
              fontSize={12}
              sx={{ color: alpha(brandColors.white.main, 0.7) }}
            >
              {t('credential.credential-id')}
            </Typography>
            <CopyPaste
              text={credential?._id}
              sucessMessage={t('credential.copy-id')}
            />
          </Stack>
          <Typography variant="h4" fontSize={isMobile ? 20 : 34}>
            {credential?.title}
          </Typography>
        </Stack>
      </Stack>
      {credential?.dataModel?.tags?.length > 0 && (
        <Stack direction="row" gap={1} sx={{ mb: 2 }}>
          {credential.dataModel.tags.map((tag, index) => (
            <Chip
              label={tag}
              key={index}
              size={isMobile ? 'small' : 'medium'}
            />
          ))}
        </Stack>
      )}
      <Typography sx={{ mb: 3 }}>{credential?.description}</Typography>
      <ModalImage
        open={QRCodeIsOpen}
        image={credential?.image ?? qrCode}
        alt={credential?.title}
        handleClose={() => setQRCodeIsOpen(false)}
        handleOpen={() => setQRCodeIsOpen(true)}
        downloadButtonText={t('credential.download-qrcode')}
        swipeableDrawer={true}
      />
    </>
  );
}
