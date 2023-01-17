import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';

import { DashboardTemplate } from '../../../components/templates/dashboard';
import {
  ProtocolTemplate,
  DataModelView,
} from '../../../components/templates/protocol';
import { gatewayProtocolSDK } from '../../../services/gateway-protocol/api';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ProtocolDataModel({ dataModel, error }: Props) {
  console.log(error);
  if (error) return null;
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
        <DataModelView dataModel={dataModel} />
      </ProtocolTemplate>
    </DashboardTemplate>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const dataModel = await gatewayProtocolSDK.dataModel({
      id: ctx.query.id as string,
    });

    return {
      props: {
        dataModel: dataModel?.dataModel,
      },
    };
  } catch (e) {
    return {
      props: {
        error: e,
      },
    };
  }
};
