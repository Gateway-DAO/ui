import { TOKENS } from '@gateway/theme';
import { Stack, Typography, Divider, Box, Avatar } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MintCard from '../../../../molecules/mint-card';

export default function ExperienceAccordion(props) {
  return (
    <Accordion
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        py: '20px',
        px: TOKENS.CONTAINER_PX,
        '&.MuiAccordion-root:before': {
          backgroundColor: 'transparent',
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon
            sx={{ color: 'rgba(255, 255, 255, 0.56)' }}
          ></ExpandMoreIcon>
        }
        sx={{
          padding: '0!important',
          [`& .MuiAccordionSummary-content`]: {
            justifyContent: 'space-between',
            zIndex: '123',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            columnGap: '16px',
          }}
        >
          <Avatar></Avatar>
          <Box>
            <Typography
              sx={{
                fontWeight: '600',
                fontSize: '16px',
                color: '#fff',
              }}
            >
              {props.title}
            </Typography>
            <Typography
              sx={{
                letterSpacing: '0.4px',
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              {props.date}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            columnGap: '16px',
            marginRight: '26px',
          }}
        >
          <Typography sx={{ color: '#9A53FF' }}>{props.credential}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: '0!important',
          paddingTop: '30px!important',
        }}
      >
        {/*/////////    Dropdown   /////////*/}
        <Stack marginBottom="48px" gap={4}>
          <Typography
            sx={{
              letterSpacing: '0.15px',
              color: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            Designer at Olympus DAO are directly responsible for the quality,
            creativity, and delivery of the projects they are overseeing, along
            with revenue and delivery of the projects they are overseeing, along
            overseeing... See more
          </Typography>
          <Box sx={{
            display:"flex",
            flexDirection:"row",
            columnGap:"16px"
          }}>
            <MintCard
              title="Olympus Odyssey"
              image="https://i.ibb.co/L5sbpKq/Card-Media.png"
              description="This is the beginning of your journey in OlympusDAO. Learn about what..."
              categories={['Onboarding']}
            ></MintCard>
            <MintCard
              title="Design Titans"
              image="https://i.ibb.co/L5sbpKq/Card-Media.png"
              description="This is the beginning of your journey in OlympusDAO. Learn about what..."
              categories={['Onboarding']}
            ></MintCard>
            <MintCard
              title="Olympus Odyssey"
              image="https://i.ibb.co/L5sbpKq/Card-Media.png"
              description="This is the beginning of your journey in OlympusDAO. Learn about what..."
              categories={['Governance']}
            ></MintCard>
          </Box>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
