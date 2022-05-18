import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Button, Avatar, Paper, Box } from '@mui/material';

import DiscordIcon from '../../molecules/discord-icon';

const data = {
  skills: [
    'UX Design',
    'UI Design',
    'Branding',
    'Product Strategy',
    'Product Design',
  ],
  knowledges: ['Web3', 'Blockchain', 'Cryptocurrency', 'Business Development'],
  attitudes: [
    'Pro-Active',
    'Business Driven',
    'Collaborative',
    'Leadership',
    'Innovative',
  ],
};

export function ProfileTemplate() {
  return (
    <>
      <Paper
        sx={{
          height: '280px',
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 44.13%), linear-gradient(72.04deg, #98CEFF 6.5%, #8965D2 47.65%)',
          backdropFilter: 'blur(40px)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            position: 'absolute',
            top: '40px',
            right: '50px',
          }}
        >
          <Avatar
            src="/images/random-nft.png"
            sx={{
              width: 30,
              height: 30,
            }}
          />
          <ArrowDropDownIcon
            sx={{ position: 'relative', right: '10px', top: '5px' }}
          />
        </Box>
        <Avatar
          src="/images/random-nft.png"
          sx={{
            width: 150,
            height: 150,
            top: '200px',
            left: '50px',
            border: '3px solid black',
          }}
        />
      </Paper>
      <header>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            marginTop: '30px',
            marginRight: '50px',
          }}
        >
          <EmailIcon sx={{ marginRight: '10px' }} />
          <GitHubIcon sx={{ marginRight: '10px' }} />
          <TwitterIcon sx={{ marginRight: '10px' }} />
          <DiscordIcon sx={{ marginRight: '10px' }} fontSize="large" />
          <Button variant="contained" color="secondary">
            nossirah.eth
            <ContentCopyIcon sx={{ marginLeft: '10px' }} />
          </Button>
        </Box>
      </header>
      <main style={{ padding: '0 50px' }}>
        <div>
          <h1 style={{ marginBottom: '0' }}>Shriram Chandra</h1>
          <p style={{ marginTop: '0' }}>Master Ops at Gateway</p>
          <p>
            <b>120</b> Following &#183; <b>118</b> Followers
          </p>
        </div>
        <div>
          <section>
            <h2>About</h2>
            <p>
              I am a Design Director focused on User Experience, User
              Interfaces, Experience Design, Creative and Digital Strategy.
              I&#39;ve been lucky enough to work and solve problems for the most
              prominent brands in the world.
            </p>
            <p>
              I approach problems from the top-down, identifying the real issue
              before forming my solution. I am always challenging the limits of
              physical, social, and digital mediums through storytelling and
              functions. Each of my projects is crafted with precise execution
              and carefully considered decision making.
            </p>
          </section>
          <section>
            <h2>Proof of Credentials</h2>
            <Button variant="contained">Create a Proof of Credential</Button>
          </section>
        </div>
        <div>
          <section>
            <h2>Skills</h2>
            <div>
              {data.skills.map((skill, index) => {
                return (
                  <Button key={index} variant="contained" color="secondary">
                    {skill}
                  </Button>
                );
              })}
            </div>
          </section>
          <section>
            <h2>Knowledges</h2>
            <div>
              {data.knowledges.map((skill, index) => {
                return (
                  <Button key={index} variant="contained" color="secondary">
                    {skill}
                  </Button>
                );
              })}
            </div>
          </section>
          <section>
            <h2>Attitudes</h2>
            <div>
              {data.attitudes.map((skill, index) => {
                return (
                  <Button key={index} variant="contained" color="secondary">
                    {skill}
                  </Button>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
