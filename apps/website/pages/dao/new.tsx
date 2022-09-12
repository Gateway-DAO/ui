import { useRouter } from 'next/router';

import { useMutation } from '@tanstack/react-query';

import {
  NewDAOTemplate,
  NewDAOSchema,
} from '../../components/templates/dao-new';
import { ROUTES } from '../../constants/routes';
import { useUploadImage } from '../../hooks/use-upload-image';
import { useAuth } from '../../providers/auth';

export default function CreateDAO() {
  const uploadImage = useUploadImage();
  const { me, gqlAuthMethods, onUpdateMe } = useAuth();
  const router = useRouter();

  const createDAOMutation = useMutation(
    async (data: NewDAOSchema) => {
      const {
        background: background64,
        logo: logo64,
        socials,
        ...daoData
      } = data;

      const [logo, bg] = await Promise.all([
        uploadImage({
          base64: logo64,
          name: `dao-logo-${data.name}-${me.id}`,
        }),
        uploadImage({
          base64: background64,
          name: `dao-bg-${data.name}-${me.id}`,
        }),
      ]);

      return gqlAuthMethods.create_dao({
        ...daoData,
        logo_id: logo.upload_image.id,
        background_id: bg.upload_image.id,
        socials: socials as any,
      });
    },
    {
      onSuccess(data) {
        const dao = data.insert_daos_one;
        const followingDaoObject = { dao_id: dao.id, dao };
        onUpdateMe((oldMe) => ({
          ...oldMe,
          following_dao: oldMe.following_dao
            ? [...oldMe.following_dao, followingDaoObject]
            : [followingDaoObject],
        }));
        router.replace(
          ROUTES.DAO_PROFILE.replace('[slug]', data.insert_daos_one.slug)
        );
      },
    }
  );
  return (
    <NewDAOTemplate
      onSubmit={createDAOMutation.mutateAsync}
      isLoading={createDAOMutation.isLoading}
    />
  );
}

CreateDAO.auth = true;
