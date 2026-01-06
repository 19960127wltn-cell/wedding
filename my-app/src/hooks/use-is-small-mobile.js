// src/hooks/use-is-small-mobile.js
import * as React from "react";

const SMALL_MOBILE_BREAKPOINT = 500;

export function useIsSmallMobile() {
  const [isSmallMobile, setIsSmallMobile] = React.useState(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${SMALL_MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsSmallMobile(window.innerWidth < SMALL_MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsSmallMobile(window.innerWidth < SMALL_MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isSmallMobile;
}
