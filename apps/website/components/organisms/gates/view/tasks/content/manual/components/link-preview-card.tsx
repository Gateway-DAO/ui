import { limitChars } from '@gateway/helpers';
import { brandColors } from '@gateway/theme';

import DescriptionIcon from '@mui/icons-material/Description';
import {
  CardActionArea,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { LinkPreviewOutput } from '../../../../../../../../services/graphql/types.generated';

type LinkPreviewCardProps = LinkPreviewOutput & {
  elevation?: number;
};

const LinkPreviewCard = ({
  favicons,
  title,
  siteName,
  description,
  url,
  elevation = 1,
}: LinkPreviewCardProps) => {
  return (
    <Paper
      elevation={elevation}
      sx={{
        mt: 2,
        boxShadow: 'none',
      }}
    >
      <CardActionArea
        component="a"
        href={url}
        target="_blank"
        sx={{
          display: 'flex',
          direction: 'row',
          border: '1px solid rgba(229, 229, 229, 0.12)',
          boxShadow: 'none',
          borderRadius: 1,
          width: '100%',
        }}
      >
        <Stack justifyContent="center" sx={{ p: 4 }}>
          {favicons?.[0] ? (
            <img src={favicons[0]} alt={siteName ?? title} width={24} />
          ) : (
            <DescriptionIcon
              sx={(theme) => ({
                color: theme.palette.grey[500],
                fontSize: '24px',
              })}
            />
          )}
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack sx={{ flexGrow: 1, p: 2 }}>
          {url && (
            <Typography
              fontSize={14}
              sx={(theme) => ({
                color: theme.palette.grey[500],
                mb: 2,
              })}
            >
              {limitChars(url, 30)}
            </Typography>
          )}
          {(!!title || !!siteName) && (
            <Typography
              sx={{
                color: brandColors.purple.main,
              }}
            >
              {limitChars(title ?? siteName, 30)}
            </Typography>
          )}
          {description?.length && (
            <Typography
              title=""
              sx={(theme) => ({
                color: theme.palette.grey[300],
              })}
            >
              {limitChars(description, 100)}
            </Typography>
          )}
        </Stack>
      </CardActionArea>
    </Paper>
  );
};

export default LinkPreviewCard;
