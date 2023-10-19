import { useEffect, useRef } from 'react';

/**
 * https://github.com/helderburato/use-is-mounted-ref
 * Motivation:
 * - Avoid memory leaks setting states when component are unmounted
 * - Control when component already mounted
 * - Common error when setting state to unmounted component:
 * 'Warning: Can only update a mounted or mounting component.
 * This usually means you called setState, replaceState, or forceUpdate on an unmounted component. This is a no-op.'
 */
export function useIsMountedRef() {
  const isMounted = useRef(true);

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );

  return isMounted;
}
