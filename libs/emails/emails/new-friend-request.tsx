import * as React from 'react';
import {
  Button,
  Container,
  Text,
  Link,
  Preview,
  Heading,
} from '@react-email/components';
import { styles, MainLayout, GatewayLogo } from './layout';

type Props = {
  username: string;
  gateId: string;
  gateName: string;
  eventType: string;
};

export default function NewFriendRequest({
  username = 'kbooz',
  gateId = '1234567890',
  eventType = 'send_link',
  gateName = 'New Gate',
}: Props) {
  const preview = `New friend request from @${username}`;
  const userLink = `https://mygateway.xyz/profile/${username}`;
  const acceptLink = `https://mygateway.xyz/home`;
  return (
    <MainLayout>
      <Preview>{preview}</Preview>
      <Container style={styles.mainContainer}>
        <GatewayLogo />
        <Heading style={styles.h1}>{preview}</Heading>
        <Button href={acceptLink} style={styles.primaryButton}>
          Accept Request
        </Button>
        <Link
          href={userLink}
          style={{ ...styles.outlineButton, marginTop: 12 }}
        >
          View profile
        </Link>
      </Container>
    </MainLayout>
  );
}
