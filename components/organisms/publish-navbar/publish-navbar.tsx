import { useRouter } from 'next/router';

import { useFormContext } from 'react-hook-form';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AppBar, Toolbar, Avatar, IconButton, Box } from '@mui/material';

import { LoadingButton } from '@/components/atoms/loading-button';
import { CreateGateData } from '../../templates/create-gate/schema';

type Props = {
  isLoading: boolean;
  saveDraft: (data: CreateGateData) => void;
};

export const PublishNavbar = ({ isLoading, saveDraft }: Props) => {
  const router = useRouter();
  const { getValues } = useFormContext<CreateGateData>();

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: 'none',
          padding: { xs: '0 20px 0 10px', md: '20px 90px' },
        }}
      >
        <Toolbar>
          <IconButton
            sx={{ position: 'absolute', left: 0 }}
            onClick={() => router.back()}
          >
            <Avatar>
              <ArrowBackIcon />
            </Avatar>
          </IconButton>
          <Box sx={{ position: 'absolute', right: 0 }}>
            <LoadingButton
              onClick={() => {
                const values = getValues();
                saveDraft(values);
              }}
              variant="outlined"
              size="large"
              isLoading={isLoading}
            >
              Save as Draft
            </LoadingButton>
            <LoadingButton
              type="submit"
              form="gate-details-form"
              variant="contained"
              size="large"
              sx={{ marginLeft: 2 }}
              isLoading={isLoading}
            >
              Publish Credential
            </LoadingButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
