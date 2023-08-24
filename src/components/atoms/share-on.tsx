import useTranslation from 'next-translate/useTranslation';

import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';
import {
  Loyalty_Program,
  Protocol_Api_Credential,
} from '@/services/hasura/types';
import {
  getCredentialImageURLParams,
  issuerName,
  recipientName,
} from '@/utils/credential/build-image-url-params';
import { getLoyaltyPassImageURLParams } from '@/utils/loyalty-pass/build-image-url-params';
import objectToParams from '@/utils/map-object';
import { useSnackbar } from 'notistack';
import { PartialDeep } from 'type-fest';

import { LinkedIn, Twitter, Download, Link } from '@mui/icons-material';
import { Stack, Typography, Box } from '@mui/material';

import SquareButton from './buttons/square-button';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

type Props = {
  isCredential?: boolean;
  credential?: PartialDeep<Protocol_Api_Credential>;
  isLoyaltyPass?: boolean;
  loyaltyCredentialId?: string;
  loyaltyPass?: PartialDeep<Loyalty_Program>;
  actualTier?: string;
};

export default function ShareOn({
  isCredential,
  credential,
  isLoyaltyPass,
  loyaltyCredentialId,
  loyaltyPass,
  actualTier,
}: Props) {
  const { t } = useTranslation('common');
  const { me } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const isReceivedCredential =
    me && me?.wallet === credential?.recipientUser?.primaryWallet?.address;
  let tweetText;

  if (isReceivedCredential) {
    tweetText = t('social.share-twitter-recipient')
      .replace('[title]', credential?.title)
      .replace('[issuer]', issuerName(credential));
  } else if (isCredential) {
    tweetText = t('social.share-anonymous')
      .replace('[title]', credential?.title)
      .replace('[issuer]', issuerName(credential))
      .replace('[recipient]', recipientName(credential));
  }

  const buildUrlToShare = () => {
    if (isLoyaltyPass && loyaltyCredentialId) {
      return (
        window.location.origin +
        ROUTES.PROTOCOL_CREDENTIAL.replace('[id]', loyaltyCredentialId)
      );
    }
    return window.location.href;
  };

  const tweetLink = `https://twitter.com/intent/tweet${objectToParams({
    text: tweetText,
    url: buildUrlToShare() + '?utm_source=linkedin&utm_medium=share_dialog',
  })}`;

  const linkedinLink = `https://www.linkedin.com/shareArticle?mini=true&url=${buildUrlToShare()}&utm_source=linkedin&utm_medium=share_dialog`;

  const imageUrlParams = isLoyaltyPass
    ? getLoyaltyPassImageURLParams(
        loyaltyPass,
        me?.protocolUser?.gatewayId,
        actualTier
      )
    : getCredentialImageURLParams(credential);

  const imageURL = `${window.location.origin}/api/og-image/${
    isLoyaltyPass ? 'loyalty-pass' : 'credential'
  }${imageUrlParams}`;

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
      {isCredential && credential?.id && (
        <Stack mb={3}>
          <Box
            component="img"
            sx={{
              borderRadius: '12px',
              width: { xs: '100%', sm: '550px' },
              height: 'auto',
            }}
            src={imageURL}
            alt={credential?.title}
          />
        </Stack>
      )}
      {isLoyaltyPass && loyaltyPass.id && (
        <Stack mb={3}>
          <Box
            component="img"
            sx={{
              borderRadius: '12px',
              width: { xs: '100%', sm: '550px' },
              height: 'auto',
            }}
            src={imageURL}
            alt={loyaltyPass?.name}
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
