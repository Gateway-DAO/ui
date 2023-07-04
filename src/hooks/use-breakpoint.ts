import { BreakpointsValue } from '@/theme';
import useBreakpointHook from 'use-breakpoint';

import { useTheme } from '@mui/material';
import { Breakpoint } from '@mui/system';

import { getClosestValue } from './use-breakpoint.utils';

type GenericBreakpoints<T> = BreakpointsValue<T> | Array<T | null>;

export function useBreakpoint(
  defaultBreakpoint?: Breakpoint,
  ssrOnlyHydration = false
) {
  const theme = useTheme();
  return useBreakpointHook(
    theme.breakpoints.values,
    defaultBreakpoint,
    ssrOnlyHydration
  );
}

/**
 * @author Lucas Inacio <@kbooz>
 * Port of useBreakpointValue from @chakra/media-query to Mui usage
 * <https://github.com/chakra-ui/chakra-ui/tree/next/packages/media-query>
 *
 * React hook for getting the value for the current breakpoint from the
 * provided responsive values object.
 *
 * @param values
 *
 * For SSR, you can use a package like [is-mobile](https://github.com/kaimallea/isMobile)
 * to get the default breakpoint value from the user-agent
 *
 * @example
 * const width = useBreakpointValue({ base: '150px', md: '250px' }
 */
export function useBreakpointValue<T = any>(
  values: GenericBreakpoints<T>,
  defaultBreakpoint?: Breakpoint,
  ssrOnlyHydration = false
): T | undefined {
  const theme = useTheme();
  const { breakpoint } = useBreakpoint(defaultBreakpoint, ssrOnlyHydration);

  /**
   * Get the sorted breakpoint keys from the provided breakpoints
   */
  const breakpoints = theme.breakpoints.keys;

  /**
   * values array to object with breakpoints as keys
   */
  const valuesObj = Array.isArray(values)
    ? values.reduce(
        (acc, value, index) => ({
          ...acc,
          [breakpoints[index]]: value,
        }),
        {} as BreakpointsValue<T>
      )
    : values;

  return getClosestValue(valuesObj, breakpoint, breakpoints);
}
