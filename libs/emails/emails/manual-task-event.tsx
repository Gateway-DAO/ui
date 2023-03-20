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

const manualTaskTitle = (gateName: string, eventType: string) =>
  ({
    send_link: `New link sent on ${gateName}`,
    comment: `New link sent on ${gateName}`,
    approve: `Submission on ${gateName} has been approved`,
    reject: `Submission on ${gateName} has been rejected`,
  }[eventType] ?? `New event on ${gateName}`);

const manualTaskEvent = (eventType: string) =>
  ({
    send_link: `sent a new link on`,
    comment: `sent a new comment on`,
    approve: `has approved your submission on`,
    reject: `has rejected your submission on`,
  }[eventType]);

export default function ManualTaskEvent({
  username = 'kbooz',
  gateId = '1234567890',
  eventType = 'send_link',
  gateName = 'New Gate',
}: Props) {
  const eventTitle = manualTaskTitle(gateName, eventType);
  const eventDescription = manualTaskEvent(eventType);
  const userLink = `https://mygateway.xyz/profile/${username}`;
  const credentialLink = `https://mygateway.xyz/credential/${gateId}`;
  return (
    <MainLayout>
      <Preview>{eventTitle}</Preview>
      <Container style={styles.mainContainer}>
        <GatewayLogo />
        <Heading style={styles.h1}>{eventTitle}</Heading>
        <Text>
          <Link href={userLink} style={styles.link}>
            @{username}
          </Link>{' '}
          {eventDescription}{' '}
          <Link href={credentialLink} style={styles.link}>
            {gateName}
          </Link>
        </Text>
        <Button href={credentialLink} style={styles.primaryButton}>
          Check credential progress
        </Button>
      </Container>
    </MainLayout>
  );
}
