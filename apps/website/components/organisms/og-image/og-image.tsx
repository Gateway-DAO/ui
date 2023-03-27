type Props = {
  origin: string;
  id: string;
  title: string;
  description: string;
  issuer: string;
  recipient: string;
  qrCode: string;
  issuanceDate: string;
  image?: string;
};

export default function OgImage({
  origin,
  id,
  title,
  description,
  issuer,
  recipient,
  qrCode,
  image,
  issuanceDate,
}: Props) {
  return (
    <div
      style={{
        background: '#10041C',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff',
        fontFamily: '"PlusJakartaRegular"',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '60%',
            paddingLeft: '45px',
            marginTop: '68px',
          }}
        >
          <span
            style={{ color: 'rgba(255, 255, 255, .7)', fontSize: '19.8px' }}
          >
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
        <div
          style={{
            display: 'flex',
            width: '40%',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            position: 'relative',
          }}
        >
          <img
            src={`${origin}/images/share-top.png`}
            style={{
              position: 'relative',
              left: '100px',
              display: 'flex',
            }}
            alt="Symbols"
            width="350px"
            height="300px"
          />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '60%',
            paddingLeft: '45px',
            marginTop: '35px',
          }}
        >
          <div
            style={{
              display: 'flex',
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
        <div
          style={{
            display: 'flex',
            width: '40%',
            flexDirection: 'column',
            marginTop: '35px',
          }}
        >
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
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '60%',
            paddingLeft: '45px',
            marginTop: '75px',
            position: 'relative',
          }}
        >
          <span
            style={{
              fontWeight: '400',
              fontSize: '19.8px',
              color: 'rgba(255, 255, 255, .7)',
              position: 'relative',
              top: '-55px',
            }}
          >
            Issuance date {issuanceDate}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            width: '40%',
            flexDirection: 'column',
            position: 'relative',
            marginTop: '75px',
          }}
        >
          <img
            src={`${origin}/images/share-bottom.png`}
            alt="Symbol"
            width="90px"
            height="80px"
            style={{
              position: 'absolute',
              bottom: '-15px',
              right: '0',
            }}
          />
        </div>
      </div>
    </div>
  );
}
