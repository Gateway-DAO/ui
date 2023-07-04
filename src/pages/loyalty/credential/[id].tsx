import { LoyaltyProgramCredential } from '@/components/features/loyalty/loyalty-credential';
import { HeadContainer } from '@/components/molecules/head-container';
import { DashboardTemplate } from '@/components/templates/dashboard';
import { ROUTES } from '@/constants/routes';
import { hasuraPublicService, hasuraApi } from '@/services/hasura/api';
import { getServerSession } from '@/services/next-auth';
import jwt from 'jsonwebtoken';

const unaccesible = {
  redirect: {
    destination: ROUTES.EXPLORE,
    permanent: false,
  },
};

export default function LoyaltyCredentialPage({
  loyalty,
  loyaltyProgress,
  credential,
  gate,
}) {
  return (
    <>
      <HeadContainer
        title={`${gate?.title} Credential`}
        description={gate?.description}
      />
      <DashboardTemplate
        containerProps={{
          sx: {
            overflow: 'hidden',
          },
        }}
      >
        <LoyaltyProgramCredential
          loyalty={loyalty}
          gate={gate}
          credential={credential}
          loyaltyProgress={loyaltyProgress}
        />
      </DashboardTemplate>
    </>
  );
}

export const getServerSideProps = async ({ req, res, params }) => {
  const { id } = params;

  const session = await getServerSession(req, res);

  let expired = false;

  const parsedToken = jwt.decode(session?.token, { json: true });
  expired = !!session && parsedToken.exp < Date.now() / 1000;

  let gate;
  let loyaltyProgress;
  let credential;

  try {
    if (!!session && !expired) {
      gate = await hasuraApi(session?.token).gate({ id });

      loyaltyProgress = await hasuraApi(
        session?.token
      ).get_loyalty_progress_by_user_id_by_loyalty({
        user_id: session?.hasura_id,
        loyalty_id: gate?.gates_by_pk?.loyalty_id,
      });

      credential = await hasuraApi(
        session?.token
      ).credential_by_user_id_by_gate_id({
        user_id: session?.hasura_id,
        gate_id: id,
      });
    }
    if (!gate) {
      gate = await hasuraPublicService.gate({ id });
    }
  } catch (e) {
    return unaccesible;
  }

  if (!gate?.gates_by_pk) {
    return unaccesible;
  }

  const { loyalty_program_by_pk } = await hasuraPublicService.loyalty_program({
    id: gate.gates_by_pk?.loyalty_id,
  });

  return {
    props: {
      loyalty: loyalty_program_by_pk,
      gate: gate?.gates_by_pk,
      loyaltyProgress:
        loyaltyProgress?.loyalty_progress?.find((lp) => lp) ?? null,
      credential: credential?.credentials?.find((c) => c) ?? null,
    },
  };
};
