type Props = {
  origin: string;
  daoName: string;
  title: string;
  gatewayId: string;
  tier: string;
  qrCode: string;
  image: string;
};
// http://localhost:4200/api/og-image/loyalty-pass?daoName=Jumper%20excahnge&title=Jumper%20exchange%20loyalty%20pass&gatewayId=h.st&tier=Platinum&recipient=h.st&image=https://v2.mygateway.xyz/images/campaigns/altitude/altitude_marketing_image.png&qrCode=99e9810b-90f9-413a-a8c8-efb35af947cc.png
const getBgColour = (tier: string) => {
  if (tier === 'Baby' || tier === 'Bronze') return '#DDA490';
  else if (tier === 'Silver' || tier === 'Platinum') return '#D2D2D2';
  else if (tier === 'Gold') return '#FFAA29';
  else if (tier.includes('Diamond')) return '#363636';
  return '#DDA490';
};

const LeftColumn = ({
  mt = 35,
  children,
}: {
  mt?: number;
  children: React.ReactElement;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '60%',
        paddingLeft: '45px',
        marginTop: mt + 'px',
        position: 'relative',
      }}
    >
      {children}
    </div>
  );
};

const RightColumn = ({
  children,
  mt = 0,
}: {
  children: React.ReactElement;
  mt?: number;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '60%',
        flexDirection: 'column',
        position: 'relative',
        marginTop: mt + 'px',
      }}
    >
      {children}
    </div>
  );
};
export default function OgImageLoyaltyPass({
  origin,
  daoName,
  title,
  gatewayId,
  tier,
  qrCode,
  image,
}: Props) {
  console.log(daoName, title, gatewayId, tier, qrCode, image);
  const hasMoreThan2Words = title.split(' ').length > 2;
  const words = title.split(' ');
  return (
    <div
      style={{
        background: getBgColour(tier),
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff',
        fontFamily: '"PlusJakartaRegular"',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <LeftColumn mt={20}>
          <span
            style={{
              fontWeight: '400',
              fontSize: '18px',
              letterSpacing: '0.12px',
              color: '#120E0AB2',
              right: '20px',
            }}
          >
            {daoName}
          </span>
        </LeftColumn>
        <RightColumn mt={20}>
          <button
            style={{
              background: '#FFFFFF2E',
              borderRadius: '20px',
              width: gatewayId.length * 16 + 'px',
              left: '315px',
              display: 'flex',
            }}
          >
            <span
              style={{
                fontWeight: '400',
                fontSize: '16px',
                letterSpacing: '0.078px',
                lineHeight: '14px',
                color: '#120E0AB2',

                padding: '8px',
              }}
            >
              {'@' + gatewayId}
            </span>
          </button>
        </RightColumn>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <RightColumn mt={25}>
          <>
            <img
              src={image}
              style={{
                position: 'absolute',
                left: '320px',
                display: 'flex',

                borderRadius: '50% 50% 0 0',
              }}
              alt={title}
              width="537px"
              height="537px"
            />
            <div
              style={{
                display: 'flex',
                position: 'absolute',
                right: '-305px',
              }}
            >
              <div
                style={{
                  width: '300px',
                  height: hasMoreThan2Words ? '90px' : '45px',
                  background: getBgColour(tier),
                  top: '280px',
                  display: 'flex',
                  borderRadius: '12px',
                }}
              >
                <div
                  style={{
                    fontWeight: '700',
                    fontSize: '34.8px',
                    position: 'absolute',
                    color: '#120E0A',
                    padding: '8px',

                    letterSpacing: '0.179px',
                    lineHeight: '29.29px',
                  }}
                >
                  {words[0] + ' ' + words[1]}
                </div>
                {hasMoreThan2Words && (
                  <div
                    style={{
                      fontWeight: '700',
                      fontSize: '34.8px',
                      position: 'absolute',
                      color: '#120E0A',
                      letterSpacing: '0.179px',
                      lineHeight: '29.29px',
                      marginTop: '40px',
                      padding: '8px',
                    }}
                  >
                    {words[2] + ' ' + words[3]}
                  </div>
                )}
              </div>
            </div>
          </>
        </RightColumn>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <LeftColumn mt={485}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '100%',
                gap: '15px',
                marginTop: '-270px',
                right: '27px',
              }}
            >
              {qrCode && (
                <img
                  src={qrCode}
                  width="170px"
                  height="170px"
                  alt="QR Code"
                  style={{
                    borderRadius: '28px',
                  }}
                />
              )}
            </div>
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  fontWeight: '400',
                  fontSize: '16px',
                  color: 'rgba(18, 14, 10, 0.70);',
                  lineHeight: '14.29px',
                  position: 'relative',
                  top: '-25px',
                  letterSpacing: '0.121px',
                  right: '25px',
                }}
              >
                Tier
              </div>
              <div
                style={{
                  fontWeight: '700',
                  fontSize: '34.8px',
                  color: '#120E0A',
                  position: 'relative',
                  letterSpacing: '0.179px',
                  lineHeight: '29.29px',
                  right: '55px',
                }}
              >
                {tier}
              </div>
            </div>
          </div>
        </LeftColumn>
        <RightColumn mt={485}>
          <div
            style={{
              display: 'flex',
              position: 'absolute',
            }}
          >
            <div
              style={{
                width: '160px',
                height: '50px',
                background: '#120E0A',
                position: 'relative',
                left: '280px',
                display: 'flex',
                borderRadius: '12px',
              }}
            >
              <div
                style={{
                  fontWeight: '400',
                  fontSize: '12.8px',
                  position: 'absolute',
                  color: '#FFFFFF',
                  letterSpacing: '0.179px',
                  lineHeight: '7.01px',
                  marginTop: '9px',
                  left: '46px',
                }}
              >
                Powered by
              </div>
              <div
                style={{
                  fontWeight: '700',
                  fontSize: '20px',
                  position: 'absolute',
                  color: '#FFFFFF',
                  letterSpacing: '0.179px',
                  lineHeight: '10.29px',
                  marginTop: '24.6px',
                  left: '46px',
                }}
              >
                Gateway
              </div>
              <img
                src={`${origin}/logo.png`}
                style={{
                  display: 'flex',
                  borderRadius: '12px',
                }}
                alt="Symbols"
                width="45px"
                height="45px"
              />
            </div>
          </div>
        </RightColumn>
      </div>
    </div>
  );
}
