import { Stack, Typography } from "@mui/material";
import { AccountsCard } from "./../../../../components/molecules/accounts-card";
import useTranslation from "next-translate/useTranslation";
import { FaTwitter } from "react-icons/fa";
import { AiFillGithub } from 'react-icons/ai';
import { connectionHandlerTwitter } from "./connectors/twitter-connection";
import { connectionHandlerGithub } from "./connectors/github-connection";

const ConnectedAccountsSettings = () => {
  const { t } = useTranslation('settings');
  const twitterConnection = connectionHandlerTwitter();
  const githubConnection = connectionHandlerGithub();

  return (
    <Stack>
      <Stack sx={{ width: '100%', mb: 5 }}>
        <Typography variant="h6" sx={{ mb: '4px' }}>{t('nav.connected-accounts-title')}</Typography>
        <Typography variant="body2" fontSize="12px">{t('connected-accounts.description')}</Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          flexWrap: 'wrap'
        }}
      >
        <AccountsCard
          id="twitter"
          title="Twitter"
          description="Connect your account to claim credentials with follow profile, retweet and post a tweet requirements."
          icon={<FaTwitter fontSize="20px" />}
          connectHandler={twitterConnection}
        />
        <AccountsCard
          id="github"
          title="Github"
          description="Connect your account to claim credentials with repository contribution and pull requests requirements."
          icon={<AiFillGithub fontSize="20px" />}
          connectHandler={githubConnection}
        />
      </Stack>
    </ Stack>
  );
};

export default ConnectedAccountsSettings;
