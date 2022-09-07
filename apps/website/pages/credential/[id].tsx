import { GetStaticPaths, InferGetStaticPropsType } from 'next';

import { useQuery } from 'react-query';
import { useToggle } from 'react-use';

import { MintModal } from '../../components/organisms/mint-modal';
import { Navbar } from '../../components/organisms/navbar';
import { CredentialTemplate } from '../../components/templates/credential';
import { DashboardTemplate } from '../../components/templates/dashboard';
import { gqlAnonMethods } from '../../services/api';

export default function CredentialPage({
  credentialProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [isOpen, open] = useToggle(false);

  const { credentials_by_pk: credential } = credentialProps;

  const { data } = useQuery(
    ['credential', credential.id],
    () =>
      gqlAnonMethods.credential({
        id: credential.id,
      }),
    {
      initialData: credentialProps,
    }
  );

  if (!data) return null;

  return (
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
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const { credentials } = await gqlAnonMethods.all_credentials();

  return {
    paths: credentials.map((credential) => ({ params: { id: credential.id } })),
    fallback: 'blocking', //TODO: add loading state and change to fallback: true
  };
};

export const getStaticProps = async ({ params }) => {
  const { id } = params;

  const credentialProps = await gqlAnonMethods.credential({
    id,
  });

  return {
    props: {
      credentialProps,
    },
    revalidate: 60,
  };
};
