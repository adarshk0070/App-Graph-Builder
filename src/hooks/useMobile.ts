import { useState, useEffect } from 'react';

export function useMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mql.matches);
    mql.addEventListener('change', handleChange);

    return () => mql.removeEventListener('change', handleChange);
  }, [breakpoint]);

  return isMobile;
}
