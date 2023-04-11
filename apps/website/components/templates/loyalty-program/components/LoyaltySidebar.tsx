import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { limitCharsCentered } from '@gateway/helpers';

import { ReadMore } from '@mui/icons-material';
import { Box, Button, Chip, Grid, Stack, Typography } from '@mui/material';

import { ROUTES } from '../../../../constants/routes';
import { Gates, Loyalty_Program } from '../../../../services/hasura/types';
import { AvatarFile } from '../../../atoms/avatar-file';
import ExternalLink from '../../../atoms/external-link';
import { ShareButton } from '../../../atoms/share-button';
import { TokenFilled } from '../../../molecules/mint-card/assets/token-filled';

type LoyaltySidebarProps = {
  loyalty: PartialDeep<Loyalty_Program>;
  gate?: PartialDeep<Gates>;
};

export function LoyaltySidebar({ gate, loyalty }: LoyaltySidebarProps) {
  const { t } = useTranslation('loyalty-program');
  const router = useRouter();

  const texts = {
    title: gate?.title || loyalty.name,
    categories: gate?.categories || loyalty.categories,
    description: gate?.description || loyalty.description,
    image: gate?.image || loyalty.image,
  };
  return (
    <Grid item>
      <Box
        sx={(theme) => ({
          padding: {
            xs: `${theme.spacing(5)} ${theme.spacing(2)}`,
            md: `${theme.spacing(5)} ${theme.spacing(7)}`,
          },
        })}
      >
        <Link
          passHref
          href={ROUTES.DAO_PROFILE.replace('[slug]', loyalty.dao?.slug)}
        >
          <Stack
            direction="row"
            alignItems="center"
            width="fit-content"
            marginBottom={(theme) => theme.spacing(2)}
            sx={(theme) => ({
              [theme.breakpoints.down('sm')]: {
                width: '100%',
              },
              cursor: 'pointer',
            })}
          >
            <AvatarFile
              alt={loyalty.dao.name}
              file={loyalty.dao.logo}
              fallback={loyalty.dao.logo_url}
              sx={{
                height: (theme) => theme.spacing(3),
                width: (theme) => theme.spacing(3),
                marginRight: (theme) => theme.spacing(1),
              }}
            />
            <Typography
              variant="body2"
              color={(theme) => theme.palette.text.secondary}
            >
              {loyalty.dao.name}
            </Typography>
          </Stack>
        </Link>

        <Typography variant="h4" marginBottom={(theme) => theme.spacing(2)}>
          {texts.title}
        </Typography>

        <Box marginBottom={(theme) => theme.spacing(2)}>
          <Stack
            direction={'row'}
            sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
          >
            <Box>
              {texts?.categories.map((category, idx) => (
                <Chip
                  key={'category-' + (idx + 1)}
                  label={category}
                  sx={{
                    marginRight: (theme) => theme.spacing(1),
                    marginBottom: (theme) => theme.spacing(1),
                  }}
                />
              ))}
            </Box>
            {/*TODO: use share dialog*/}
            {/* <Stack flexDirection="row" gap={1}>
              <ShareButton title={`${texts?.title} @Gateway`} />
            </Stack> */}
          </Stack>
        </Box>

        {texts?.description?.length > 250 ? (
          <ReadMore>{texts?.description}</ReadMore>
        ) : (
          <Typography
            variant="body1"
            marginBottom={(theme) => theme.spacing(4)}
            sx={{ wordBreak: 'break-word' }}
            paragraph={true}
          >
            {texts?.description}
          </Typography>
        )}

        <Stack direction="row" gap={2} mb={2}>
          <Button
            variant="outlined"
            disabled
            fullWidth
            sx={{
              mb: 2,
            }}
          >
            {t('loyalty-program-page.sidebar.display-credential')}
          </Button>
          <Button
            variant="contained"
            disabled
            startIcon={<TokenFilled height={20} width={20} color="action" />}
            fullWidth
            sx={{
              mb: 2,
            }}
          >
            {t('loyalty-program-page.sidebar.mint-nft')}
          </Button>
        </Stack>

        <Box
          component="img"
          src={texts?.image}
          alt={texts?.title + ' image'}
          marginBottom={(theme) => theme.spacing(4)}
          sx={{
            width: '100%',
            borderRadius: (theme) => theme.spacing(1),
          }}
        />

        <Grid container rowGap={(theme) => theme.spacing(3)}>
          <Stack justifyContent="space-between" direction="row" width="100%">
            <Typography
              variant="body2"
              color={(theme) => theme.palette.text.secondary}
            >
              {t('loyalty-program-page.sidebar.data-model-id')}
            </Typography>
            <ExternalLink
              text={limitCharsCentered(loyalty.data_model_id, 6)}
              sxProps={{ alignSelf: 'flex-end' }}
              handleClick={() => {
                router.push({
                  pathname: ROUTES.PROTOCOL_DATAMODEL,
                  query: { id: loyalty.data_model_id },
                });
              }}
            />
          </Stack>
        </Grid>
      </Box>
    </Grid>
  );
}
