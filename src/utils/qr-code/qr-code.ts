import { useEffect, useState } from 'react';

import GatewayPixelLogo from './gateway-pixel-logo.png';

export const useCreateQrCode = (url: string = null) => {
  const [qrCode, setQrCode] = useState<string>();

  const qrCodeData = (): string => {
    if (url) {
      return url;
    }
    return typeof window !== 'undefined' ? window?.location?.href : '';
  };

  useEffect(() => {
    const createQrCode = async () => {
      const QRCodeStyling = (await import('qr-code-styling')).default;
      const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        image: GatewayPixelLogo.src,
        data: qrCodeData(),
        margin: 8,
        qrOptions: { typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'Q' },
        imageOptions: { hideBackgroundDots: true, imageSize: 0.65, margin: 0 },
        dotsOptions: { type: 'square', color: '#000000' },
        backgroundOptions: { color: '#ffffff' },
        cornersSquareOptions: { type: 'dot', color: '#000000' },
        cornersDotOptions: { type: 'dot', color: '#000000' },
      });
      const rawData = await qrCode.getRawData('png');
      setQrCode(URL.createObjectURL(rawData));
    };
    if (typeof window !== 'undefined') {
      createQrCode();
    }
  }, []);

  return qrCode;
};