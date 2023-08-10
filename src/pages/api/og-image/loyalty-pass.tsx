// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest } from 'next/server';

import OgImage from '@/components/templates/og-image/og-image';
import { ImageResponse } from '@vercel/og';
import OgImageLoyaltyPass from '@/components/templates/og-image/og-image-loyalty-pass';

export const config = {
  runtime: 'experimental-edge',
};

const fontRegular = fetch(
  new URL('../../../assets/fonts/PlusJakartaSans-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

const fontBold = fetch(
  new URL('../../../assets/fonts/PlusJakartaSans-Bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

const handler = async (req: NextRequest) => {
  const fontRegularData = await fontRegular;
  const fontBoldData = await fontBold;

  const { searchParams } = new URL(req.url);
  const origin = req.nextUrl.origin;

  const hasdaoName = searchParams.has('daoName');
  const daoName = hasdaoName
    ? searchParams.get('daoName')?.slice(0, 100)
    : 'Dao Name';

  const hasTitle = searchParams.has('title');
  const title = hasTitle
    ? searchParams.get('title')?.slice(0, 100)
    : 'Credential Title';

  const hasgatewayId = searchParams.has('gatewayId');
  const gatewayId = hasgatewayId
    ? searchParams.get('gatewayId')?.slice(0, 100)
    : 'Gateway Id';

  const hasTier = searchParams.has('tier');
  const tier = hasTier ? searchParams.get('tier')?.slice(0, 100) : 'tier';

  const hasQRCode = searchParams.has('qrCode');

  const qrCode = hasQRCode ? searchParams.get('qrCode') : null;
  const hasImage = searchParams.has('image');
  const image = hasImage ? searchParams.get('image')?.slice(0, 100) : null;
  return new ImageResponse(
    (
      <OgImageLoyaltyPass
        origin={origin}
        daoName={daoName}
        title={title}
        gatewayId={gatewayId}
        tier={tier}
        qrCode={qrCode}
        image={image}
      />
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'PlusJakartaRegular',
          data: fontRegularData,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'PlusJakartaRegular',
          data: fontBoldData,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );
};

export default handler;
