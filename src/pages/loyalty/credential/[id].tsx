import { LoyaltyProgramCredential } from '@/components/features/loyalty/loyalty-credential';
import { HeadContainer } from '@/components/molecules/head-container';
import { DashboardTemplate } from '@/components/templates/dashboard';
import { ROUTES } from '@/constants/routes';
import { hasuraPublicService, hasuraApi } from '@/services/hasura/api';
import {
  Credential_By_User_Id_By_Gate_IdQuery,
  GateQuery,
  Loyalty_CredentialQuery,
  Loyalty_ProgramQuery,
} from '@/services/hasura/types';
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
  loyaltyCredential,
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
          loyaltyCredential={loyaltyCredential}
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

  let gate: GateQuery;
  let loyaltyProgram: Loyalty_ProgramQuery;
  let loyaltyCredential: Loyalty_CredentialQuery;
  let credential: Credential_By_User_Id_By_Gate_IdQuery;

  try {
    gate = await hasuraPublicService.gate({ id });

    loyaltyProgram = await hasuraPublicService.loyalty_program({
      id: gate?.gates_by_pk?.loyalty_id,
    });

    if (!!session && !expired) {
      loyaltyCredential = await hasuraApi(session?.token).loyalty_credential({
        user_id: session?.protocol_id,
        dm_id: loyaltyProgram?.loyalty_program_by_pk?.data_model_id,
      });

      credential = await hasuraApi(
        session?.token
      ).credential_by_user_id_by_gate_id({
        user_id: session?.hasura_id,
        gate_id: id,
      });
    }
  } catch (e) {
    console.log(e);
    return unaccesible;
  }

  if (!gate?.gates_by_pk) {
    return unaccesible;
  }

  if (!loyaltyProgram) {
    loyaltyProgram = await hasuraPublicService.loyalty_program({
      id: gate.gates_by_pk?.loyalty_id,
    });
  }

  console.log(loyaltyProgram);

  return {
    props: {
      loyalty: loyaltyProgram.loyalty_program_by_pk,
      gate: gate?.gates_by_pk,
      loyaltyCredential:
        loyaltyCredential?.protocol_credential?.find((lc) => lc) ?? null,
      credential: credential?.credentials?.find((c) => c) ?? null,
    },
  };
};
