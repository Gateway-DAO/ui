// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest } from 'next/server';

import OgImage from '@/components/templates/og-image/og-image';
import { ImageResponse } from '@vercel/og';

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

  const hasDate = searchParams.has('issuanceDate');
  const issuanceDate = hasDate
    ? searchParams.get('issuanceDate')?.slice(0, 100)
    : '00/00/00, 00:00 am';

  const hasQRCode = searchParams.has('qrCode');

  const qrCode = hasQRCode
    ? `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${searchParams
        .get('qrCode')
        ?.slice(0, 100)}`
    : null;

  const hasImage = searchParams.has('image');
  const image = hasImage ? searchParams.get('image')?.slice(0, 100) : null;
  return new ImageResponse(
    (
      <OgImage
        origin={origin}
        id={id}
        title={title}
        description={description}
        issuer={issuer}
        recipient={recipient}
        issuanceDate={issuanceDate}
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
