import Badge, { badgeClasses } from '@mui/material/Badge';
import styled from '@mui/system/styled';

export const CenterBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    border-radius: 100%;
    background-color: ${({ theme }) => theme.palette.common.white};
    color: ${({ theme }) => theme.palette.secondary.contrastText};
    width: ${({ theme }) => theme.spacing(2.5)};
    height: ${({ theme }) => theme.spacing(2.5)};
    top: unset;
    bottom: calc(50% - ${({ theme }) => theme.spacing(2.5)});
    right: -10%;
  }
`;
