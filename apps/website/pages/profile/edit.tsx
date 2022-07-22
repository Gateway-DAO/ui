import { useRouter } from 'next/router';

import { useMutation } from 'react-query';

import { EditProfileTemplate } from '../../components/templates/profile/edit';
import { EditUserSchema } from '../../components/templates/profile/edit/schema';
import { ROUTES } from '../../constants/routes';
import { generateImageUrl } from '../../hooks/use-file';
import { useUploadImage } from '../../hooks/use-upload-image';
import { useAuth } from '../../providers/auth';

export default function EditProfilePage() {
  const uploadImage = useUploadImage();
  const { me, gqlAuthMethods, onUpdateMe } = useAuth();
  const router = useRouter();

  const editUserMutation = useMutation(
    async (data: EditUserSchema) => {
      const { cover: cover64, picture: picture64, socials, ...userData } = data;

      const uploadPicture = async () => {
        const oldLogo = generateImageUrl(me.picture.id);

        if (picture64 === oldLogo) return me.picture.id;
        return (
          await uploadImage({
            base64: picture64,
            name: `user-pfp-${data.name}-${me.id}`,
          })
        )?.upload_image?.id;
      };

      const uploadCover = async () => {
        const oldBackground = generateImageUrl(me.cover.id);

        if (cover64 === oldBackground) return me.cover.id;
        return (
          await uploadImage({
            base64: cover64,
            name: `user-cover-${data.name}-${me.id}`,
          })
        )?.upload_image?.id;
      };

      const [picture, cover] = await Promise.all([
        uploadPicture(),
        uploadCover(),
      ]);

      return gqlAuthMethods.edit_user({
        ...userData,
        pic_id: picture,
        cover_id: cover,
        socials: socials as any,
        id: me.id,
      });
    },
    {
      onSuccess(data) {
        const newUser = data.update_users_by_pk;
        onUpdateMe((oldMe) => ({
          ...oldMe,
          ...newUser,
        }));
        router.push(ROUTES.MY_PROFILE);
      },
    }
  );

  return (
    <EditProfileTemplate
      onSubmit={editUserMutation.mutateAsync}
      isLoading={editUserMutation.isLoading}
    />
  );
}

EditProfilePage.auth = true;
