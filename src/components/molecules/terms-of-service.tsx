import { Box, Typography, Link } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';

type termsType = {
  title: string;
  id: string;
  descriptions: string[];
}[];

export default function TermsOfService() {
  const { t } = useTranslation('terms');

  const terms = t('rules', null, { returnObjects: true }) as termsType;
  return (
    <Box sx={{ my: 20 }}>
      <Typography variant="h2" sx={{ my: 5 }}>
        {t('title')}
      </Typography>
      <Typography variant="h6" sx={{ my: 5 }}>
        {t('subTitle')}
      </Typography>
      {terms.map((section, index) => (
        <Box>
          <Typography
            component={Link}
            href={`/terms#${section.id}`}
            sx={{ textDecoration: 'none', boxShadow: 'none' }}
          >
            {index + 1}. {section.title}
          </Typography>
        </Box>
      ))}
      {terms.map((section, index) => (
        <Box id={section.id}>
          <Typography sx={{ my: 5 }}>
            {index + 1}. {section.title}
          </Typography>
          {section.descriptions.map((description) => (
            <Typography sx={{ my: 1.5 }}>{description}</Typography>
          ))}
        </Box>
      ))}
    </Box>
  );
}
