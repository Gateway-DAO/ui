import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';

import { DashboardTemplate } from '../../../../components/templates/dashboard';
import {
  ProtocolTemplate,
  DataModelShow,
} from '../../../../components/templates/protocol';
import { gatewayProtocolSDK } from '../../../../services/gateway-protocol/api';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ProtocolDataModel({ dataModel, stats }: Props) {
  return (
    <DashboardTemplate
      containerProps={{
        sx: {
          overflow: '',
        },
        height: '100%',
      }}
    >
      <ProtocolTemplate>
        <DataModelShow dataModel={dataModel} stats={stats} />
      </ProtocolTemplate>
    </DashboardTemplate>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const dataModel = await gatewayProtocolSDK.dataModel({
    id: ctx.query.id as string,
  });

  const issuers = await gatewayProtocolSDK.getTotalofIssuersByDataModel({
    dataModelId: ctx.query.id as string,
  });

  const totalCredentials =
    await gatewayProtocolSDK.getTotalCredentialsByDataModel({
      dataModelId: ctx.query.id as string,
    });

  const totalCredentialsByIssuer =
    await gatewayProtocolSDK.getTotalCredentialsByDataModelGroupByIssuer({
      dataModelId: ctx.query.id as string,
    });

  return {
    props: {
      dataModel: dataModel?.dataModel,
      stats: {
        issuers: issuers.getTotalofIssuersByDataModel,
        totalCredentials: totalCredentials.getTotalCredentialsByDataModel,
        totalCredentialsByIssuer:
          totalCredentialsByIssuer.getTotalCredentialsByDataModelGroupByIssuer,
      },
    },
  };
};
