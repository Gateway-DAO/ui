import { ReactNode } from 'react';

import { brandColors } from '@/theme';
import { useTheme } from '@emotion/react';

import { Stack, Typography, alpha } from '@mui/material';

type Props = {
  label: string;
  children: ReactNode;
  margin?: boolean;
  px?: number;
  py?: number;
  alignRight?: boolean;
  inverted?: boolean;
  disabled?: boolean;
};

type TextProps = {
  children: ReactNode;
  disabled: boolean;
};

function TextBig({ children, disabled }: TextProps) {
  const theme = useTheme();
  return (
    <Typography
      fontSize={12}
      sx={(theme) => ({
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        color: disabled
          ? alpha(brandColors.white.main, 0.3)
          : alpha(brandColors.white.main, 0.7),
      })}
    >
      {children}
    </Typography>
  );
}

function TextSmall({ children, disabled }: TextProps) {
  return (
    <Typography
      fontSize={14}
      sx={(theme) => ({
        color: disabled
          ? alpha(brandColors.white.main, 0.3)
          : brandColors.white.main,
        fontWeight: theme.typography.fontWeightRegular,
        letterSpacing: '0.4px',
        fontFamily: 'Plus Jakarta Sans',
        fontStyle: 'normal',
      })}
    >
      {children}
    </Typography>
  );
}

export default function CardCell({
  label,
  children,
  margin = true,
  py = 2,
  px = 2,
  alignRight = false,
  inverted = false,
  disabled = false,
}: Props) {
  return (
    <Stack
      gap={margin ? 1 : 0}
      sx={{
        px,
        py,
        width: '100%',
        textAlign: alignRight ? 'right' : 'left',
      }}
    >
      {inverted ? (
        <>
          <TextSmall disabled={disabled}>{label}</TextSmall>
          <TextBig disabled={disabled}>{children}</TextBig>
        </>
      ) : (
        <>
          <TextBig disabled={disabled}>{label}</TextBig>
          <TextSmall disabled={disabled}>{children}</TextSmall>
        </>
      )}
    </Stack>
  );
}
