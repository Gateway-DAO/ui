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
              background: 'rgba(255, 255, 255, 0.05)',
              border: '2px solid rgba(229, 229, 229, 0.12)',
            }}
          >
            <div>coluna 1</div>
            <div>seta</div>
            <div>coluna 2</div>
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
      height: 600,
    }
  );
};

export default handler;

// export default function () {
//   return new ImageResponse(
//     (
//       <div
//         style={{
//           fontSize: 128,
//           background: 'white',
//           width: '100%',
//           height: '100%',
//           display: 'flex',
//           textAlign: 'center',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         Hello world!
//       </div>
//     ),
//     {
//       width: 1200,
//       height: 600,
//     }
//   );
// }
