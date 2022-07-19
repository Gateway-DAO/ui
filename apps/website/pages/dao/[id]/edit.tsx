import { useRouter } from 'next/router';

import { useMutation } from 'react-query';

import {
  NewDAOTemplate,
  NewDAOSchema,
} from '../../../components/templates/dao-new';
import { ROUTES } from '../../../constants/routes';
import { generateImageUrl } from '../../../hooks/use-file';
import { useUploadImage } from '../../../hooks/use-upload-image';
import { useAuth } from '../../../providers/auth';
import { gqlAnonMethods } from '../../../services/api';
import { Dao_ProfileQuery } from '../../../services/graphql/types.generated';

export default function DaoProfilePage({
  daoProps,
}: {
  daoProps?: Dao_ProfileQuery;
}) {
  const { daos_by_pk: dao } = daoProps ?? {};

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
        const oldLogo = generateImageUrl(dao.logo.id);

        if (logo64 === oldLogo) return dao.logo.id;
        return (
          await uploadImage({
            base64: logo64,
            name: `dao-logo-${data.name}-${me.id}`,
          })
        )?.upload_image?.id;
      };

      const uploadBackground = async () => {
        const oldBackground = generateImageUrl(dao.background.id);

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
        socials: socials as any,
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
        router.replace(ROUTES.DAO_PROFILE.replace('[id]', edittedDao.id));
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

export const getServerSideProps = async ({ params }) => {
  const { id } = params;

  const daoProps = await gqlAnonMethods.dao_profile({
    id,
  });

  return {
    props: {
      daoProps,
    },
  };
};
