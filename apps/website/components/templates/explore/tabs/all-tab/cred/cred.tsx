import Link from 'next/link';

import { useMutation, useQuery } from '@tanstack/react-query';

import { Button, Card, Typography } from '@mui/material';

import { ROUTES } from '../../../../../../constants/routes';
import { useAuth } from '../../../../../../providers/auth';
import { gatewayProtocolAuthSDK } from '../../../../../../services/gateway-protocol/api';

export default function Cred() {
  const { me, token } = useAuth();
  const credential = useQuery(
    ['cred-protocol', me?.id],
    async () => {
      const scoreCreds = await gatewayProtocolAuthSDK(
        token
      ).findCredentialsByDataModel({
        dataModelId: 'e79eeea6-0fb7-4d59-8254-5962d5ed493c',
        take: 50,
        skip: 0,
      });

      console.log(scoreCreds);

      const cred = scoreCreds.findCredentialsByDataModel.find(
        (cred) => cred.recipientUser.id === me.protocol.id
      );

      console.log(cred);

      return cred;
    },
    {
      refetchOnMount: true,
    }
  );

  const issueCred = useMutation(['create-cred-protocol'], () => {
    return gatewayProtocolAuthSDK(token).createCredential({
      recipientUserGatewayIdOrWallet: me.protocol.primaryWallet.address,
      dataModelId: 'e79eeea6-0fb7-4d59-8254-5962d5ed493c',
      claim: {
        creditScore: 800,
        rating: 'Very Good',
      },
      title: `Credit Score Credential for ${me.name}`,
      description: `This is a Credit Score Credential for ${me.name}`,
      tags: ['credit', 'score', 'credential'],
      image: null,
      expirationDate: undefined,
      issuerOrganizationId: null,
    });
  });

  const updateCred = useMutation(['update-cred-protocol'], () => {
    return gatewayProtocolAuthSDK(token).updateCredential({
      id: credential.data.id,
      title: credential.data.title,
      description: credential.data.description,
      image: credential.data.image,
      claim: {
        creditScore: 600,
        rating: 'Very Bad',
      },
    });
  });

  return (
    <Card sx={{ my: 4, mx: 5, p: 5 }}>
      <Typography variant="h4">Want a Credit Score Credential?</Typography>

      {credential.data ? (
        <Typography variant="body1">
          You already have a Credit Score Credential! Check it{' '}
          <Link
            href={ROUTES.PROTOCOL_CREDENTIAL.replace(
              '[id]',
              credential.data.id
            )}
            passHref
          >
            <a>here!</a>
          </Link>
        </Typography>
      ) : (
        <Typography variant="body1">
          You don't have a Credit Score Credential yet!
        </Typography>
      )}

      <Button
        onClick={
          credential.data ? () => updateCred.mutate() : () => issueCred.mutate()
        }
        variant="outlined"
        disabled={updateCred.isLoading || issueCred.isLoading}
        sx={{
          mt: 2,
        }}
      >
        {updateCred.isLoading || issueCred.isLoading
          ? 'Loading...'
          : credential.data
          ? 'Update'
          : 'Issue'}
      </Button>
    </Card>
  );
}
