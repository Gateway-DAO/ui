import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { theme, TOKENS } from '@gateway/theme';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Avatar,
  Box,
  Stack,
  IconButton,
  useMediaQuery,
  Typography,
  Tab,
  Tabs,
  Skeleton,
} from '@mui/material';

import { query } from '../../../../../constants/queries';
import { ROUTES } from '../../../../../constants/routes';
import { useAuth } from '../../../../../providers/auth';
import { gatewayProtocolSDK } from '../../../../../services/gateway-protocol/api';
import { PermissionType } from '../../../../../services/gateway-protocol/types';
import { TabPanel } from '../../../../atoms/tabs';
import { HeadContainer } from '../../../../molecules/head-container';
import { ClientNav } from '../../../../organisms/navbar/client-nav';
import { DashboardTemplate } from '../../../dashboard';
import FloatingCta from '../../components/floating-cta';
import InfoTitle from '../../components/info-title';
import Tags from '../../components/tags';
import IssueCredentialButton from './components/issue-credential-button';

export function DataModelLayout({ children }) {
  const { t } = useTranslation('protocol');
  const { me } = useAuth();
  const router = useRouter();
  const { id: dataModelId } = router.query;

  const setOpenCreateCredential = () => {
    router.push(
      ROUTES.PROTOCOL_DATAMODEL_CREDENTIAL_CREATE.replace(
        '[id]',
        dataModelId as string
      )
    );
  };

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

  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  const { data: dataModel, isLoading } = useQuery(
    [query.dataModel, dataModelId],
    async () => {
      return (await gatewayProtocolSDK.dataModel({ id: dataModelId as string }))
        .dataModel;
    }
  );

  const hasAnAccountAvailableToIssue = useMemo(() => {
    if (!me?.id) return;
    const organizationsId = me?.protocol?.accesses?.map(
      (item) => item.organization.id
    );
    const usersIdAndOrganizationsId = [me?.protocol?.id].concat(
      organizationsId
    );
    const availableToIssue = dataModel?.allowedUsers
      .concat(dataModel?.allowedOrganizations as any)
      .map((availableItem) => availableItem.id);

    switch (dataModel?.permissioning) {
      case PermissionType.SpecificIds:
        return !!usersIdAndOrganizationsId.find((userOrOrgId) => {
          return (
            availableToIssue.length &&
            availableToIssue?.indexOf(userOrOrgId) > -1
          );
        });
      case PermissionType.Organizations:
        return !!organizationsId.length;
      case PermissionType.All:
      default:
        return true;
    }
  }, [me]);

  return (
    <>
      <HeadContainer
        title={`${isLoading ? 'Loading...' : dataModel.title} Data Model`}
      />

      <DashboardTemplate
        containerProps={{
          sx: {
            overflow: '',
          },
          height: '100%',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
          sx={{
            display: 'flex',
            pt: 2,
            flexGrow: {
              md: 0.5,
            },
            px: TOKENS.CONTAINER_PX,
          }}
        >
          <IconButton onClick={() => router.back()}>
            <Avatar>
              <ArrowBackIcon />
            </Avatar>
          </IconButton>
          <Box>
            <ClientNav />
          </Box>
        </Stack>
        <Stack
          sx={{
            py: 2,
            pb: { md: 1, xs: 27 },
            px: isMobile ? TOKENS.CONTAINER_PX : 0,
          }}
        >
          <Stack sx={{ px: { xs: 0, md: 4, lg: 6 } }}>
            <InfoTitle
              title={dataModel?.title}
              labelId={t('data-model.data-model-id')}
              id={dataModel?.id}
              copySucessMessage={t('data-model.copy-id')}
              badgeTooltip={t('data-model.verified-description')}
              isLoading={isLoading}
            />
            <Tags tags={dataModel?.tags} />
            <Typography sx={{ mb: 3 }}>
              {isLoading ? <Skeleton width={400} /> : dataModel?.description}
            </Typography>
            <IssueCredentialButton
              hasAnAccountAvailableToIssue={hasAnAccountAvailableToIssue}
              onClickIssueCredential={setOpenCreateCredential}
            />
          </Stack>
        </Stack>
        <Box mt={4}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              px: { xs: 0, md: 4, lg: 6 },
            }}
          >
            <Tabs
              value={selectedIndex}
              onChange={(_, index) => {
                const tab = routesForTabs.at(index);
                if (tab === '') {
                  router.replace(`/model/${dataModel?.id}`, undefined, {
                    shallow: true,
                  });
                } else
                  router.replace(`/model/${dataModel?.id}/${tab}`, undefined, {
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
          <TabPanel tabsId={''} index={0} active>
            <Box mt={2}>{children}</Box>
          </TabPanel>
        </Box>
        <FloatingCta credential={{}} />
      </DashboardTemplate>
    </>
  );
}
