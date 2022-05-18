import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Button, Avatar } from '@mui/material';

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
      <div className="cover">
        <div className="avatar">
          <Avatar
            src="/images/random-nft.png"
            sx={{ width: 100, height: 100 }}
          />
        </div>
        <div className="menu">
          <Avatar src="/images/random-nft.png" sx={{ width: 30, height: 30 }} />
          <ArrowDropDownIcon />
        </div>
      </div>
      <header>
        <div className="links">
          <EmailIcon />
          <GitHubIcon />
          <TwitterIcon />
          <DiscordIcon fontSize="large" />
          <Button variant="contained" color="secondary">
            nossirah.eth
            <ContentCopyIcon />
          </Button>
        </div>
        <div className="infos">
          <h1>Shriram Chandra</h1>
          <p>Master Ops at Gateway</p>
          <p>
            <b>120</b> Following &#183; <b>118</b> Followers
          </p>
        </div>
      </header>
      <main>
        <div className="left">
          <section className="about">
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
          <section className="poc">
            <h2>Proof of Credentials</h2>
            <Button variant="contained">Create a Proof of Credential</Button>
          </section>
        </div>
        <div className="right">
          <section className="skills">
            <h2>Skills</h2>
            <div className="tags-container">
              {data.skills.map((skill, index) => {
                return (
                  <Button key={index} variant="contained" color="secondary">
                    {skill}
                  </Button>
                );
              })}
            </div>
          </section>
          <section className="knowledge">
            <h2>Knowledges</h2>
            <div className="tags-container">
              {data.knowledges.map((skill, index) => {
                return (
                  <Button key={index} variant="contained" color="secondary">
                    {skill}
                  </Button>
                );
              })}
            </div>
          </section>
          <section className="attitudes">
            <h2>Attitudes</h2>
            <div className="tags-container">
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
