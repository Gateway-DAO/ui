import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { useQuery } from 'react-query';

import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import { gqlMethods } from '../../../services/api';
import CredentialCard from '../../molecules/credential-card';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  minWidth: '100%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 4,
};

export default function PocModalCompleted({ credentialId, open, handleClose }) {
  const session = useSession();
  const router = useRouter();

  const [credential, setCredential] = useState({
    name: '',
    description: '',
  });

  const { refetch: getCredential } = useQuery(
    ['get-credential'],
    () => {
      if (!session.data.user) return;
      return gqlMethods(session.data.user).get_credential({
        credential_id: credentialId,
      });
    },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (open) {
      getCredential().then((result) =>
        setCredential({
          name: result.data.credentials_by_pk.name,
          description: result.data.credentials_by_pk.description,
        })
      );
    }
  }, [open, credentialId, getCredential]);

  return (
    <div>
      {/* TODO: Add dialog before making the modal appear */}
      {/* TODO: Modal doesn't scroll when window is not full screen */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Image
            src="/favicon-512.png"
            alt="gateway-logo"
            height={40}
            width={40}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                fontSize={48}
                textAlign="center"
              >
                Submission completed with success
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, textAlign: 'center', marginBottom: '15px' }}
                fontSize={16}
              >
                Your Proof of Credential submission{' '}
                <span style={{ color: '#D083FF' }}>{credential.name}</span> has
                submited with success, once confirmed you can mint it as NFT.
              </Typography>
            </Box>
            <CredentialCard
              name={credential.name}
              description={credential.description}
            />
            <Button
              variant="contained"
              size="small"
              sx={{ margin: '20px 0 0 20px' }}
              onClick={() => router.push('/profile')}
            >
              Check credential
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
