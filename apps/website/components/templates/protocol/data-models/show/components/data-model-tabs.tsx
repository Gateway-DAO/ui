import { PartialDeep } from 'type-fest/source/partial-deep';

import { Box, Tab, Tabs } from '@mui/material';

import {
  DataModel,
  GetDataModelStatsQuery,
} from '../../../../../../services/gateway-protocol/types';
import { useRouter } from 'next/router';
import DataModelShow from '../data-model-show';
import { useQuery } from '@tanstack/react-query';
import { gatewayProtocolSDK } from 'apps/website/services/gateway-protocol/api';
import useTranslation from 'next-translate/useTranslation';
import { TabPanel } from 'apps/website/components/atoms/tabs';

export default function DataModelTabs({ children }) {
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
  const { t } = useTranslation('protocol');

  const { data: dataModel } = useQuery(['testing'], async () => {
    const dataModel = await gatewayProtocolSDK.dataModel({
      id: '1f1bff45-6ffb-48c1-ab6e-06f19cb7a744',
    });
    return dataModel?.dataModel;
  });

  const { data: stats } = useQuery(['stats-testing'], async () => {
    const stats = await gatewayProtocolSDK.getDataModelStats({
      dataModelId: '1f1bff45-6ffb-48c1-ab6e-06f19cb7a744',
    });
    return stats;
  });

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
      <DataModelShow
        dataModel={dataModel}
        stats={stats}
        dataModelIdLabel={t('data-model.data-model-id')}
        copySucessMessage={t('data-model.copy-id')}
        badgeTooltip={t('data-model.verified-description')}
        dialogAnswer={t('data-model.issue-credential.dialog-text')}
        negativeAnswer={t('data-model.issue-credential.dialog-negative')}
        positiveAnswer={t('data-model.issue-credential.dialog-positive')}
        title={t('data-model.issue-credential.dialog-title')}
      />
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
        <TabPanel tabsId={''} index={0} active>
          {children}
        </TabPanel>
      </Box>
    </>
  );
}
