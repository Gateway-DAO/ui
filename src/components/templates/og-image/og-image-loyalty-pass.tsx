import {
  LOYALTY_PASSES_BG_COLORS,
  LOYALTY_PASSES_TEXT_COLORS,
} from '@/utils/loyalty-pass/colors';

type Props = {
  origin: string;
  daoName: string;
  daoImage: string;
  title: string;
  gatewayId: string;
  tier: string;
  image: string;
  qrCode: string;
};

const getBgColour = (tier: string) => {
  if (tier === 'Basic')
    return {
      bgColor: LOYALTY_PASSES_BG_COLORS.basic,
      textColor: LOYALTY_PASSES_TEXT_COLORS.black,
    };
  if (tier === 'Bronze')
    return {
      bgColor: LOYALTY_PASSES_BG_COLORS.bronze,
      textColor: LOYALTY_PASSES_TEXT_COLORS.black,
    };
  if (tier === 'Silver')
    return {
      bgColor: LOYALTY_PASSES_BG_COLORS.silver,
      textColor: LOYALTY_PASSES_TEXT_COLORS.black,
    };
  if (tier === 'Gold')
    return {
      bgColor: LOYALTY_PASSES_BG_COLORS.gold,
      textColor: LOYALTY_PASSES_TEXT_COLORS.black,
    };
  if (tier === 'Platinum')
    return {
      bgColor: LOYALTY_PASSES_BG_COLORS.platinum,
      textColor: LOYALTY_PASSES_TEXT_COLORS.white,
    };
  if (tier === 'Tungsten')
    return {
      bgColor: LOYALTY_PASSES_BG_COLORS.tungsten,
      textColor: LOYALTY_PASSES_TEXT_COLORS.white,
    };
  return {
    bgColor: LOYALTY_PASSES_BG_COLORS.basic,
    textColor: LOYALTY_PASSES_TEXT_COLORS.black,
  };
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
  daoImage,
  title,
  gatewayId,
  tier,
  image,
  qrCode
}: Props) {
  const words = title.split(' ');
  const hasMoreThan2Words = title.split(' ').length > 2;
  const { bgColor, textColor } = getBgColour(tier);

  return (
    <div
      style={{
        background: bgColor,
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
          <div style={{ display: "flex", gap: "11px", justifyContent: "center", flexDirection: "row", alignItems: "center", marginLeft: '20px', marginTop: '20px' }}>
            <img src={daoImage} alt={daoName} height="35px" style={{ borderRadius: "50%"}} />
            <span
            style={{
              fontWeight: '400',
              fontSize: '19px',
              letterSpacing: '0.12px',
              color: textColor,
            }}
          >
            {daoName}
          </span>
          </div>
          <span style={{
            fontWeight: '400',
            background: 'rgba(255, 255, 255, 0.1)',
            fontSize: '20px',
            letterSpacing: '0.078px',
            lineHeight: '14px',
            color: textColor,
            display: 'flex',
            borderRadius: '20px',
            marginTop: '20px',
            marginRight: '15px',
            padding: '8px 22px 12px',
          }}>
          {'@' + gatewayId}
          </span>
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
                  height: hasMoreThan2Words ? '130px' : '80px',
                  background: bgColor,
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
                    color: textColor,
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
                      color: textColor,
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
                  color: textColor,
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
                  color: textColor,
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