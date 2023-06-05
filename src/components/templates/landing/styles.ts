import styled from '@emotion/styled';

export const LandingTitleLimiter = styled.span`
  display: inline-block;
  max-width: 664px;
`;

export const ResponsiveImage = styled.img`
  max-width: 100%;
  height: auto;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const DEFAULT_MAX_WIDTH = '1152px';
export const DEFAULT_PADDINGX = '9.7%';
