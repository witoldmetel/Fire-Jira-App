import { useEffect, useState } from 'react';

export function useOffSetTop(top: number) {
  const [offsetTop, setOffSetTop] = useState(false);
  const isTop = top || 100;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > isTop) {
        setOffSetTop(true);
      } else {
        setOffSetTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isTop]);

  return offsetTop;
}
