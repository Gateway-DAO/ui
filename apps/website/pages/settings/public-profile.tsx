import { useAuth } from '../../providers/auth';

import { useMutation } from '@tanstack/react-query';

import { EditUserSchema } from '../../components/templates/settings/profile/schema';
import { generateImageUrl } from '../../hooks/use-file';
import { DashboardTemplate } from '../../components/templates/dashboard';
import { SettingsTemplate } from '../../components/templates/settings';
import { EditProfileSettings } from '../../components/templates/settings';
import { useUploadImage } from '../../hooks/use-upload-image';
import { useRouter } from 'next/router';
import { ROUTES } from '../../constants/routes';

export default function PublicProfileSettingsPage() {
  const uploadImage = useUploadImage();
  const { me, gqlAuthMethods, onInvalidateMe } = useAuth();
  const router = useRouter();

  const editUserMutation = useMutation(
    async (data: EditUserSchema) => {
      const { cover: cover64, picture: picture64, socials, ...userData } = data;

      const uploadPicture = async () => {
        if (me.picture?.id) {
          const oldLogo = generateImageUrl(me.picture.id);

          if (picture64 === oldLogo) return me.picture.id;
        }

        return (
          await uploadImage({
            base64: picture64,
            name: `user-pfp-${data.name}-${me.id}`,
          })
        )?.upload_image?.id;
      };

      const uploadCover = async () => {
        if (me.cover?.id) {
          const oldBackground = generateImageUrl(me.cover.id);
          if (cover64 === oldBackground) return me.cover.id;
        }

        return (
          await uploadImage({
            base64: cover64,
            name: `user-cover-${data.name}-${me.id}`,
          })
        )?.upload_image?.id;
      };

      const [picture, cover] = await Promise.all([
        picture64 ? uploadPicture() : null,
        cover64 ? uploadCover() : null,
      ]);

      return gqlAuthMethods.edit_user({
        name: userData.name || me.name,
        bio: userData.bio || me.bio,
        username: userData.username || me.username,
        skills: userData.skills || me.skills,
        languages: userData.languages || me.languages,
        timezone: userData.timezone || me.timezone,
        pic_id: picture,
        cover_id: cover,
        socials: socials as any,
        id: me.id,
      });
    },
    {
      onSuccess(data) {
        onInvalidateMe();
        router.push(ROUTES.SETTINGS_PUBLIC_PROFILE);
      },
    }
  );

  return me?.id ? (
    <DashboardTemplate
      containerProps={{
        sx: {
          overflow: '',
        },
        height: '100%',
      }}
    >
      <SettingsTemplate children={<EditProfileSettings onSubmit={editUserMutation.mutateAsync} isLoading={editUserMutation.isLoading} />} />
    </DashboardTemplate>
  ) : null;
}

PublicProfileSettingsPage.auth = true;
