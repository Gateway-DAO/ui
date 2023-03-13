import useTranslation from 'next-translate/useTranslation';

import { Reddit, LinkedIn, Twitter, Email } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

import objectToParams from '../../utils/map-object';
import SquareButton from './square-button';

export default function ShareOn() {
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

  return (
    <Stack sx={{ textAlign: 'left' }}>
      <Typography fontWeight={700} sx={{ mb: 2 }}>
        {t('social.share-on')}
      </Typography>
      <Stack gap={1} direction="row">
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
