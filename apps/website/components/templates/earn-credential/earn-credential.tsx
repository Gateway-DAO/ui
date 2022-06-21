import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { useMutation } from 'react-query';

import { TOKENS } from '@gateway/theme';

import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import {
  Avatar,
  Box,
  Chip,
  Grid,
  Stack,
  Typography,
  Divider,
  Button,
} from '@mui/material';

import { gqlMethods } from '../../../services/api';
import { NavBarAvatar } from '../../organisms/navbar/navbar-avatar';
import PocModalCompleted from '../../organisms/poc-modal-completed/poc-modal-completed';
import { AccomplishmentsForm } from './accomplishments-form';
import {
  accomplishmentsSchema,
  AccomplishmentsTypes,
} from './accomplishments-schema';
import { CredentialDetailsForm } from './credential-details-form';
import {
  credentialDetailsSchema,
  CredentialDetailsTypes,
} from './credential-details-schema';

export function EarnCredentialTemplate({ credentialInfo }) {
  const session = useSession();
  const router = useRouter();

  const [credential, setCredential] = useState({
    id: null,
    name: '',
    description: '',
  });
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState('');
  const [commitmentLevel, setCommitmentLevel] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isStillWorking, setIsStillWorking] = useState(false);
  const [responsibilities, setResponsibilities] = useState('');
  const [accomplishmentsCount, setAccomplishmentsCount] = useState(1);
  const [accomplishments, setAccomplishments] = useState([
    {
      id: accomplishmentsCount,
      title: '',
      accomplishmentDescription: '',
      type: '',
      link: '',
      description: '',
    },
  ]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (credentialInfo) {
      setCredential({
        id: credentialInfo['credentials_by_pk'].id,
        name: credentialInfo['credentials_by_pk'].name,
        description: credentialInfo['credentials_by_pk'].description,
      });
    }
  }, [credentialInfo]);

  const credentialDetailsMethods = useForm<CredentialDetailsTypes>({
    resolver: yupResolver(credentialDetailsSchema),
  });
  const accomplishmentsMethods = useForm<AccomplishmentsTypes>({
    resolver: yupResolver(accomplishmentsSchema),
  });
  const credentialImgUrl =
    'https://i.postimg.cc/6QJDW2r1/olympus-credential-picture.png';
  const randomNftUrl = 'https://i.ibb.co/bzzgBfT/random-nft.png';

  const updateMutation = useMutation(
    'completeCredential',
    session.data?.user && gqlMethods(session.data.user).complete_credential,
    {
      onSuccess() {
        handleOpen();
      },
    }
  );

  const complete = (credentialId) => {
    const data = {
      details: {
        role,
        commitmentLevel,
        startDate: new Date(startDate),
        endDate: isStillWorking ? null : new Date(endDate),
        isStillWorking,
        responsibilities,
      },
      accomplishments,
    };

    updateMutation.mutate(
      {
        group_id: credentialId,
        ...data,
      },
      {
        onSuccess: () => handleOpen(),
      }
    );
  };

  const addAccomplishment = () => {
    setAccomplishmentsCount(accomplishmentsCount + 1);
    setAccomplishments([
      ...accomplishments,
      {
        id: accomplishmentsCount + 1,
        title: '',
        accomplishmentDescription: '',
        type: '',
        link: '',
        description: '',
      },
    ]);
  };

  const updateAccomplishment = (accomplishmentId, key, value) => {
    const newAccomplishments = accomplishments;
    const accomplishmentIndex = newAccomplishments.findIndex(
      (accomplishment) => {
        return accomplishment.id === accomplishmentId;
      }
    );
    newAccomplishments[accomplishmentIndex][key] = value;
    setAccomplishments(newAccomplishments);
  };

  const deleteAccomplishment = (accomplishmentId) => {
    setAccomplishments(
      accomplishments.filter((accomplishment) => {
        return accomplishment.id !== accomplishmentId;
      })
    );
  };

  const renderAccomplishmentCards = () => {
    return accomplishments.map((accomplishment) => {
      return (
        <AccomplishmentsForm
          key={accomplishment.id}
          accomplishmentId={accomplishment.id}
          onUpdate={updateAccomplishment}
          onDelete={() => deleteAccomplishment(accomplishment.id)}
        />
      );
    });
  };

  const updateRole = (value) => setRole(value);
  const updateCommitmentLevel = (value) => setCommitmentLevel(value);
  const updateStartDate = (value) => setStartDate(value);
  const updateEndDate = (value) => setEndDate(value);
  const updateIsStillWorking = (value) => setIsStillWorking(value);
  const updateResponsibilities = (value) => setResponsibilities(value);

  return (
    <Stack gap={6} p={TOKENS.CONTAINER_PX}>
      <PocModalCompleted open={open} handleClose={handleClose} />
      <Box>
        <Image
          src="/favicon-512.png"
          alt="gateway-logo"
          height={40}
          width={40}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          top: '40px',
          right: '50px',
          cursor: 'pointer',
        }}
      >
        <NavBarAvatar />
      </Box>
      <Typography variant="h5" sx={{ marginBottom: '100px' }}>
        Earn Proof of Credential
      </Typography>
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={6}
      >
        {/* Credential details */}
        <Grid container>
          <Grid item xs={5}>
            <Typography variant="h6" fontWeight="bold">
              Details
            </Typography>
            <Typography variant="caption">
              Basic Details of Credential
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row">
              {/* TODO: Responsiveness */}
              <Image
                loader={() => credentialImgUrl}
                src={credentialImgUrl}
                height={300}
                width={400}
                alt="credential image"
                style={{ borderRadius: '5px' }}
              />
              <Box
                sx={{
                  position: 'relative',
                  minHeight: '300px',
                  maxWidth: '500px',
                  marginLeft: '32px',
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                  {credential.name}
                </Typography>
                <Chip label="Contributor" sx={{ marginBottom: '20px' }} />
                <Box>
                  <Typography variant="caption">
                    {credential.description}
                  </Typography>
                </Box>
                <Box sx={{ position: 'absolute', bottom: '0' }}>
                  <Typography variant="caption">Created by</Typography>
                  <Chip
                    avatar={<Avatar alt="chip avatar" src={randomNftUrl} />}
                    label="Harisson Santos"
                    sx={{ marginLeft: '10px' }}
                  />
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <Divider light sx={{ width: '100%' }} />
        {/* Credential details form */}
        <FormProvider {...credentialDetailsMethods}>
          <Grid container>
            <Grid item xs={5}>
              <Typography variant="h6" fontWeight="bold">
                Your Details
              </Typography>
              <Typography variant="caption">
                Customize Your Credential
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <CredentialDetailsForm
                isStillWorking={isStillWorking}
                onRoleUpdate={updateRole}
                onCommitmentLevelUpdate={updateCommitmentLevel}
                onStartDateUpdate={updateStartDate}
                onEndDateUpdate={updateEndDate}
                onIsStillWorkingUpdate={updateIsStillWorking}
                onResponsibilitiesUpdate={updateResponsibilities}
              />
            </Grid>
          </Grid>
        </FormProvider>
        <Divider light sx={{ width: '100%' }} />
        {/* Proudest Accomplishments form */}
        <FormProvider {...accomplishmentsMethods}>
          <Grid container>
            <Grid item xs={5}>
              <Typography variant="h6" fontWeight="bold">
                Proudest Accomplishments
              </Typography>
              <Typography variant="caption">
                Tell the world about your greatest accomplishments and get it
                verified!
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {renderAccomplishmentCards()}
            </Grid>
          </Grid>
        </FormProvider>
        <Grid container>
          <Grid item xs={5}></Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              border: '1px solid grey',
              padding: '25px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => addAccomplishment()}
          >
            <AddBoxIcon sx={{ marginRight: '15px' }} />
            <Typography variant="h6" fontWeight="bold">
              Add an Accomplishment
            </Typography>
          </Grid>
        </Grid>
      </Stack>
      <Box alignSelf="flex-end" marginRight="100px">
        <Button
          variant="outlined"
          onClick={() => {
            router.back();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ marginLeft: '10px' }}
          onClick={() => complete(credential.id)}
        >
          Submit
        </Button>
      </Box>
      <Box alignSelf="flex-end" marginRight="100px">
        <ArrowCircleUpIcon
          fontSize="large"
          onClick={() => window.scrollTo(0, 0)}
          style={{ cursor: 'pointer' }}
        />
      </Box>
    </Stack>
  );
}
