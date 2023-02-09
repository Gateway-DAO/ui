import { useQuery } from 'wagmi';

import { Box } from '@mui/material';

import Loading from '../../../../../components/atoms/loading';

export default function DataModelsTab(): JSX.Element {
  const { data: dataModels } = useQuery([]);
  const isLoading = true;
  return <Box sx={{ py: 4 }}>{isLoading ? <Loading /> : <>carregado</>}</Box>;
}
