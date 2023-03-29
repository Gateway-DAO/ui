import useTranslation from 'next-translate/useTranslation';

import { useSnackbar } from 'notistack';
import { PartialDeep } from 'type-fest';

import { LinkedIn, Twitter, Download, Link } from '@mui/icons-material';
import { Stack, Typography, Box } from '@mui/material';

import { useAuth } from '../../providers/auth';
import { Credential } from '../../services/gateway-protocol/types';
import { getCredentialImageURLParams } from '../../utils/credential/build-image-url-params';
import objectToParams from '../../utils/map-object';
import SquareButton from './square-button';

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

  let tweetText = t('social.share-title');

  if (isReceivedCredential) {
    tweetText = t('social.share-twitter-recipient')
      .replace('[title]', credential.title)
      .replace('[issuer]', credential.issuerUser?.gatewayId);
  } else if (isCredential) {
    tweetText = t('social.share-anonymous')
      .replace('[issuer]', credential.issuerUser?.gatewayId)
      .replace('[recipient]', credential.recipientUser?.gatewayId);
  }

  const tweetLink = `https://twitter.com/intent/tweet${objectToParams({
    text: tweetText,
    url: window.location.href,
  })}`;

  const linkedinLink = `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`;

  const imageUrlParams = getCredentialImageURLParams(credential);
  const imageURL = `${window.location.origin}/api/og-image/credential${imageUrlParams}`;

  return (
    <Stack sx={{ textAlign: 'left' }}>
      <Typography fontWeight={700} sx={{ mb: 2 }}>
        {t('social.share-on')}
      </Typography>
      {isCredential && credential.id && (
        <Stack mb={3}>
          <Box
            component="img"
            sx={{
              borderRadius: '12px',
              width: { xs: '100%', sm: '620px' },
              height: { xs: 'auto', sm: '326px' },
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
          fullWidth
          label={t('social.twitter')}
          clickHandler={() => window.open(tweetLink)}
        >
          <Twitter color="secondary" />
        </SquareButton>
        <SquareButton
          fullWidth
          label={t('social.linkedin')}
          clickHandler={() => window.open(linkedinLink)}
        >
          <LinkedIn color="secondary" />
        </SquareButton>
        <SquareButton
          fullWidth
          label={t('social.download-image')}
          clickHandler={(e) => {
            window.open(imageURL);
            enqueueSnackbar(t('social.download-image-feedback'));
            e.preventDefault();
          }}
        >
          <Download color="secondary" />
        </SquareButton>
        <SquareButton
          fullWidth
          label={t('social.copy-link')}
          clickHandler={() => {
            navigator.clipboard.writeText(window.location.href);
            enqueueSnackbar(t('social.copy-link-feedback'));
          }}
        >
          <Link color="secondary" />
        </SquareButton>
      </Stack>
    </Stack>
  );
}
