import * as React from 'react';
import {
  Button,
  Container,
  Text,
  Link,
  Preview,
  Hr,
  Heading,
} from '@react-email/components';
import { styles, MainLayout, GatewayLogo } from './layout';

type Props = {
  username: string;
  wallet: string;
};

export default function WelcomeUser({
  username = 'kbooz',
  wallet = '0x1234567890',
}: Props) {
  const previewText = `Welcome to Gateway, ${username}!`;
  const link = `https://mygateway.xyz/profile/${username}`;
  const editLink = `https://www.mygateway.xyz/settings/public-profile`;
  return (
    <MainLayout>
      <Preview>{previewText}</Preview>
      <Container style={styles.mainContainer}>
        <GatewayLogo />
        <Heading style={styles.h1}>Hi {username}, welcome to Gateway!</Heading>
        <Text>
          Gateway is a credential protocol helping organizations and
          professionals build their web3 resume. Born in Web3, Gateway puts your
          data and experience in your control.
        </Text>
        <Hr style={styles.hr} />
        <Text style={styles.multilineText}>
          Your Gateway ID is{' '}
          <Link href={link} style={styles.link}>
            @{username}
          </Link>{' '}
          and your url is:
        </Text>
        <Text style={styles.multilineText}>
          <Link href={link} style={styles.link}>
            {link}
          </Link>
        </Text>
        <Text style={{ ...styles.copyrightText }}>
          Wallet address: {wallet}
        </Text>
        <Button href={editLink} style={styles.primaryButton}>
          View profile
        </Button>
      </Container>
    </MainLayout>
  );
}
