import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useQuery } from 'react-query';
import { useToggle } from 'react-use';

import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import CredentialCard from '../../../../components/molecules/credential-card';
import { WalletModal } from '../../../../components/templates/landing/wallet-modal/wallet-modal';
import { gqlAnonMethods } from '../../../../services/api';

export default function Claim() {
  const [isOpen, toggleOpen] = useToggle(false);
  const [credential, setCredential] = useState({
    name: '',
    description: '',
  });

  const router = useRouter();
  const { credentialId } = router.query;

  useQuery(
    ['get-credential-group'],
    () => {
      return gqlAnonMethods.get_credential_group_info({ credentialId });
    },
    {
      onSuccess: (data) =>
        setCredential({
          name: data.credential_group_by_pk.name,
          description: data.credential_group_by_pk.description,
        }),
    }
  );

  return (
    <div>
      <Box>
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
            justifyContent: 'space-evenly',
            alignItems: 'center',
            minHeight: '830px',
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
              Claim your credential now
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, textAlign: 'center' }}
              fontSize={16}
            >
              You&apos;re selected to claim your{' '}
              <span style={{ color: '#D083FF' }}>{credential.name}</span>{' '}
              credential.
            </Typography>
          </Box>
          <CredentialCard
            name={credential.name}
            description={credential.description}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button variant="contained" onClick={toggleOpen}>
              Claim credential
            </Button>
          </Box>
        </Box>
      </Box>
      <WalletModal isOpen={isOpen} onClose={toggleOpen} />
    </div>
  );
}
