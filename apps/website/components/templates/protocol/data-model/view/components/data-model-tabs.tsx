import { TOKENS } from '@gateway/theme';

import { Box, Tab, Tabs } from '@mui/material';

import { useTab, TabPanel } from '../../../../../atoms/tabs';

type Props = {
  tabs?: any;
};

export default function DataModelTabs({ tabs }: Props) {
  const { activeTab, handleTabChange, setTab } = useTab();

  return (
    <>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          px: TOKENS.CONTAINER_PX,
          mt: 4,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="basic tabs example"
          sx={{
            mb: '-1px',
          }}
        >
          <Tab
            label="Tab 1"
            sx={(theme) => ({
              fontWeight: 700,
              px: 0,
              mr: theme.spacing(3),
            })}
          />
          <Tab
            label="Tab 2"
            sx={(theme) => ({
              fontWeight: 700,
              px: 0,
              mr: theme.spacing(3),
            })}
          />
        </Tabs>
      </Box>
      <TabPanel tabsId="dao" index={1} active={1 === activeTab}>
        Content
      </TabPanel>
    </>
  );
}
