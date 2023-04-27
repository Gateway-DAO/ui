import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import { useQuery } from '@tanstack/react-query';

import { HeadContainer } from '../../components/molecules/head-container';
import { DashboardTemplate } from '../../components/templates/dashboard';
import { LoyaltyProgram } from '../../components/templates/loyalty-program/LoyaltyProgram';
import { query } from '../../constants/queries';
import { useAuth } from '../../providers/auth';
import { gatewayProtocolAuthSDK } from '../../services/gateway-protocol/api';
import { gqlAnonMethods } from '../../services/hasura/api';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function LoyaltyPage({ loyalty }: Props) {
  const { me, token } = useAuth();

  const { data: earnedCredentials } = useQuery(
    [
      query.earned_credentials_by_gateway_id_by_data_model_id,
      {
        gatewayId: me?.username,
        dataModelId: loyalty.data_model_id,
      },
    ],
    () =>
      gatewayProtocolAuthSDK(token).earnedCredentialsByGatewayIdByDataModel({
        gatewayId: me.username,
        dataModelId: loyalty.data_model_id,
      }),
    {
      enabled: !!me?.id,
      select: ({ earnedCredentialsByGatewayIdByDataModel }) =>
        earnedCredentialsByGatewayIdByDataModel,
    }
  );

  return (
    <>
      <HeadContainer
        title={`${loyalty.name} Loyalty`}
        description={loyalty.description}
      />
      <DashboardTemplate
        containerProps={{
          sx: {
            overflow: 'hidden',
          },
        }}
      >
        <LoyaltyProgram
          loyalty={loyalty}
          credentialProtocol={earnedCredentials?.[0]}
        />
      </DashboardTemplate>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const id = ctx.query.id as string;
  const { loyalty_program_by_pk } = await gqlAnonMethods.loyalty_program({
    id,
  });

  return {
    props: {
      loyalty: loyalty_program_by_pk,
    },
  };
};
