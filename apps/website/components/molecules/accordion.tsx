import { Stack, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export type AccordionProps = {
  id: string;
  title: string;
  expanded: boolean;
  children: ReactNode;
};

export function Accordion(props: AccordionProps) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(props.expanded);
  }, [props.expanded]);

  return (
    <Stack component="div" id={props.id}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        component="a"
        onClick={(e) => {
          e.preventDefault();
          expanded ? setExpanded(false) : setExpanded(true);
        }}
        sx={{
          py: 2,
          mb: expanded ? 3 : 0,
          cursor: 'pointer',
          transition: 'all .4s ease'
        }}
      >
        <Typography fontSize="16px" fontWeight={600}>{props?.title}</Typography>
        <KeyboardArrowDownIcon sx={{ transform: expanded ? 'rotateX(180deg)' : null, transition: 'all .4s ease' }} />
      </Stack>
      <Stack
        sx={{
          opacity: expanded ? 1 : 0,
          overflow: 'hidden',
          transform: expanded ? 'scaleY(0px)' : 'scaleY(-50px)',
          maxHeight: expanded ? '1000px' : 0,
          transition: 'all .3s cubic-bezier(0,.7,.24,.83) 0s'
        }}
      >
        {props.children}
      </Stack>
    </Stack>
  );
}
