import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { TOKENS } from '@gateway/theme';

import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArticleIcon from '@mui/icons-material/Article';
import IosShareIcon from '@mui/icons-material/IosShare';
import LooksOneIcon from '@mui/icons-material/LooksOne';
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

import { ROUTES } from '../../../constants/routes';

const DetailsFieldset = ({ children }) => (
  <fieldset
    style={{
      display: 'flex',
      border: 'none',
      marginBottom: '15px',
    }}
  >
    {children}
  </fieldset>
);

export function ViewCredentialTemplate({ credentialInfo }) {
  const [credential, setCredential] = useState({
    id: null,
    name: '',
    description: '',
    status: '',
  });
  const [details, setDetails] = useState({});
  const [accomplishments, setAccomplishments] = useState([]);

  useEffect(() => {
    if (credentialInfo) {
      setCredential({
        id: credentialInfo['credentials_by_pk'].id,
        name: credentialInfo['credentials_by_pk'].name,
        description: credentialInfo['credentials_by_pk'].description,
        status: credentialInfo['credentials_by_pk'].status,
      });
      setDetails(credentialInfo['credentials_by_pk'].details);
      setAccomplishments(credentialInfo['credentials_by_pk'].pow);
    }
  }, [credentialInfo]);

  const router = useRouter();

  const credentialImgUrl =
    'https://i.postimg.cc/6QJDW2r1/olympus-credential-picture.png';
  const randomNftUrl = 'https://i.ibb.co/bzzgBfT/random-nft.png';

  return (
    <Stack gap={6} p={TOKENS.CONTAINER_PX}>
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
          alignItems: 'center',
          position: 'absolute',
          top: '40px',
          right: '50px',
          cursor: 'pointer',
        }}
      >
        <IosShareIcon style={{ marginRight: '15px' }} />
        <Button variant="outlined" onClick={() => router.push(ROUTES.PROFILE)}>
          Check profile
        </Button>
      </Box>
      <Typography variant="h5" sx={{ marginBottom: '20px' }}>
        Shriram Chandra <br /> Proof of Credential
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
          <Grid item xs={5}>
            <Stack direction="row">
              {/* TODO: Responsiveness */}
              <Image
                loader={() => credentialImgUrl}
                src={credentialImgUrl}
                height={300}
                width={1200}
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
        {(credential.status === 'pending' || 'to_mint' || 'minted') && (
          <Divider light sx={{ width: '100%' }} />
        )}
        {(credential.status === 'pending' || 'to_mint' || 'minted') && (
          // Your details
          <Grid container>
            <Grid item xs={5}>
              <Typography variant="h6" fontWeight="bold">
                Your Details
              </Typography>
              <Typography variant="caption">
                Customize Your Credential
              </Typography>
            </Grid>
            <Grid item xs={5}>
              {Object.keys(details).map(
                (detailKey, index) =>
                  details[detailKey] && (
                    <DetailsFieldset key={index}>
                      <legend>{detailKey}</legend>
                      <Typography variant="h6" fontWeight="bold">
                        {details[detailKey]}
                      </Typography>
                    </DetailsFieldset>
                  )
              )}
            </Grid>
          </Grid>
        )}
        {(credential.status === 'pending' || 'to_mint' || 'minted') && (
          <Divider light sx={{ width: '100%' }} />
        )}
        {(credential.status === 'pending' || 'to_mint' || 'minted') && (
          <Grid container>
            {/* Proudest Accomplishments */}
            <Grid item xs={5}>
              <Typography variant="h6" fontWeight="bold">
                Proudest Accomplishments
              </Typography>
              <Typography variant="caption">
                Tell the world about your greatest accomplishments and get it
                verified!
              </Typography>
            </Grid>
            {accomplishments.map((accomplishment, index) => (
              <Grid item xs={5} key={index}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px',
                  }}
                >
                  <LooksOneIcon style={{ marginRight: '5px' }} />
                  {accomplishment.title}
                </Typography>
                <Typography variant="caption">
                  {accomplishment.accomplishmentDescription}
                </Typography>
                <Box sx={{ marginTop: '30px' }}>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    style={{ marginBottom: '20px' }}
                  >
                    Proof of Work
                  </Typography>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <ArticleIcon style={{ marginRight: '5px' }} />
                      {accomplishment.type}
                    </Typography>
                    <Typography variant="caption">
                      {accomplishment.description}
                    </Typography>
                    <br />
                    <Typography variant="caption">
                      {accomplishment.link}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
        {credential.status === 'to_complete' && (
          <Button
            variant="contained"
            sx={{ margin: 'auto' }}
            onClick={() => router.push(ROUTES.CREDENTIALS_EARN + credential.id)}
          >
            Complete Credential
          </Button>
        )}
      </Stack>
      <Box alignSelf="flex-end" marginRight="300px">
        {(credential.status === 'pending' || 'to_mint' || 'minted') && (
          <ArrowCircleUpIcon
            fontSize="large"
            onClick={() => window.scrollTo(0, 0)}
            style={{ cursor: 'pointer' }}
          />
        )}
      </Box>
    </Stack>
  );
}
