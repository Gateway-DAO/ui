import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Avatar, Dialog, IconButton, Stack } from '@mui/material';
import { SlideUp } from '@/components/atoms/transitions/transitions';

import CloseIcon from '@mui/icons-material/Close';
import { InfoCard } from './info-card';
import { SectionWithSliderResponsive } from '@/components/molecules/sections';
import { useDaoProfile } from '../../context';

export default function CreateCredentialDialog({
  open,
  toggleDialog,
}: {
  open: boolean;
  toggleDialog: (value: boolean) => void;
}) {
  const { t } = useTranslation('dao-profile');
  const router = useRouter();
  const { setOpenCreateQuestDialog, setOpenSendDirectCredentialDialog } =
    useDaoProfile();
  const closeDialog = () => {
    toggleDialog(false);
    router.push({ hash: '' });
  };

  useEffect(() => {
    if (open) {
      router.push({ hash: 'create-credential' });
    }
  }, [open]);
  console.log();
  return (
    <Dialog
      open={open}
      TransitionComponent={SlideUp}
      fullScreen
      sx={{
        bgcolor: 'background.paper',
        ' .MuiDialog-paper': { backgroundImage: 'none' },
      }}
    >
      <Stack
        direction="column"
        sx={{
          bgcolor: 'background.paper',
          height: '100%',
          width: { md: '100%' },
          display: 'flex',
        }}
      >
        <>
          <Stack sx={{ mt: { md: 0, lg: 8, xs: 0 } }}>
            <SectionWithSliderResponsive
              title={t('overview-tab.create-credential-modal.title')}
              caption={t('overview-tab.create-credential-modal.description')}
              action={
                <IconButton onClick={() => closeDialog()} sx={{ pt: 0.7 }}>
                  <Avatar>
                    <CloseIcon />
                  </Avatar>
                </IconButton>
              }
              actionOnTop={true}
              itemWidth={(theme) => theme.spacing(37.75)}
              gridSize={{ lg: 3 }}
            >
              <InfoCard
                description={t(
                  'overview-tab.create-credential-modal.create-a-quest.description'
                )}
                backgroundColor="#9A53FF"
                image="/images/credential-create-quest.png"
                options={t(
                  'overview-tab.create-credential-modal.create-a-quest.options',
                  null,
                  {
                    returnObjects: true,
                  }
                )}
                slug={t(
                  'overview-tab.create-credential-modal.create-a-quest.long-description'
                )}
                title={t(
                  'overview-tab.create-credential-modal.create-a-quest.title'
                )}
                disabled={false}
                action={setOpenCreateQuestDialog}
              />
              <InfoCard
                description={t(
                  'overview-tab.create-credential-modal.send-a-credential.description'
                )}
                backgroundColor="#0075FF"
                image="/images/credential-create-direct-credential.png"
                options={t(
                  'overview-tab.create-credential-modal.send-a-credential.options',
                  null,
                  {
                    returnObjects: true,
                  }
                )}
                slug={t(
                  'overview-tab.create-credential-modal.send-a-credential.long-description'
                )}
                title={t(
                  'overview-tab.create-credential-modal.send-a-credential.title'
                )}
                disabled={false}
                action={setOpenSendDirectCredentialDialog}
              />
              <InfoCard
                description={t(
                  'overview-tab.create-credential-modal.create-a-loyalty-pass.description'
                )}
                backgroundColor="#FE02B9"
                image="/images/credential-create-loyalty.png"
                options={t(
                  'overview-tab.create-credential-modal.create-a-loyalty-pass.options',
                  null,
                  {
                    returnObjects: true,
                  }
                )}
                slug={t(
                  'overview-tab.create-credential-modal.create-a-loyalty-pass.long-description'
                )}
                title={t(
                  'overview-tab.create-credential-modal.create-a-loyalty-pass.title'
                )}
                disabled={true}
              />
            </SectionWithSliderResponsive>
          </Stack>
        </>
      </Stack>
    </Dialog>
  );
}
