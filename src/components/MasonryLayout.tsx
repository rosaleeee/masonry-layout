import React, { useEffect, useRef, useState } from 'react';
import Masonry, { breakPointColumns } from './Masonry';

type MasonryLayoutProps = {
  columnGap: number;
  rowGap: number;
  breakPointOption: breakPointColumns;
};

const MasonryLayout: React.FC<MasonryLayoutProps> = ({ children, columnGap, rowGap, breakPointOption }) => {
  const [loading, setLoading] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  // infinity scrolling
  useEffect(() => {
    const scrollHandler = () => {
      const loadMoreEl = loadMoreRef.current;

      if (loadMoreEl) {
        // window sizes
        const wScrollTop = window.scrollY;
        const wHeight = window.innerHeight;
        const wScrollBottom = wScrollTop + wHeight;

        // loadMoreEl sizes
        const offsetTop = loadMoreEl.offsetTop;
        const height = loadMoreEl.clientHeight;
        const offsetBottom = offsetTop + height;

        if (wScrollBottom >= offsetBottom) {
          setLoading(true);
        }
      }
    };

    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  useEffect(() => {
    if (loading) {
      console.log('loading...');
    }
  }, [loading]);

  return (
    <Masonry columnGap={columnGap} rowGap={rowGap} breakPointOption={breakPointOption} loadMoreRef={loadMoreRef}>
      {children}
    </Masonry>
  );
};

export default MasonryLayout;
