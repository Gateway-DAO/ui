import { brandColors } from '@gateway/theme';

import { Box, Chip, Stack, Typography, alpha } from '@mui/material';

export type StepNames =
  | ''
  | 'name'
  | 'gatewayId'
  | 'categories'
  | 'about'
  | 'role'
  | 'twitter'
  | 'email'
  | 'telegram';

type Props = {
  step?: StepNames;
  name?: string;
  gatewayId?: string;
  categories?: string[];
  about?: string;
};

export default function RealTimeView({
  step,
  name,
  gatewayId,
  categories,
  about,
}: Props) {
  const setColor = (stepName: string): string => {
    return step === stepName
      ? alpha(brandColors.white.main, 0.6)
      : alpha(brandColors.white.main, 0.2);
  };

  return (
    <Stack
      sx={{
        backgroud: brandColors.purple.main,
        pl: { xs: 2, md: 6 },
        boxShadow:
          '0px 0px 20px rgba(0, 0, 0, 0.15), 0px 25px 30px rgba(0, 0, 0, 0.35)',
        flexGrow: 1,
      }}
    >
      <Stack
        sx={{
          position: 'relative',
          borderRadius: '10px 0 0 0',
          height: 196,
          background:
            'linear-gradient(265.82deg, #432F70 0.24%, #23182E 84.35%)',
        }}
      >
        <Stack direction="row" gap={1} sx={{ mt: '20px', ml: '20px' }}>
          <Box
            sx={{
              background: alpha(brandColors.white.main, 0.15),
              width: 12,
              height: 12,
              borderRadius: '50%',
            }}
          />
          <Box
            sx={{
              background: alpha(brandColors.white.main, 0.15),
              width: 12,
              height: 12,
              borderRadius: '50%',
            }}
          />
          <Box
            sx={{
              background: alpha(brandColors.white.main, 0.15),
              width: 12,
              height: 12,
              borderRadius: '50%',
            }}
          />
        </Stack>
        <Box
          sx={{
            width: 88,
            height: 88,
            border: '2px solid #10041C',
            borderRadius: '50%',
            position: 'absolute',
            left: 28,
            bottom: -44,
          }}
        >
          <img src="/images/avatar2.png" alt="Org image" />
        </Box>
      </Stack>
      <Stack
        sx={{ pt: 8.5, pb: 3, px: '28px', background: '#1F132B', flexGrow: 1 }}
      >
        {name ? (
          <Typography variant="h4" sx={{ mb: gatewayId ? '1px' : '9px' }}>
            {name}
          </Typography>
        ) : (
          <Box
            sx={{
              width: 121,
              height: 42,
              background: setColor('name'),
              borderRadius: '100px',
              mb: '9px',
            }}
          />
        )}

        {gatewayId ? (
          <Typography
            sx={{
              mb: '9px',
              color: alpha(brandColors.white.main, 0.6),
            }}
          >
            @{gatewayId}
          </Typography>
        ) : (
          <Box
            sx={{
              width: 81,
              height: 16,
              background: setColor('gatewayId'),
              borderRadius: 0.5,
              mb: '14px',
            }}
          />
        )}

        <Stack direction="row" gap="6px" sx={{ mb: about ? '18px' : '22px' }}>
          {categories && categories.length > 0 ? (
            categories.map((category, index) => (
              <Chip
                aria-hidden={false}
                key={category + index}
                label={category}
                size="small"
                sx={{ mr: 'none' }}
              />
            ))
          ) : (
            <>
              <Box
                sx={{
                  width: 81,
                  height: 25,
                  background: setColor('categories'),
                  borderRadius: '100px',
                }}
              />
              <Box
                sx={{
                  width: 51,
                  height: 25,
                  background: setColor('categories'),
                  borderRadius: '100px',
                }}
              />
            </>
          )}
        </Stack>

        {about ? (
          <Typography
            sx={{
              color: alpha(brandColors.white.main, 0.6),
            }}
          >
            {about}
          </Typography>
        ) : (
          <>
            <Box
              sx={{
                width: '80%',
                height: 16,
                background: setColor('about'),
                borderRadius: 0.5,
                mb: 1,
              }}
            />
            <Box
              sx={{
                width: '80%',
                height: 16,
                background: setColor('about'),
                borderRadius: 0.5,
                mb: 1,
              }}
            />
            <Box
              sx={{
                width: 222,
                height: 16,
                background: setColor('about'),
                borderRadius: 0.5,
              }}
            />
          </>
        )}
      </Stack>
    </Stack>
  );
}
