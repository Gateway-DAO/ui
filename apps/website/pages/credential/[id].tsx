import { GetStaticPaths, InferGetStaticPropsType } from 'next';

import { CredentialTemplate } from '../../components/templates/credential';
import { DashboardTemplate } from '../../components/templates/dashboard';
import { gqlAnonMethods } from '../../services/api';

export default function CredentialPage({
  credentialProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!credentialProps) return null;
  const { credentials_by_pk: credential } = credentialProps;
  return (
    <DashboardTemplate
      containerProps={{
        sx: {
          overflow: 'hidden',
          pt: 2,
        },
      }}
    >
      <CredentialTemplate credential={credential} />
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
