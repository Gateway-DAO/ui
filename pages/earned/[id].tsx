import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';

import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { HeadContainer } from '@/components/molecules/head-container';
import { useToggle } from 'react-use';

import { MintModal } from '../../components/organisms/mint-modal';
import { Navbar } from '../../components/organisms/navbar';
import { CredentialTemplate } from '../../components/templates/credential';
import { DashboardTemplate } from '../../components/templates/dashboard';
import { useAuth } from '../../providers/auth';
import { gqlAnonMethods } from '@/services/hasura/api';

export default function CredentialPage() {
  const { gqlAuthMethods } = useAuth();

  const router = useRouter();
  const id = router.query.id as string;

  const [isOpen, open] = useToggle(false);

  const { data } = useQuery(['credential', id], () =>
    gqlAuthMethods.credential({
      id,
    })
  );

  if (!data) return null;

  return (
    <>
      <HeadContainer ogImage="default" />
      <DashboardTemplate
        containerProps={{
          sx: {
            overflow: 'hidden',
            pt: 2,
          },
        }}
      >
        <Navbar isInternalPage={true} />
        <CredentialTemplate
          credential={data.credentials_by_pk}
          openModal={open}
        />
        <MintModal
          isOpen={isOpen}
          onClose={open}
          onSuccess={() => console.log('Yey')}
        />
      </DashboardTemplate>
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  const { id } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['credential', id], () =>
    gqlAnonMethods.credential({
      id,
    })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
