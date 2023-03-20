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
  code: string;
  expirationMinutes: number;
};

export default function VerifyEmailCode({
  code = '123456',
  expirationMinutes = 5,
}: Props) {
  const previewText = `Your verification code is ${code}, it will expire in ${expirationMinutes} minutes`;
  return (
    <MainLayout>
      <Preview>{previewText}</Preview>
      <Container style={styles.mainContainer}>
        <GatewayLogo />
        <Heading style={styles.h1}>Verify your email address</Heading>
        <Text>
          Please verify your email address using the code below to complete
          email registration.
        </Text>
        <Text>The code will expire in {expirationMinutes} minutes.</Text>
        <Text
          style={{
            ...styles.link,
            fontSize: 28,
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          {code}
        </Text>
      </Container>
    </MainLayout>
  );
}
