import { useMediaQuery, useTheme } from '@mui/material';

import { SectionWithGridProp, SectionWithGrid } from './section-with-grid';
import {
  SectionWithSliderProps,
  SectionWithSlider,
} from './section-with-slider';

type SectionWithSliderResponsiveProps = SectionWithGridProp &
  SectionWithSliderProps;

export function SectionWithSliderResponsive(
  props: SectionWithSliderResponsiveProps
) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  return isMobile ? (
    <SectionWithSlider {...props} />
  ) : (
    <SectionWithGrid {...props} />
  );
}
