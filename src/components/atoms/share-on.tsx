import useTranslation from 'next-translate/useTranslation';

import { useSnackbar } from 'notistack';
import { PartialDeep } from 'type-fest';

import { LinkedIn, Twitter, Download, Link } from '@mui/icons-material';
import { Stack, Typography, Box } from '@mui/material';

import { useAuth } from '@/providers/auth';
import { Credential } from '@/services/gateway-protocol/types';
import { getCredentialImageURLParams } from '@/utils/credential/build-image-url-params';
import objectToParams from '@/utils/map-object';
import SquareButton from './square-button';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

type Props = {
  isCredential?: boolean;
  credential?: PartialDeep<Credential>;
};

export default function ShareOn({ isCredential, credential }: Props) {
  const { t } = useTranslation('common');
  const { me } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const isReceivedCredential =
    me && me?.wallet === credential?.recipientUser?.primaryWallet?.address;

  let tweetText;

  if (isReceivedCredential) {
    tweetText = t('social.share-twitter-recipient')
      .replace('[title]', credential.title)
      .replace(
        '[issuer]',
        credential.issuerOrganization?.name ||
          credential.issuerOrganization?.gatewayId ||
          credential.issuerUser?.gatewayId
      );
  } else if (isCredential) {
    tweetText = t('social.share-anonymous')
      .replace('[title]', credential.title)
      .replace(
        '[issuer]',
        credential.issuerOrganization?.name ||
          credential.issuerOrganization?.gatewayId ||
          credential.issuerUser?.gatewayId
      )
      .replace('[recipient]', credential.recipientUser?.gatewayId);
  }

  const tweetLink = `https://twitter.com/intent/tweet${objectToParams({
    text: tweetText,
    url: window.location.href + '?utm_source=linkedin&utm_medium=share_dialog',
  })}`;

  const linkedinLink = `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&utm_source=linkedin&utm_medium=share_dialog`;

  const imageUrlParams = getCredentialImageURLParams(credential);
  const imageURL = `${window.location.origin}/api/og-image/credential${imageUrlParams}`;

  const sendClickToGA = (
    label: 'twitter' | 'linkedin' | 'download-image' | 'copy-url',
    isCredential: boolean
  ) => {
    if (typeof window.gtag === 'function' && isCredential) {
      window.gtag('event', 'share_click', {
        event_category: 'credential_share_click',
        event_label: label,
      });
    }
  };

  return (
    <Stack sx={{ textAlign: 'left', width: { xs: '100%', sm: 'auto' } }}>
      <Typography fontWeight={700} sx={{ mb: 2 }}>
        {t('social.share-on')}
      </Typography>
      {isCredential && credential.id && (
        <Stack mb={3}>
          <Box
            component="img"
            sx={{
              borderRadius: '12px',
              width: { xs: '100%', sm: '550px' },
              height: 'auto',
            }}
            src={imageURL}
            alt={credential.title}
          />
        </Stack>
      )}
      <Stack
        gap={1}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
      >
        <SquareButton
          fullWidth={isCredential}
          label={t('social.twitter')}
          clickHandler={() => {
            window.open(tweetLink);
            sendClickToGA('twitter', isCredential);
          }}
        >
          <Twitter color="secondary" />
        </SquareButton>
        <SquareButton
          fullWidth={isCredential}
          label={t('social.linkedin')}
          clickHandler={() => {
            window.open(linkedinLink);
            sendClickToGA('linkedin', isCredential);
          }}
        >
          <LinkedIn color="secondary" />
        </SquareButton>
        {isCredential && (
          <SquareButton
            fullWidth
            label={t('social.download-image')}
            clickHandler={(e) => {
              window.open(imageURL);
              enqueueSnackbar(t('social.download-image-feedback'));
              sendClickToGA('download-image', isCredential);
              e.preventDefault();
            }}
          >
            <Download color="secondary" />
          </SquareButton>
        )}
        <SquareButton
          fullWidth={isCredential}
          label={t('social.copy-link')}
          clickHandler={() => {
            navigator.clipboard.writeText(window.location.href);
            enqueueSnackbar(t('social.copy-link-feedback'));
            sendClickToGA('copy-url', isCredential);
          }}
        >
          <Link color="secondary" />
        </SquareButton>
      </Stack>
    </Stack>
  );
}
