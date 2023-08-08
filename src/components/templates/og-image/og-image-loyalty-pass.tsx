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
const IssuerRecipientBox = ({
  issuer,
  recipient,
  origin,
}: {
  issuer: string;
  recipient: string;
  origin: string;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        borderRadius: '28px',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '2px solid rgba(229, 229, 229, 0.12)',
        padding: '52px 13px',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '23px',
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
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '185px',
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
        style={{
          margin: '0 15px',
        }}
      />
      <div
        style={{
          display: 'flex',
          gap: '23px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
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
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '185px',
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
  );
};

const ImageQRCodeBox = ({
  image,
  qrCode,
}: {
  image?: string;
  qrCode: string;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        paddingRight: '45px',
        gap: '15px',
        justifyContent: 'flex-end',
      }}
    >
      {image && (
        <img
          src={image}
          width="185px"
          height="185px"
          alt="Credential image"
          style={{
            borderRadius: '28px',
          }}
        />
      )}
      {qrCode && (
        <img
          src={qrCode}
          width="185px"
          height="185px"
          alt="QR Code"
          style={{
            borderRadius: '28px',
          }}
        />
      )}
    </div>
  );
};

const TextsBox = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ color: 'rgba(255, 255, 255, .7)', fontSize: '19.8px' }}>
        Credential ID {id}
      </span>
      <span
        style={{
          fontWeight: '700',
          fontSize: '48px',
          letterSpacing: '0.41px',
        }}
      >
        {title}
      </span>
      <span
        style={{
          marginTop: '25px',
          fontWeight: '400',
          fontSize: '26px',
          letterSpacing: '0.25px',
        }}
      >
        {description}
      </span>
    </div>
  );
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
  return (
    <div
      style={{
        background: '#D2D2D2',
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
              width: '74px',
              left: '345px',
              display: 'flex',
            }}
          >
            <span
              style={{
                fontWeight: '400',
                fontSize: '18px',
                letterSpacing: '0.078px',
                lineHeight: '14px',
                color: '#120E0AB2',
                marginLeft: '2px',
                marginRight: '2px',
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
                borderTopLeftRadius: '300px',
                borderTopRightRadius: '300px',
                borderBottomLeftRadius: '5.71px',
                borderBottomRightRadius: '5.71px',
              }}
              alt={title}
              width="537px"
              height="537px"
            />
            <div
              style={{
                display: 'flex',
                position: 'absolute',
                right: '-290px',
              }}
            >
              <div
                style={{
                  width: '300px',
                  height: '80px',
                  background: '#D2D2D2',
                  top: '300px',
                  display: 'flex',
                }}
              >
                <div
                  style={{
                    fontWeight: '700',
                    fontSize: '34.8px',
                    position: 'absolute',
                    color: '#120E0A',

                    letterSpacing: '0.179px',
                    lineHeight: '29.29px',
                  }}
                >
                  {title.slice(0, 20)}
                </div>
                <div
                  style={{
                    fontWeight: '700',
                    fontSize: '34.8px',
                    position: 'absolute',
                    color: '#120E0A',
                    letterSpacing: '0.179px',
                    lineHeight: '29.29px',
                    marginTop: '40px',
                  }}
                >
                  {title.slice(20, 100)}
                </div>
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
                  right: '27px',
                }}
              >
                {tier}
              </div>
            </div>
          </div>
        </LeftColumn>
        <RightColumn mt={485}>
          <img
            src={`${origin}/images/powered-by-gate-badge.png`}
            style={{
              position: 'relative',
              left: '320px',
              display: 'flex',
            }}
            alt="Symbols"
            width="120px"
            height="50px"
          />
        </RightColumn>
      </div>
    </div>
  );
}
