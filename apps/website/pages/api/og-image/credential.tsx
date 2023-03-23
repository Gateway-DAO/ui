import { NextRequest } from 'next/server';

import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'experimental-edge',
};

const handler = (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const origin = req.nextUrl.origin;

  const hasId = searchParams.has('id');
  const id = hasId ? searchParams.get('id')?.slice(0, 100) : '00000000xxx';

  const hasTitle = searchParams.has('title');
  const title = hasTitle
    ? searchParams.get('title')?.slice(0, 100)
    : 'Credential Title';

  const hasDescription = searchParams.has('description');
  const description = hasDescription
    ? searchParams.get('description')?.slice(0, 150)
    : 'Credential description';

  const hasIssuer = searchParams.has('issuer');
  const issuer = hasIssuer
    ? searchParams.get('issuer')?.slice(0, 100)
    : 'issuer';

  const hasRecipient = searchParams.has('recipient');
  const recipient = hasRecipient
    ? searchParams.get('recipient')?.slice(0, 100)
    : 'recipient';
  return new ImageResponse(
    (
      <div
        style={{
          background: '#10041C',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          color: '#fff',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '70%',
            paddingLeft: '45px',
            marginTop: '68px',
          }}
        >
          <span
            style={{ color: 'rgba(255, 255, 255, .7)', fontSize: '19.8px' }}
          >
            Credential ID {id}
          </span>
          <span style={{ fontWeight: '700', fontSize: '48px' }}>{title}</span>
          <span
            style={{ marginTop: '25px', fontWeight: '400', fontSize: '26px' }}
          >
            {description}
          </span>
          <div
            style={{
              display: 'flex',
              marginTop: '95px',
              borderRadius: '28px',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '2px solid rgba(229, 229, 229, 0.12)',
              padding: '52px 26px',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '26px',
                alignItems: 'center',
              }}
            >
              <img
                src={`${origin}/images/avatar-default.png`}
                width="73px"
                height="73px"
                alt="Issuer profile image"
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontWeight: '400',
                    fontSize: '19.8px',
                    color: 'rgba(255, 255, 255, .7)',
                  }}
                >
                  Issuer ID
                </span>
                <span
                  style={{
                    fontWeight: 400,
                    fontSize: '23.1px',
                    color: '#9A53FF',
                  }}
                >
                  {issuer}
                </span>
              </div>
            </div>
            <img
              src={`${origin}/images/arrow-transaction.png`}
              width="28px"
              height="56px"
              alt="arrow transaction"
            />
            <div
              style={{
                display: 'flex',
                gap: '26px',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontWeight: '400',
                    fontSize: '19.8px',
                    color: 'rgba(255, 255, 255, .7)',
                  }}
                >
                  Recipient ID
                </span>
                <span
                  style={{
                    fontWeight: 400,
                    fontSize: '23.1px',
                    color: '#9A53FF',
                  }}
                >
                  {recipient}
                </span>
              </div>
              <img
                src={`${origin}/images/avatar-default.png`}
                width="73px"
                height="73px"
                alt="Recipient profile image"
              />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', width: '30%' }}>
          <img
            src={`${origin}/images/share-top.png`}
            alt="Symbols"
            width="350px"
            height="300px"
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
};

export default handler;
