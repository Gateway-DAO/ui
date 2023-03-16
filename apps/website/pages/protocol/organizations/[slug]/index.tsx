import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import { DashboardTemplate } from '../../../../components/templates/dashboard';
import { OrganizationProfileProvider } from '../../../../components/templates/protocol/organizations/show/context';
import { OrganizationProfileTemplate } from '../../../../components/templates/protocol/organizations/show/organization-profile-show';
import { gatewayProtocolSDK } from '../../../../services/gateway-protocol/api';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function OrganizationPage({ organization, credentials }: Props) {
  return (
    <DashboardTemplate
      containerProps={{
        sx: {
          overflow: 'hidden',
        },
      }}
    >
      <OrganizationProfileProvider
        organization={organization}
        credentials={credentials}
      >
        <OrganizationProfileTemplate />
      </OrganizationProfileProvider>
    </DashboardTemplate>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { organizationByGatewayId: organization } =
    await gatewayProtocolSDK.organizationByGatewayId({
      gatewayId: ctx.query.slug as string,
    });

  const credentials =
    await gatewayProtocolSDK.findCredentialsByIssuerOrganization({
      issuerOrganizationId: organization.id,
      skip: 0,
      take: 10,
    });

  return {
    props: {
      organization: organization,
      credentials: credentials.findCredentialsByIssuerOrganization,
    },
  };
};
