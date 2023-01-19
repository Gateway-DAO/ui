import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';

import { DashboardTemplate } from '../../../../../../components/templates/dashboard';
import {
  ProtocolTemplate,
  DataModelShow,
} from '../../../../../../components/templates/protocol';
import { gatewayProtocolSDK } from '../../../../../../services/gateway-protocol/api';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ProtocolDataModelCredentialCreate({
  dataModel,
}: Props) {
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
        <DataModelShow dataModel={dataModel} isCredentialCreate={true} />
      </ProtocolTemplate>
    </DashboardTemplate>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const dataModel = await gatewayProtocolSDK.dataModel({
    id: ctx.query.id as string,
  });

  return {
    props: {
      dataModel: dataModel?.dataModel,
    },
  };
};
