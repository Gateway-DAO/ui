import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

import { brandColors } from '@/theme';
import { useSnackbar } from 'notistack';
import { PartialDeep } from 'type-fest';

import IosShareIcon from '@mui/icons-material/IosShare';
import LinkIcon from '@mui/icons-material/Link';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import { Box } from '@mui/system';

import { Credential } from '@/services/gateway-protocol/types';
import { useCreateQrCode } from '../../../../utils/qr-code/qr-code';
import ShareOn from '@/components/atoms/share-on';
import ModalContent from '../../../molecules/modal/modal-basic';
import { taskErrorMessages } from '../../../organisms/tasks/task-error-messages';
import { useProtocolTemplateContext } from '../context';

export default function FloatingCta({
  isCredential,
  credential,
}: {
  isCredential?: boolean;
  credential?: PartialDeep<Credential>;
}) {
  const { t } = useTranslation('protocol');
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState<boolean>(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [shareIsOpen, setShareIsOpen] = useState<boolean>(false);
  const [qrCodeIsOpen, setQrCodeIsOpen] = useState<boolean>(false);
  // const { qrCode } = useProtocolTemplateContext();
  const qrCode = useCreateQrCode();

  useEffect(() => {
    function handleScroll() {
      setOpen(window.pageYOffset < 80);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      enqueueSnackbar(t('credential.copy-link'));
    } catch (err) {
      enqueueSnackbar(taskErrorMessages['UNEXPECTED_ERROR']);
    }
  };

  const actions = [
    {
      icon: <IosShareIcon />,
      name: 'Share',
      id: 'datamodel-fab-share',
      action: () => setShareIsOpen(true),
    },
    {
      icon: <LinkIcon />,
      name: 'Copy',
      id: 'datamodel-fab-copylink',
      action: () => copyUrl(),
    },
  ];

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          right: { xs: '20px', md: '60px' },
          bottom: { xs: '20px', md: '60px' },
          height: 320,
          transform: 'translateZ(0px)',
          flexGrow: 1,
          zIndex: 2,
        }}
      >
        <SpeedDial
          openIcon={<QrCodeIcon />}
          ariaLabel="sharing options"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={open ? <QrCodeIcon /> : <MoreHorizIcon />}
          FabProps={{
            sx: {
              color: open ? 'white' : brandColors.purple.main,
              bgcolor: open ? 'primary.main' : 'rgba(154, 83, 255, 0.1)',
              backdropFilter: 'blur(16px)',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'white',
              },
            },
            onClick: () => {
              open ? setQrCodeIsOpen(true) : handleOpen();
            },
          }}
          open={open}
        >
          {actions.map((fab) => (
            <SpeedDialAction
              FabProps={{
                size: 'large',
                sx: {
                  color: brandColors.purple.main,
                  bgcolor: 'rgba(154, 83, 255, 0.15)',
                  backdropFilter: 'blur(16px)',
                  '&:hover': {
                    backgroundColor: 'rgba(154, 83, 255, 0.3)',
                  },
                },
              }}
              id={fab.id}
              key={fab.name}
              icon={fab.icon}
              onClick={fab.action}
              tooltipTitle={fab.name}
            />
          ))}
        </SpeedDial>
      </Box>
      <ModalContent
        open={shareIsOpen}
        title={t('common:social.share-on')}
        handleClose={() => setShareIsOpen(false)}
        handleOpen={() => setShareIsOpen(true)}
        swipeableDrawer={true}
        fullWidth
      >
        <ShareOn isCredential={isCredential} credential={credential} />
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
