import { Stack, Paper, Box, Divider, Chip, Link } from '@mui/material';

import CardCell from './card-cell';

export default function CardInformation() {
  return (
    <Paper
      elevation={2}
      component={Stack}
      sx={{ border: '1px solid rgba(229, 229, 229, 0.12)', borderRadius: 2 }}
      divider={<Divider sx={{ width: '100%' }} />}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CardCell label="Issuance date" margin={false}>
          <Link href="#" sx={{ textDecoration: 'none' }}>
            havarduniversity.ens
          </Link>
        </CardCell>
        <Box sx={{ p: 2 }}>&#62;</Box>
        <CardCell label="Issuance date" margin={false} alignRight={true}>
          <Link href="#" sx={{ textDecoration: 'none' }}>
            havarduniversity.ens
          </Link>
        </CardCell>
      </Stack>
      <Stack
        direction="row"
        alignItems="stretch"
        justifyContent="space-around"
        divider={
          <Box sx={{ width: '2px' }}>
            <Divider orientation="vertical" flexItem sx={{ height: '100%' }} />
          </Box>
        }
      >
        <CardCell label="Issuance date">Aug 5th, 2022</CardCell>
        <CardCell label="Expiration date">Indeterminate</CardCell>
        <CardCell label="Expiration date">
          <Chip label="Valid" size="small" variant="outlined" color="success" />
        </CardCell>
      </Stack>
    </Paper>
  );
}
