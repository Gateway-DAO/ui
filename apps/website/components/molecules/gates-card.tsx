import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { PartialDeep } from 'type-fest';

import { CardActionArea, CardHeader, Box, Snackbar } from '@mui/material';
import MUICard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { useSnackbar } from '../../../website/hooks/use-snackbar';
import { useAuth } from '../../../website/providers/auth';
import { ROUTES } from '../../constants/routes';
import { Gates } from '../../services/graphql/types.generated';
import { badgeProps } from '../../utils/badge-props';
import { AvatarFile } from '../atoms/avatar-file';
import MorePopover from '../atoms/more-popover';
import ConfirmDialog from '../organisms/confirm-dialog/confirm-dialog';
import { useDaoProfile } from '../templates/dao-profile';
import { CategoriesList } from './categories-list';

/* TODO: Arias and Labels */
type GatesCardProps = PartialDeep<Gates> & {
  showStatus?: boolean;
  showOptions?: boolean;
  href?: string;
  onClick?: () => void;
};

export function GatesCard({
  title,
  image,
  description,
  categories,
  dao,
  id,
  published: publishedProps,
  showStatus,
  showOptions,
  href,
  onClick,
}: GatesCardProps): JSX.Element {
  const hasDao = !!dao;

  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const { gqlAuthMethods } = useAuth();
  const { isAdmin } = useDaoProfile();
  const router = useRouter();
  const { t } = useTranslation('gates-card');

  const [published, setPublished] = useState(publishedProps);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmToggleState, setConfirmToggleState] = useState(false);

  const gateOptions = [
    {
      text:
        published === 'not_published' || published === 'paused'
          ? t('publish')
          : t('unpublish'),
      action: () => setConfirmToggleState(true),
      hidden: false,
    },
    {
      text: t('edit'),
      action: () => router.push(`${ROUTES.GATE_NEW}?dao=${dao.id}&gate=${id}`),
      hidden: published === 'published' || published === 'paused',
    },
    {
      text: t('delete'),
      action: () => setConfirmDelete(true),
      hidden: false,
    },
  ];

  const { mutate: toggleGateStateMutation } = useMutation(
    ['toggleGateState', id],
    gqlAuthMethods.toggle_gate_state
  );

  const toggleGateState = () =>
    toggleGateStateMutation(
      {
        gate_id: id,
        state: published === 'published' ? 'paused' : 'published',
      },
      {
        onSuccess: async (data) => {
          setPublished(data.update_gates_by_pk.published);

          snackbar.onOpen({
            message:
              published === 'not_published' || published === 'paused'
                ? t('credential.published')
                : t('credential.unpublished'),
          });

          await queryClient.refetchQueries(['gate', id]);
          await queryClient.refetchQueries(['dao-gates', dao.id]);
        },
        onError() {
          snackbar.handleClick({
            message: t('credential.error.toggle'),
          });
        },
      }
    );

  const { mutate: deleteGateMutation } = useMutation(
    ['deleteGate', id],
    gqlAuthMethods.deleteGate
  );

  const deleteGate = () =>
    deleteGateMutation(
      { gate_id: id },
      {
        async onSuccess() {
          snackbar.onOpen({
            message: t('credential.deleted'),
          });

          await queryClient.refetchQueries(['gate', id]);
          await queryClient.refetchQueries(['dao-gates', dao.id]);
        },
        onError() {
          snackbar.handleClick({
            message: t('credential.error.delete'),
          });
        },
      }
    );

  const url = useMemo(
    () => href || ROUTES.GATE_PROFILE.replace('[id]', id),
    [id, href]
  );

  const actionChildren = (
    <CardActionArea {...(!onClick ? { component: 'a' } : { onClick })}>
      <CardMedia
        component="img"
        {...badgeProps({ image, title })}
        sx={{ aspectRatio: '1/1' }}
      />
    </CardActionArea>
  );

  const contentChildren = (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: '25px',
          paddingLeft: '16px',
        }}
      >
        <CardHeader
          sx={{
            pt: 2,
            pb: 1,
            '.MuiCardHeader-action': {
              position: 'absolute',
              right: 30,
            },
            px: 0,
          }}
          avatar={
            hasDao && (
              <AvatarFile
                file={dao.logo}
                fallback={dao?.logo_url || '/logo.png'}
                sx={{ width: 32, height: 32 }}
                aria-label={`${dao.name}'s DAO image`}
              >
                {dao.name?.[0]}
              </AvatarFile>
            )
          }
          title={hasDao ? dao.name : title}
          action={
            isAdmin && showOptions && <MorePopover options={gateOptions} />
          }
        />
      </Box>
      <CardContent sx={{ py: 1 }}>
        {hasDao && (
          <Link passHref href={url}>
            <Typography gutterBottom variant="h5" sx={{ cursor: 'pointer' }}>
              {title}
            </Typography>
          </Link>
        )}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            /* TODO: make line-clamp reusable */
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </Typography>
      </CardContent>
      <CategoriesList
        isGate
        showStatus={showStatus}
        published={published}
        categories={categories}
      />
    </>
  );

  return (
    <>
      {onClick === undefined ? (
        <MUICard sx={{ position: 'relative' }}>
          <Link passHref href={url}>
            {actionChildren}
          </Link>
          {contentChildren}
        </MUICard>
      ) : (
        <MUICard sx={{ position: 'relative' }}>
          {actionChildren}
          {contentChildren}
        </MUICard>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: snackbar.vertical,
          horizontal: snackbar.horizontal,
        }}
        open={snackbar.open}
        onClose={snackbar.handleClose}
        message={snackbar.message}
      />
      <ConfirmDialog
        title={t('credential.confirm.delete.title')}
        open={confirmDelete}
        positiveAnswer="Delete"
        negativeAnswer="Cancel"
        setOpen={setConfirmDelete}
        onConfirm={deleteGate}
      >
        {t('credential.confirm.delete.text')}
      </ConfirmDialog>
      <ConfirmDialog
        title={
          published === 'published'
            ? t('credential.confirm.unpublish.title')
            : t('credential.confirm.publish.title')
        }
        open={confirmToggleState}
        positiveAnswer={`${
          published === 'published' ? t('unpublish') : t('publish')
        }`}
        negativeAnswer={t('cancel')}
        setOpen={setConfirmToggleState}
        onConfirm={toggleGateState}
      >
        {published === 'published'
          ? t('credential.confirm.unpublish.text')
          : t('credential.confirm.publish.text')}
      </ConfirmDialog>
    </>
  );
}
