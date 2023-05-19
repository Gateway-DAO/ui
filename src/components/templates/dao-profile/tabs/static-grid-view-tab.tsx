import useTranslation from 'next-translate/useTranslation';

import DataGrid from '@/components/organisms/data-grid/data-grid';

import { Stack } from '@mui/material';

import { useDaoProfile } from '../context';

type Props = {
  columns: any[]; //[ ] add interface/type
  data: any[];
};

export default function StaticGridViewTab({ columns, data }: Props) {
  const { t } = useTranslation('protocol');
  const { dao } = useDaoProfile();
  const gridData = {
    pages: [data],
  };
  return (
    <Stack sx={{ pb: 15, pt: 5 }}>
      <Stack>
        <DataGrid columns={columns} data={gridData} />
      </Stack>
    </Stack>
  );
}