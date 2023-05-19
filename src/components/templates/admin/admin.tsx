import Link from 'next/link';

import {
  Box,
  Typography,
  ListItem,
  List,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Grid,
  Stack,
  Divider,
  ListItemButton,
} from '@mui/material';

import { useAuth } from '@/providers/auth';
import { Navbar } from '@/components/organisms/navbar';

export function AdminTemplate({ data }) {
  const { me } = useAuth();

  return (
    <>
      <Navbar />
      <Box p={6}>
        <Typography variant="h3">
          Welcome to the Admin Area, {me.name}!
        </Typography>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Grid
            container
            gap={3}
            columns={{ xs: 1, md: 3 }}
            width={{ xs: '100%', md: '50%' }}
            marginTop={5}
          >
            <Grid item xs md>
              <Box
                sx={{
                  borderRadius: 2,
                  p: 2,
                  border: '1px solid rgba(229, 229, 229, 0.12)',
                }}
              >
                <Typography variant="h4">
                  {data.credential_count.aggregate.count}
                </Typography>
                <Typography marginTop={2}>Credential Count</Typography>
              </Box>
            </Grid>
            <Grid item xs={1} md>
              <Box
                sx={{
                  borderRadius: 2,
                  p: 2,
                  border: '1px solid rgba(229, 229, 229, 0.12)',
                }}
              >
                <Typography variant="h4">
                  {data.minted_credential_count.aggregate.count}
                </Typography>
                <Typography marginTop={2}>Minted Credentials</Typography>
              </Box>
            </Grid>
            <Grid item xs md>
              <Box
                sx={{
                  borderRadius: 2,
                  p: 2,
                  border: '1px solid rgba(229, 229, 229, 0.12)',
                }}
              >
                <Typography variant="h4">
                  {data.user_data.aggregate.count}
                </Typography>
                <Typography marginTop={2}>Users Count</Typography>
              </Box>
            </Grid>
            <Grid item xs={1} md={3}>
              <List
                sx={{
                  borderRadius: 2,
                  border: '1px solid rgba(229, 229, 229, 0.12)',
                  bgcolor: 'background.paper',
                }}
              >
                {data.credential_data.length == 0 && (
                  <Typography m={2}>
                    Ser... we don&apos;t have any claimed credentials
                  </Typography>
                )}
                {data.credential_data.map((credential) => {
                  return (
                    <ListItem key={credential.name}>
                      <ListItemAvatar>
                        <Avatar src={credential.gate.image} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="h6">
                            {credential.count}
                          </Typography>
                        }
                        secondary={credential.name}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
          </Grid>
          <Box
            sx={{
              borderRadius: 2,
              border: '1px solid rgba(229, 229, 229, 0.12)',
              marginTop: 5,
            }}
            width={{ xs: '100%', md: '30%' }}
          >
            <Typography variant="h6" m={2}>
              Helpful Central
            </Typography>
            <Divider />
            <List
              sx={{
                p: 2,
              }}
            >
              <ListItem>
                <Link href="/dao/new" passHref>
                  <ListItemButton
                    component="a"
                    sx={{
                      borderRadius: 2,
                    }}
                  >
                    Create DAO (not optimized)
                  </ListItemButton>
                </Link>
              </ListItem>
            </List>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
