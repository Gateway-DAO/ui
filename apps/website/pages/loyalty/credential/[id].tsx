import { useRouter } from 'next/router';

import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import jwt from 'jsonwebtoken';

import { HeadContainer } from '../../../components/molecules/head-container';
import { DashboardTemplate } from '../../../components/templates/dashboard';
import { LoyaltyProgramCredential } from '../../../components/templates/loyalty-program/LoyaltyProgramCredential';
import { query } from '../../../constants/queries';
import { ROUTES } from '../../../constants/routes';
import { useAuth } from '../../../providers/auth';
import { gatewayProtocolAuthSDK } from '../../../services/gateway-protocol/api';
import { gqlAnonMethods, gqlMethods } from '../../../services/hasura/api';
import { getServerSession } from '../../../services/next-auth';

const unaccesible = {
  redirect: {
    destination: ROUTES.EXPLORE,
    permanent: false,
  },
};

export default function LoyaltyCredentialPage({ loyalty }) {
  const router = useRouter();
  const { me, token } = useAuth();

  const id = router.query.id as string;

  const { gqlAuthMethods, authenticated } = useAuth();

  const { data: gatesData } = useQuery(
    [query.gate, id],
    () =>
      gqlAuthMethods.gate({
        id,
      }),
    { enabled: authenticated }
  );

  const { data: earnedCredentials } = useQuery(
    [
      query.earned_credentials_by_gateway_id_by_data_model_id,
      {
        gatewayId: me?.username,
        dataModelId: gatesData?.gates_by_pk?.data_model_id,
      },
    ],
    () =>
      gatewayProtocolAuthSDK(token).earnedCredentialsByGatewayIdByDataModel({
        gatewayId: me?.username,
        dataModelId: gatesData?.gates_by_pk?.data_model_id,
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
        title={`${gatesData.gates_by_pk?.title} Credential`}
        description={gatesData.gates_by_pk?.description}
      />
      <DashboardTemplate
        containerProps={{
          sx: {
            overflow: 'hidden',
          },
        }}
      >
        <LoyaltyProgramCredential
          gate={gatesData.gates_by_pk}
          loyalty={loyalty}
          credentialProtocolId={earnedCredentials?.[0]?.id}
        />
      </DashboardTemplate>
    </>
  );
}

export const getServerSideProps = async ({ req, res, params }) => {
  const { id } = params;
  const queryClient = new QueryClient();

  const session = await getServerSession(req, res);

  let expired = false;

  const parsedToken = jwt.decode(session?.token, { json: true });
  expired = !!session && parsedToken.exp < Date.now() / 1000;

  let gate;

  try {
    gate = await (!!session && !expired
      ? gqlMethods(session.token, session.hasura_id)
      : gqlAnonMethods
    ).gate({ id });
  } catch (e) {
    gate = await gqlAnonMethods.gate({ id });
  }

  if (!gate.gates_by_pk) {
    return unaccesible;
  }

  await queryClient.prefetchQuery([query.gate, id], () => gate);

  const { loyalty_program_by_pk } = await gqlAnonMethods.loyalty_program({
    id: gate.gates_by_pk?.loyalty_id,
  });

  return {
    props: {
      loyalty: loyalty_program_by_pk,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
