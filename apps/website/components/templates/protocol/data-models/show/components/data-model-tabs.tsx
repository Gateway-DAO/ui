import { PartialDeep } from 'type-fest/source/partial-deep';

import { Box, Tab, Tabs } from '@mui/material';

import {
  DataModel,
  GetDataModelStatsQuery,
} from '../../../../../../services/gateway-protocol/types';
import { useRouter } from 'next/router';

export default function DataModelTabs() {
  const router = useRouter();
  let _selectedTab = router.asPath;
  _selectedTab = _selectedTab.slice(_selectedTab.lastIndexOf('/')).slice(1);

  const routesForTabs = [
    '',
    'issuers',
    'recipients',
    'credentials',
    'playground',
  ];
  const tabs = [
    'overview',
    'issuers',
    'recipients',
    'credentials',
    'playground',
  ];

  const selectedIndex =
    routesForTabs.indexOf(_selectedTab) === -1
      ? 0
      : routesForTabs.indexOf(_selectedTab);

  const modelId =
    selectedIndex === 0
      ? _selectedTab
      : router.asPath.slice(
          router.asPath.indexOf('model/') + 6,
          router.asPath.lastIndexOf('/')
        );
  return (
    <>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          px: { xs: 0, md: 4, lg: 6 },
          mt: 4,
        }}
      >
        <Tabs
          value={selectedIndex}
          onChange={(_, index) => {
            const tab = routesForTabs.at(index);
            if (tab === '') {
              router.replace(`/model/${modelId}`, undefined, {
                shallow: true,
              });
            } else
              router.replace(`/model/${modelId}/${tab}`, undefined, {
                shallow: true,
              });
          }}
          sx={{
            mb: '-1px',
            '& > div': {
              maxWidth: { xs: '350px', md: '100%' },
              overflow: { xs: 'scroll!important', md: 'hidden' },
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            },
          }}
        >
          {tabs.map((value, index) => (
            <Tab
              key={index}
              label={value}
              sx={(theme) => ({
                fontWeight: 700,
                px: 0,
                mr: theme.spacing(3),
                fontSize: '12px',
              })}
            />
          ))}
        </Tabs>
      </Box>
    </>
  );
}
