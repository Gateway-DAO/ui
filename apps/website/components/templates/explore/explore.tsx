import { ReactNode, useState } from 'react';

import { TOKENS } from '@gateway/theme';

import { Box, Tabs, Tab, Typography } from '@mui/material';

import { a11yTabProps, TabPanel } from '../../atoms/tab-panel';
import { Navbar } from '../../organisms/navbar/navbar';

type TemplateProps = {
  title: string;
  subtitle: string;
  tabs: Array<{ key: string; label: string; section: ReactNode }>;
};

export function ExploreTemplate({ title, subtitle, tabs }: TemplateProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    setActiveTab(newTab);
  };
  console.log(activeTab);

  return (
    <>
      <Navbar />
      <Box pt={6}>
        <Typography variant="h4" whiteSpace="pre-line" px={TOKENS.CONTAINER_PX}>
          {title}
        </Typography>
        <Typography
          variant="body1"
          whiteSpace="pre-line"
          px={TOKENS.CONTAINER_PX}
        >
          {subtitle}
        </Typography>
      </Box>
      <Box>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            px: TOKENS.CONTAINER_PX,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="basic tabs example"
            sx={{ mb: '-1px' }}
          >
            {tabs.map(({ key, label }, index) => (
              <Tab
                key={key}
                label={label}
                {...a11yTabProps('explore', index)}
              />
            ))}
          </Tabs>
        </Box>
        {tabs.map(({ key, section }, index) => (
          <TabPanel
            key={key}
            tabsId="explore"
            index={index}
            active={index === activeTab}
          >
            {section}
          </TabPanel>
        ))}
      </Box>
    </>
  );
}
