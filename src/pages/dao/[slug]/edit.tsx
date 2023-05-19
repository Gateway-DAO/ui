import { useRouter } from 'next/router';

import { useMutation } from '@tanstack/react-query';

import {
  NewDAOTemplate,
  NewDAOSchema,
} from '@/components/templates/dao-new';
import { ROUTES } from '@/constants/routes';
import { generateImageUrl } from '@/hooks/use-file';
import { useUploadImage } from '@/hooks/use-upload-image';
import { useAuth } from '@/providers/auth';
import { gqlAnonMethods } from '@/services/hasura/api';
import { Dao_Profile_By_SlugQuery } from '@/services/hasura/types';

export default function DaoProfilePage({
  daoProps,
}: {
  daoProps?: Dao_Profile_By_SlugQuery;
}) {
  const dao = daoProps?.daos?.[0];

  const uploadImage = useUploadImage();
  const { me, gqlAuthMethods, onUpdateMe } = useAuth();
  const router = useRouter();
  const isAdmin =
    me?.following_dao?.find((fdao) => fdao.dao_id === dao?.id)?.dao?.is_admin ??
    false;

  const editDAOMutation = useMutation(
    async (data: NewDAOSchema) => {
      const {
        background: background64,
        logo: logo64,
        socials,
        ...daoData
      } = data;

      const uploadLogo = async () => {
        const oldLogo = generateImageUrl(dao.logo?.s3_key);

        if (logo64 === oldLogo) return dao.logo.id;
        return (
          await uploadImage({
            base64: logo64,
            name: `dao-logo-${data.name}-${me.id}`,
          })
        )?.upload_image?.id;
      };

      const uploadBackground = async () => {
        const oldBackground = generateImageUrl(dao.background?.s3_key);

        if (background64 === oldBackground) return dao.background.id;
        return (
          await uploadImage({
            base64: background64,
            name: `dao-bg-${data.name}-${me.id}`,
          })
        )?.upload_image?.id;
      };

      const [logo, bg] = await Promise.all([uploadLogo(), uploadBackground()]);

      return gqlAuthMethods.edit_dao({
        id: dao.id,
        ...daoData,
        logo_id: logo,
        background_id: bg,
        socials: socials.map((social) => ({ dao_id: dao.id, ...social })),
      });
    },
    {
      onSuccess(data) {
        const edittedDao = data.update_daos_by_pk;
        const followingDaoObject = { dao_id: dao.id, dao: edittedDao };
        onUpdateMe((oldMe) => ({
          ...oldMe,
          following_dao: oldMe.following_dao?.map((followingDao) => {
            if (followingDao.dao_id === dao.id) return followingDaoObject;
            return followingDao;
          }),
        }));
        router.replace(ROUTES.DAO_PROFILE.replace('[slug]', edittedDao.slug));
      },
    }
  );

  if (!dao || !isAdmin) return null;

  return (
    <NewDAOTemplate
      dao={dao}
      onSubmit={editDAOMutation.mutateAsync}
      isLoading={editDAOMutation.isLoading}
    />
  );
}

DaoProfilePage.auth = true;

export const getServerSideProps = async ({ params }) => {
  const { slug } = params;

  const daoProps = await gqlAnonMethods.dao_profile_by_slug({
    slug,
  });

  return {
    props: {
      daoProps,
    },
  };
};
