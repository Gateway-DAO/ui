import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

import { NewDAO, NewDAOSchema } from '@/components/features/daos/create';
import { ROUTES } from '@/constants/routes';
import { generateImageUrl } from '@/hooks/use-file';
import { useUploadImage } from '@/hooks/use-upload-image';
import { useAuth } from '@/providers/auth';
import { hasuraApi } from '@/services/hasura/api';
import { Daos } from '@/services/hasura/types';
import { getServerSession } from '@/services/next-auth';
import { useMutation } from '@tanstack/react-query';

export default function DaoProfilePage({ org }: { org?: Daos }) {
  const uploadImage = useUploadImage();
  const { me, hasuraUserService, onUpdateMe } = useAuth();
  const router = useRouter();
  const isAdmin =
    me?.following_dao?.find((fdao) => fdao.dao_id === org?.id)?.dao?.is_admin ??
    false;

  const editOrgMutation = useMutation(
    async (data: NewDAOSchema) => {
      const {
        background: background64,
        logo: logo64,
        socials,
        ...daoData
      } = data;

      const uploadLogo = async () => {
        const oldLogo = generateImageUrl(org.logo?.s3_key);

        if (logo64 === oldLogo) return org.logo.id;
        return (
          await uploadImage({
            base64: logo64,
            name: `org-logo-${data.name}-${me.id}`,
          })
        )?.upload_image?.id;
      };

      const uploadBackground = async () => {
        const oldBackground = generateImageUrl(org.background?.s3_key);

        if (background64 === oldBackground) return org.background.id;
        return (
          await uploadImage({
            base64: background64,
            name: `org-bg-${data.name}-${me.id}`,
          })
        )?.upload_image?.id;
      };

      const [logo, bg] = await Promise.all([uploadLogo(), uploadBackground()]);

      return hasuraUserService.edit_dao({
        id: org.id,
        ...daoData,
        logo_id: logo,
        background_id: bg,
        socials: socials.map((social) => ({ dao_id: org.id, ...social })),
      });
    },
    {
      onSuccess(data) {
        const editedOrg = data.update_daos_by_pk;
        const followingDaoObject = { dao_id: org.id, dao: editedOrg };
        onUpdateMe((oldMe) => ({
          ...oldMe,
          following_dao: oldMe.following_dao?.map((followingDao) => {
            if (followingDao.dao_id === org.id) return followingDaoObject;
            return followingDao;
          }),
        }));
        router.replace(ROUTES.DAO_PROFILE.replace('[slug]', editedOrg.slug));
      },
    }
  );

  if (!org || !isAdmin) return null;

  return (
    <NewDAO
      dao={org}
      onSubmit={editOrgMutation.mutateAsync}
      isLoading={editOrgMutation.isLoading}
    />
  );
}

DaoProfilePage.auth = true;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const slug = ctx.query.slug as string;

  const session = await getServerSession(ctx.req, ctx.res);

  const { daos } = await hasuraApi(session?.token).dao_profile_by_slug({
    slug,
  });

  const currentOrg = daos[0];

  if (!currentOrg) {
    return {
      redirect: {
        destination: '/explore',
        permanent: false,
      },
    };
  }

  return {
    props: {
      org: currentOrg,
    },
  };
};
