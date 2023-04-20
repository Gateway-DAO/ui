import useTranslation from 'next-translate/useTranslation';

import { useToggle } from 'react-use';

import { limitChars } from '@gateway/helpers';
import { brandColors } from '@gateway/theme';

import { Link, SxProps, Typography } from '@mui/material';

export type Props = {
  text: string;
  length: number;
  sxProps?: SxProps;
};

export function SeeMore({ text, length, sxProps }: Props) {
  const { t } = useTranslation('common');
  const [expanded, setExpanded] = useToggle(false);

  return (
    <Typography
      sx={{
        fontWeight: 400,
        fontSize: 14,
        color: brandColors.white.main,
        maxWidth: 250,
        textAlign: 'right',
        ...sxProps,
      }}
    >
      {text?.length <= length && text}
      {text?.length > length && (
        <>
          {!expanded ? limitChars(text, length) : text}
          <Link
            sx={{ textDecoration: 'none', cursor: 'pointer' }}
            onClick={() => setExpanded()}
          >
            {' '}
            {!expanded ? t('actions.see-more') : t('actions.see-less')}
          </Link>
        </>
      )}
    </Typography>
  );
}
