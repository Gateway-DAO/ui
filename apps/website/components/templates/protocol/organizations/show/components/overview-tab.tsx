import useTranslation from 'next-translate/useTranslation';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { theme, TOKENS } from '@gateway/theme';

import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';

import {
  DataModel,
  GetDataModelStatsQuery,
} from '../../../../../../services/gateway-protocol/types';
import ExternalLink from '../../../../../atoms/external-link';
import DataGrid, {
  IColumnGrid,
} from '../../../../../organisms/data-grid/data-grid';
import { useOrganizationContext } from '../context';

// type Props = {
//   dataModel: PartialDeep<DataModel>;
//   stats: GetDataModelStatsQuery;
// };

export default function OverviewTab({
  setActiveTab,
}: {
  setActiveTab: (tab: number) => void;
}) {
  const { t } = useTranslation('protocol');
  const { credentials } = useOrganizationContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  const columns: IColumnGrid[] = [
    {
      column_name: 'credential_id',
      header_name: 'Credential ID',
    },
    {
      column_name: 'category',
      header_name: 'Category',
    },
    {
      column_name: 'recipient_id',
      header_name: 'Recipient ID',
    },
    {
      column_name: 'issuance_date',
      header_name: 'Issuance Date',
    },
    {
      column_name: 'status',
      header_name: 'Status',
    },
  ];

  const issuedCredentials = {
    pages: [credentials],
  };

  return (
    <Stack sx={{ pt: 2 }}>
      {/* <OverviewCardInfo dataModel={dataModel} /> */}
      <Stack
        gap={isMobile ? 1 : 2}
        justifyContent="space-between"
        sx={{ flexDirection: { xs: 'column', md: 'row' }, mb: 5 }}
      >
        {/* <h2>Overview Tab</h2> */}
        {/* <DashboardCard
          label={t('data-model.issuers')}
          value={stats?.getTotalofIssuersByDataModel}
        />
        <DashboardCard
          label={t('data-model.issued-credentials')}
          value={stats?.getTotalCredentialsByDataModel}
        />
        <DashboardCard
          label={t('data-model.recipients')}
          value={stats?.getTotalCredentialsByDataModelGroupByRecipient}
        />
        */}
      </Stack>
      <Stack
        direction="column"
        divider={<Divider />}
        sx={{
          section: {
            py: 4,
          },
        }}
      >
        <Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            px={TOKENS.CONTAINER_PX}
            mb={8}
          >
            <Box>
              <Typography variant="h6">Last issued credentials</Typography>
              <Typography variant="caption" color="text.secondary">
                Lorem ipsum dolor et ex machina
              </Typography>
            </Box>
            <Box
              sx={{
                display: {
                  xs: 'none',
                  md: 'block',
                },
              }}
            >
              <Button onClick={() => setActiveTab(1)}>View more</Button>
            </Box>
          </Stack>
          <Stack px={TOKENS.CONTAINER_PX} mb={4}>
            <DataGrid columns={columns} data={issuedCredentials} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
