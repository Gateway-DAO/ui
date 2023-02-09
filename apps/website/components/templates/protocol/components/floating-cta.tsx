import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

import { useSnackbar } from 'notistack';

import { brandColors } from '@gateway/theme';

import IosShareIcon from '@mui/icons-material/IosShare';
import LinkIcon from '@mui/icons-material/Link';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import { SpeedDialIcon } from '@mui/material';
import { Box } from '@mui/system';

import ShareOn from '../../../atoms/share-on';
import ModalContent from '../../../molecules/modal-content';
import { taskErrorMessages } from '../../../organisms/tasks/task-error-messages';
import { useProtocolTemplateContext } from '../context';

export default function FloatingCta() {
  const { t } = useTranslation('protocol');
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState<boolean>(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [shareIsOpen, setShareIsOpen] = useState<boolean>(false);
  const [qrCodeIsOpen, setQrCodeIsOpen] = useState<boolean>(false);
  const { qrCode } = useProtocolTemplateContext();

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
      action: () => setShareIsOpen(true),
    },
    { icon: <LinkIcon />, name: 'Copy', action: () => copyUrl() },
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
