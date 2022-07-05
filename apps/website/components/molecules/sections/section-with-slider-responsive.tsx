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
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });

  return isDesktop ? (
    <SectionWithGrid {...props} />
  ) : (
    <SectionWithSlider {...props} />
  );
}
