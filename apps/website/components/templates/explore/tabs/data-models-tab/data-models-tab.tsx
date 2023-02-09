import Loading from 'apps/website/components/atoms/loading';

import { Box } from '@mui/material';

export default function DataModelsTab(): JSX.Element {
  const isLoading = true;
  return <Box sx={{ py: 4 }}>{isLoading ? <Loading /> : <>carregado</>}</Box>;
}
