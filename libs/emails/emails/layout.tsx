import * as React from 'react';

import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Img,
} from '@react-email/components';

import { theme } from '@gateway/theme';


export const styles = {
  body: {
    backgroundColor: theme?.palette?.background?.default,
    fontFamily: 'sans-serif',
    paddingTop: 100,
  },
  mainLogo: {
    marginBottom: 20,
    display: 'block',
  },
  h1: {
    fontSize: 24,
  },
  multilineText: {
    margin: '8px 0',
  },
  primaryButton: {
    backgroundColor: theme?.palette?.primary?.main,
    color: theme?.palette?.primary?.contrastText,
    borderRadius: 32,
    width: '100%',
    padding: '10px 0',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    display: 'block',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    border: `2px solid ${theme?.palette?.primary?.main}`,
    color: theme?.palette?.primary?.main,
    borderRadius: 32,
    width: '100%',
    padding: '10px 0',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    display: 'block',
  },
  mainContainer: {
    padding: '20px 25px',
    borderWidth: 1,
    borderColor: '#342a3e',
    borderStyle: 'solid',
    backgroundColor: '#1c1127',
    color: theme?.palette?.primary?.contrastText,
  },
  socialContainer: {
    padding: '20px 25px 0',
    marginTop: 40,
  },
  copyrightContainer: {
    padding: '20px 25px',
  },
  copyrightText: {
    color: '#aaaaaa',
  },
  footerText: {
    color: '#6f6f6f',
  },
  link: {
    color: theme?.palette?.primary?.main,
  },
  hr: {
    borderTopColor: '#342a3e',
  },
  socialImage: {
    width: 40,
    height: 40,
    display: 'inline-block',
  },
// eslint-disable-next-line prettier/prettier
} satisfies Record<string, React.CSSProperties>;

export function GatewayLogo() {
  return (
    <Link href="https://mygateway.xyz" style={styles.mainLogo}>
      <Img
        src="https://ipfs.filebase.io/ipfs/QmeZvCQne4LjFpPCzo5mRvM84YDsZAoXoQZoy7zEuLToAs"
        alt="Gateway"
      />
    </Link>
  );
}

export function MainLayout({ children }: React.PropsWithChildren<unknown>) {
  return (
    <Html lang="en">
      <Body style={styles.body}>
        {children}
        <Container style={styles.socialContainer}>
          <Link href="https://mygateway.xyz">
            <Img
              src="https://ipfs.filebase.io/ipfs/QmW7V5C3KLpaNnweEGVbyC4pq6u7oeRfc6qbPEvyrqVc69"
              alt="Gateway"
            />
          </Link>
          <ul style={{ padding: 0, margin: '25px 0 0' }}>
            <li style={{ display: 'inline', marginRight: '8px' }}>
              <Link href="https://discord.gg/gCkQmQ6v">
                <Img
                  src="https://ipfs.filebase.io/ipfs/QmWrSYRoBWGgrvwZ4VmbMsCSWfh1xtEUjCCzqC6WZ2zWso"
                  style={styles.socialImage}
                  alt="Discord"
                />
              </Link>
            </li>
            <li style={{ display: 'inline', marginRight: '8px' }}>
              <Link href="https://www.linkedin.com/company/mygateway/">
                <Img
                  src="https://ipfs.filebase.io/ipfs/Qmcz3D1xmU16aQq4vWdsdsEEcA7QXLTDQ5nBBuBUji6srE"
                  style={styles.socialImage}
                  alt="LinkedIn"
                />
              </Link>
            </li>
            <li style={{ display: 'inline', marginRight: '8px' }}>
              <Link href="#">
                <Img
                  src="https://ipfs.filebase.io/ipfs/QmfMbY3EBEpA2aor4hHkb1PVe3N5FmPpdwSxUn5VzNqkjB"
                  style={styles.socialImage}
                  alt="Medium"
                />
              </Link>
            </li>
            <li style={{ display: 'inline', marginRight: '8px' }}>
              <Link href="https://github.com/Gateway-DAO">
                <Img
                  src="https://ipfs.filebase.io/ipfs/QmdixU7nSBWuVpRQWPXVXc9yVNjTkhHbCrfTWeQdM3iqMx"
                  style={styles.socialImage}
                  alt="GitHub"
                />
              </Link>
            </li>
            <li style={{ display: 'inline', marginRight: '8px' }}>
              <Link href="https://twitter.com/gateway_xyz">
                <Img
                  src="https://ipfs.filebase.io/ipfs/QmeEYwf7sTX82TmjTGvJXkB3Gyr5poVzUfePR2VQr37jqH"
                  alt="Twitter"
                  style={styles.socialImage}
                />
              </Link>
            </li>
          </ul>
        </Container>
        <Container style={styles.copyrightContainer}>
          <Text style={styles.copyrightText}>
            Copyright © 2022 Gateway. All rights reserved.
          </Text>
          <Text style={styles.footerText}>
            Gateway is a credential protocol helping organizations and
            professionals build their web3 resume. Born in Web3, Gateway putts
            your data and experience in your control.
          </Text>
          <Text style={styles.footerText}>
            <Link href="https://google.com" style={styles.link}>
              Unsubscribe?
            </Link>{' '}
            You’re receiving this notification from Gateway to keep you up to
            date on organizations you follow.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default function PreviewMainLayout() {
  return (
    <MainLayout>
      <Container style={styles.mainContainer}>
        <GatewayLogo />
        <Text>Preview</Text>
      </Container>
    </MainLayout>
  );
}
