import { brandColors } from '@gateway/theme';

import { Stack, Paper, Typography, alpha } from '@mui/material';

import ContentTableOneColumn from './content-table-one-column';
import ContentTableTwoColumns from './content-table-two-columns';

type Props = {
  title: string;
  data: any[];
  subtitle1?: string;
  subtitle2?: string;
  column2?: string;
  isInputType?: boolean;
};

export default function DataTable({
  title,
  data,
  subtitle1,
  subtitle2,
  column2,
  isInputType = false,
}: Props) {
  return (
    <Paper
      elevation={2}
      component={Stack}
      sx={{
        border: '1px solid rgba(229, 229, 229, 0.12)',
        borderRadius: 2,
        mb: 2,
      }}
    >
      <Typography sx={{ px: 2, pt: 2, fontWeight: 700 }}>{title}</Typography>
      {subtitle1 && (
        <Stack
          sx={{ px: 2, pt: 2 }}
          direction="row"
          justifyContent="space-between"
        >
          <Typography
            fontSize={12}
            sx={{
              textTransform: 'uppercase',
              fontWeight: 600,
              color: alpha(brandColors.white.main, 0.7),
            }}
          >
            {subtitle1}
          </Typography>
          {subtitle2 && (
            <Typography
              fontSize={12}
              sx={{
                fontWeight: 600,
                textTransform: 'uppercase',
                color: alpha(brandColors.white.main, 0.7),
              }}
            >
              {subtitle2}
            </Typography>
          )}
        </Stack>
      )}

      {!column2 && <ContentTableOneColumn data={data} />}
      {column2 && (
        <ContentTableTwoColumns
          data={data}
          column2={column2}
          isInputType={isInputType}
        />
      )}
    </Paper>
  );
}
