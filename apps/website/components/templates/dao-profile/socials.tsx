import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { PartialDeep } from 'type-fest';

import ShareIcon from '@mui/icons-material/IosShare';
import { Avatar, Stack, IconButton, Snackbar } from '@mui/material';

import { useSnackbar } from '../../../hooks/use-snackbar';
import { Daos } from '../../../services/graphql/types.generated';
import { SocialIcon } from '../../atoms/social-icon';

type Props = {
  dao: PartialDeep<Daos>;
};

export function Socials({ dao, children }: PropsWithChildren<Props>) {
  const snackbar = useSnackbar();
  const onShare = () => {
    const data = {
      title: `${dao.name} @ Gateway`,
      url: window.location.href,
    };
    try {
      if (navigator?.share && navigator.canShare(data)) {
        navigator.share(data);
      } else if (navigator?.clipboard && navigator.clipboard) {
        snackbar.onOpen({ message: 'Copied link!' });
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <Stack
        direction="row"
        gap={1}
        sx={{
          mt: 4,
        }}
      >
        {children}
        <IconButton
          sx={{
            p: 0,
          }}
          onClick={onShare}
        >
          <Avatar>
            <ShareIcon
              sx={{
                mt: -0.25,
              }}
            />
          </Avatar>
        </IconButton>
        {/* dao.socials?.map((social) => (
          <Link href={social.url} key={social.url} passHref>
            <Avatar component="a">
              <SocialIcon icon={social.network} />
            </Avatar>
          </Link>
        )) */}
      </Stack>
      <Snackbar
        anchorOrigin={{
          vertical: snackbar.vertical,
          horizontal: snackbar.horizontal,
        }}
        open={snackbar.open}
        onClose={snackbar.handleClose}
        message={snackbar.message}
      />
    </>
  );
}
