import * as React from 'react';
import {
  Html,
  Button,
  Body,
  Container,
  Text,
  Link,
  Preview,
  Img,
  Heading,
} from '@react-email/components';
import { styles, MainLayout, GatewayLogo } from './layout';

type Props = {
  username?: string;
  issuerName?: string;
  issuerUrl?: string;
  credentialName?: string;
  credentialImage?: string;
  credentialUrl?: string;
};

export default function CredentialPublished({
  username = 'Kbooz',
  issuerName = 'Gateway',
  issuerUrl = 'https://mygateway.xyz',
  credentialName = 'Preview Credential',
  credentialImage = 'https://via.placeholder.com/150',
  credentialUrl = 'https://google.com',
}: Props) {
  const previewText = `${issuerName} has published a new credential ${credentialName}`;
  return (
    <MainLayout>
      <Preview>{previewText}</Preview>
      <Container style={styles.mainContainer}>
        <GatewayLogo />
        <Heading style={styles.h1}>Hi {username},</Heading>
        <Text>
          <Link href={issuerUrl} style={styles.link}>
            {issuerName}
          </Link>{' '}
          has published a new credential{' '}
          <Link href={credentialUrl} style={styles.link}>
            {credentialName}
          </Link>
        </Text>
        <Link
          href={credentialUrl}
          style={{ marginBottom: 20, display: 'block' }}
        >
          <Img
            src={credentialImage}
            style={{ width: 200, height: 200 }}
            alt={credentialName}
          />
        </Link>
        <Button href={credentialUrl} style={styles.primaryButton}>
          View credential
        </Button>
      </Container>
    </MainLayout>
  );
}
