import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';

import { getCredentialImageURLParams } from 'apps/website/utils/credential/build-image-url-params';
import { DateTime } from 'luxon';
import { PartialDeep } from 'type-fest';

import { Reddit, LinkedIn, Twitter, Email } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

import { Credential } from '../../services/gateway-protocol/types';
import objectToParams from '../../utils/map-object';
import SquareButton from './square-button';

type Props = {
  isCredential?: boolean;
  credential?: PartialDeep<Credential>;
};

export default function ShareOn({ isCredential, credential }: Props) {
  const { t } = useTranslation('common');

  const emailLink = `mailto:?body=${window.location.href}&subject=${t(
    'social.share-title'
  )}`;

  const tweetLink = `https://twitter.com/intent/tweet${objectToParams({
    text: t('social.share-title'),
    url: window.location.href,
  })}`;

  const redditLink = `https://reddit.com/submit${objectToParams({
    title: t('social.share-title'),
    url: window.location.href,
  })}`;

  const linkedinLink = `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`;

  const imageUrlParams = getCredentialImageURLParams(credential);

  return (
    <Stack sx={{ textAlign: 'left' }}>
      <Typography fontWeight={700} sx={{ mb: 2 }}>
        {t('social.share-on')}
      </Typography>
      {isCredential && credential.id && (
        <Stack mb={3}>
          <Image
            style={{
              borderRadius: '12px',
            }}
            src={`${window.location.origin}/api/og-image/credential${imageUrlParams}`}
            alt="Credential Image"
            width={620}
            height={326}
          />
        </Stack>
      )}
      <Stack gap={1} direction={{ xs: 'column', sm: 'row' }}>
        <SquareButton
          label={t('social.email')}
          clickHandler={(e) => {
            window.location.href = emailLink;
            e.preventDefault();
          }}
        >
          <Email color="secondary" />
        </SquareButton>
        <SquareButton
          label={t('social.reddit')}
          clickHandler={() => window.open(redditLink)}
        >
          <Reddit color="secondary" />
        </SquareButton>
        <SquareButton
          label={t('social.twitter')}
          clickHandler={() => window.open(tweetLink)}
        >
          <Twitter color="secondary" />
        </SquareButton>
        <SquareButton
          label={t('social.linkedin')}
          clickHandler={() => window.open(linkedinLink)}
        >
          <LinkedIn color="secondary" />
        </SquareButton>
      </Stack>
    </Stack>
  );
}
