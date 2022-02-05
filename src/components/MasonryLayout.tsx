import React, { useEffect, useRef, useState } from 'react';
import Masonry, { breakPointColumns } from './Masonry';

type MasonryLayoutProps = {
  columnGap: number;
  rowGap: number;
  breakPointOption: breakPointColumns;
  dataLength: number;
  callback: () => void;
};

const MasonryLayout: React.FC<MasonryLayoutProps> = ({
  children,
  columnGap,
  rowGap,
  breakPointOption,
  dataLength,
  callback,
}) => {
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

        if (!loading && wScrollBottom >= offsetBottom) {
          callback && callback();
          setLoading(true);
        }
      }
    };

    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [loading, callback]);

  useEffect(() => {
    setLoading(false);
  }, [dataLength]);

  return (
    <div id="masonryLayout">
      <Masonry columnGap={columnGap} rowGap={rowGap} breakPointOption={breakPointOption} loadMoreRef={loadMoreRef}>
        {children}
      </Masonry>
      {loading && <h2 style={{ textAlign: 'center' }}>loading...</h2>}
    </div>
  );
};

export default MasonryLayout;
