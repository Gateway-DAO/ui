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
  const { t } = useTranslation('org-signup');
  const router = useRouter();
  const {
    openCreateQuestDialog,
    setOpenCreateQuestDialog,
    openSendDirectCredentialDialog,
    setOpenSendDirectCredentialDialog,
  } = useDaoProfile();
  const closeDialog = () => {
    toggleDialog(false);
    router.push({ hash: '' });
  };

  useEffect(() => {
    if (open) {
      router.push({ hash: 'create-credential' });
    }
  }, [open]);

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
              title={'Create Credential'}
              caption={'Select the type that fits your needs'}
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
                description="Ask users to do tasks and earn credentials"
                href="test"
                backgroundColor="#9A53FF"
                image="/images/credential-create-quest.png"
                options={[
                  'Enhance user engagement',
                  'Valid skill and acquisition',
                  'Build a community',
                ]}
                slug="Allows you to engage and reward users for their efforts through task-based activities."
                title="Create a Quest"
                disabled={false}
                action={setOpenCreateQuestDialog}
              />
              <InfoCard
                description="Set the recipients and send directly"
                href="test"
                backgroundColor="#0075FF"
                image="/images/credential-create-direct-credential.png"
                options={[
                  'Deliver instantly',
                  'Personalize the distribution',
                  'Simply the workflow',
                ]}
                slug="A seamless and efficient way to distribute credentials directly to recipients."
                title="Send a Credential"
                disabled={false}
                action={setOpenSendDirectCredentialDialog}
              />
              <InfoCard
                description="Enhance user engagement"
                href="test"
                backgroundColor="#FE02B9"
                image="/images/credential-create-loyalty.png"
                options={[
                  'Recognize your community',
                  'Generate social proof',
                  'Create exclusive benefits',
                ]}
                slug="Drive community engagement through the credentials they hold."
                title="Create a Loyalty Pass"
                disabled={true}
              />
            </SectionWithSliderResponsive>
          </Stack>
        </>
      </Stack>
    </Dialog>
  );
}
