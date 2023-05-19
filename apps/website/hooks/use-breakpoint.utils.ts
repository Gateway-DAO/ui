import { BreakpointsValue, theme } from '@gateway/theme';

import { Breakpoint } from '@mui/system';

/** Port of util file from @chakra-ui/media-query to Mui  */
export function getClosestValue<T = any>(
  values: BreakpointsValue<T>,
  breakpoint: Breakpoint,
  breakpoints = theme.breakpoints.keys
) {
  let index = Object.keys(values).indexOf(breakpoint);

  if (index !== -1) {
    return values[breakpoint];
  }

  let stopIndex = breakpoints.indexOf(breakpoint);

  while (stopIndex >= 0) {
    const key = breakpoints[stopIndex];

    if (values[key] != null) {
      index = stopIndex;
      break;
    }
    stopIndex -= 1;
  }

  if (index !== -1) {
    const key = breakpoints[index];
    return values[key];
  }

  return undefined;
}
