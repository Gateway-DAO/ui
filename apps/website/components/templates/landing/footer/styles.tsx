import styled from '@emotion/styled';

import { Box } from '@mui/material';

export const IconContainer = styled(Box)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  cursor: pointe;
  align-items: center;
  background-color: rgba(229, 229, 229, 0.16);
  justify-content: center;
  transition: background-color 250ms ease-in-out;

  &:hover {
    background-color: rgba(229, 229, 229, 0.5);
  }
`;
