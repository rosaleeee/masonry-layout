import React, { useEffect, useRef } from 'react';
import Masonry, { breakPointColumns } from './Masonry';

type MasonryLayoutProps = {
  columnGap: number;
  rowGap: number;
  breakPointOption: breakPointColumns;
};

const MasonryLayout: React.FC<MasonryLayoutProps> = ({ children, columnGap, rowGap, breakPointOption }) => {
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
          console.log(true);
        }
      }
    };

    scrollHandler();
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <Masonry columnGap={columnGap} rowGap={rowGap} breakPointOption={breakPointOption} loadMoreRef={loadMoreRef}>
      {children}
    </Masonry>
  );
};

export default MasonryLayout;
