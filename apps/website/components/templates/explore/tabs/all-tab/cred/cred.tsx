import Link from 'next/link';

import { useMutation, useQuery } from '@tanstack/react-query';

import { Button, Card, Typography } from '@mui/material';

import { ROUTES } from '../../../../../../constants/routes';
import { useAuth } from '../../../../../../providers/auth';
import { gatewayProtocolAuthSDK } from '../../../../../../services/gateway-protocol/api';

export default function Cred() {
  const { me, token } = useAuth();

  const score = useQuery(
    ['credit-score', me?.protocol.primaryWallet.address],
    async () => {
      const res = await fetch(
        `https://beta.credprotocol.com/api/score/address/${me?.protocol.primaryWallet.address}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token 677307b1a63eac35f3c364408a7da8f33d780fb7',
          },
        }
      );
      const json = await res.json();
      return json;
    },
    {
      refetchOnMount: true,
      enabled: !!me?.protocol.primaryWallet.address,
    }
  );

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

      const cred = scoreCreds.findCredentialsByDataModel.find(
        (cred) => cred.recipientUser.id === me.protocol.id
      );

      return cred;
    },
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  );

  const issueCred = useMutation(['create-cred-protocol'], async () => {
    const newScore = await score.refetch();

    return gatewayProtocolAuthSDK(token).createCredential({
      recipientUserGatewayIdOrWallet: me.protocol.primaryWallet.address,
      dataModelId: 'e79eeea6-0fb7-4d59-8254-5962d5ed493c',
      claim: {
        creditScore: newScore.data.value || 0,
        rating: newScore.data.value_rating || 'Unknown; insufficient data',
      },
      title: `Credit Score Credential for ${me.name}`,
      description: `This is a Credit Score Credential for ${me.name}`,
      tags: ['credit', 'score', 'credential'],
      image: null,
      expirationDate: undefined,
      issuerOrganizationId: null,
    });
  });

  const updateCred = useMutation(['update-cred-protocol'], async () => {
    const newScore = await score.refetch();

    if (newScore.data.error) return;
    if (newScore.data.value === credential.data.claim.creditScore) return;

    return gatewayProtocolAuthSDK(token).updateCredential({
      id: credential.data.id,
      title: credential.data.title,
      description: credential.data.description,
      image: credential.data.image,
      claim: {
        creditScore: newScore.data.value || 0,
        rating: newScore.data.value_rating || 'Unknown; insufficient data',
      },
    });
  });

  return (
    <Card sx={{ my: 4, mx: 5, p: 5 }}>
      <Typography variant="h4">Want a Credit Score Credential?</Typography>

      {credential.data ? (
        <>
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
          <Typography>
            Your current score is {credential.data.claim.creditScore} (
            {credential.data.claim.rating})
          </Typography>
        </>
      ) : (
        <Typography variant="body1">
          You do not have a Credit Score Credential yet!
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
