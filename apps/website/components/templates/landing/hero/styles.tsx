import Image from 'next/future/image';

import styled from '@emotion/styled';

export const HeroBackground = styled(Image)`
  position: absolute;
  bottom: 0;
  right: 0;

  @media screen and (max-width: 768px) {
    height: 70%;
    width: auto;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;
