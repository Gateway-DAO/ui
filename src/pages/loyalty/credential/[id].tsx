import { LoyaltyProgramCredential } from '@/components/features/loyalty/loyalty-credential';
import { HeadContainer } from '@/components/molecules/head-container';
import { DashboardTemplate } from '@/components/templates/dashboard';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';
import { hasuraPublicService } from '@/services/hasura/api';
import { GateQuery, Loyalty_Program_InfoQuery } from '@/services/hasura/types';
import { useQuery } from '@tanstack/react-query';

const unaccesible = {
  redirect: {
    destination: ROUTES.EXPLORE,
    permanent: false,
  },
};

export default function LoyaltyCredentialPage({ loyalty, id, gate }) {
  const { me, hasuraUserService } = useAuth();

  const { data: loyaltyCredential } = useQuery(
    [me?.protocol?.id, 'loyalty_credential', loyalty.id],
    () => {
      return hasuraUserService.loyalty_credential({
        user_id: me?.protocol.id,
        dm_id: loyalty?.data_model_id,
      });
    },
    {
      enabled: !!me?.protocol?.id,
    }
  );

  const { data: credential } = useQuery(
    [me?.id, 'gate_credential', id],
    () => {
      return hasuraUserService.credential_by_user_id_by_gate_id_light({
        user_id: me?.id,
        gate_id: id,
      });
    },
    {
      enabled: !!me?.id,
    }
  );

  console.log(credential, loyaltyCredential);

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
          credential={credential?.credentials[0]}
          loyaltyCredential={loyaltyCredential?.protocol_credential[0]}
        />
      </DashboardTemplate>
    </>
  );
}

export const getServerSideProps = async ({ req, res, params }) => {
  const { id } = params;

  let gate: GateQuery;
  let loyaltyProgram: Loyalty_Program_InfoQuery;

  try {
    gate = await hasuraPublicService.gate({ id });

    loyaltyProgram = await hasuraPublicService.loyalty_program_info({
      id: gate?.gates_by_pk?.loyalty_id,
    });
  } catch (e) {
    console.log(e);
    return unaccesible;
  }

  if (!gate?.gates_by_pk) {
    return unaccesible;
  }

  return {
    props: {
      id,
      loyalty: loyaltyProgram.loyalty_program_by_pk,
      gate: gate?.gates_by_pk,
    },
  };
};
