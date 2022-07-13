import Image from 'next/image';

import styled from '@emotion/styled';

export const LandingTitleLimiter = styled.span`
  display: inline-block;
  max-width: 664px;
`;

export const ResponsiveImage = styled(Image)`
  max-width: 100%;
  height: auto;
`;

export const DEFAULT_MAX_WIDTH = '1440px';
export const DEFAULT_PADDINGX = '9.7%';
