type Props = {
  origin: string;
  daoName: string;
  title: string;
  gatewayId: string;
  tier: string;
  image: string;
};
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
  image,
}: Props) {
  const words = title.split(' ');
  const hasMoreThan2Words = title.split(' ').length > 2;
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
              fontSize: '19px',
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
              width: gatewayId.length * 15 + 'px',
              left: '315px',
              display: 'flex',
            }}
          >
            <span
              style={{
                fontWeight: '400',
                fontSize: '20px',
                letterSpacing: '0.078px',
                lineHeight: '14px',
                color: '#120E0AB2',

                padding: '10px',
              }}
            >
              {'@' + gatewayId}
            </span>
          </button>
        </RightColumn>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <RightColumn mt={1}>
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
              width="556px"
              height="556px"
            />
            <div
              style={{
                display: 'flex',
                position: 'absolute',
                right: '-450px',
              }}
            >
              <div
                style={{
                  width: '444px',
                  height: hasMoreThan2Words ? '130px' : '60px',
                  background: getBgColour(tier),
                  top: '240px',
                  display: 'flex',
                  borderRadius: '12px',
                }}
              >
                <div
                  style={{
                    fontWeight: '700',
                    fontSize: '47.8px',
                    position: 'absolute',
                    color: '#120E0A',
                    padding: '15px',
                    marginTop: '5px',
                    letterSpacing: '0.179px',
                    lineHeight: '29.29px',
                    display: 'flex',
                  }}
                >
                  {words[0] === undefined ? '' : words[0]}{' '}
                  {words[1] === undefined ? '' : words[1]}
                </div>
                {hasMoreThan2Words && (
                  <div
                    style={{
                      fontWeight: '700',
                      fontSize: '47.8px',
                      position: 'absolute',
                      color: '#120E0A',
                      letterSpacing: '0.179px',
                      lineHeight: '29.29px',
                      marginTop: '63px',
                      padding: '15px',
                      display: 'flex',
                    }}
                  >
                    {words[2] === undefined ? '' : words[2]}{' '}
                    {words[3] === undefined ? '' : words[3]}
                  </div>
                )}
              </div>
            </div>
          </>
        </RightColumn>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <LeftColumn mt={512}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  fontWeight: '400',
                  fontSize: '19px',
                  color: 'rgba(18, 14, 10, 0.70);',
                  lineHeight: '14.29px',
                  position: 'relative',
                  top: '-25px',
                  letterSpacing: '0.121px',
                  right: '23px',
                }}
              >
                Tier
              </div>
              <div
                style={{
                  fontWeight: '700',
                  fontSize: '47.8px',
                  color: '#120E0A',
                  position: 'relative',
                  letterSpacing: '0.179px',
                  lineHeight: '29.29px',
                  right: '58px',
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
                width: '180px',
                height: '70px',
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
                  marginTop: '19px',
                  left: '56px',
                }}
              >
                Powered by
              </div>
              <div
                style={{
                  fontWeight: '700',
                  fontSize: '22px',
                  position: 'absolute',
                  color: '#FFFFFF',
                  letterSpacing: '0.179px',
                  lineHeight: '10.29px',
                  marginTop: '37px',
                  left: '56px',
                }}
              >
                Gateway
              </div>
              <img
                src={`${origin}/logo.png`}
                style={{
                  display: 'flex',
                  borderRadius: '12px',
                  marginTop: '7.5px',
                  left: '4px',
                }}
                alt="Symbols"
                width="50px"
                height="50px"
              />
            </div>
          </div>
        </RightColumn>
      </div>
    </div>
  );
}
