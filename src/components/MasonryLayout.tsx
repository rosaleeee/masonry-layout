import React, { useEffect, useMemo, useRef, useState } from 'react';
import Masonry, { breakPointColumns } from './Masonry';

type FetchMoreOption = {
  dataLength: number;
  callback: () => void;
  threshold?: number;
  customLoader?: JSX.Element;
};

type MasonryLayoutProps = {
  columnGap: number;
  rowGap: number;
  breakPointOption: breakPointColumns;
  fetchMoreOption?: FetchMoreOption;
};

const MasonryLayout: React.FC<MasonryLayoutProps> = ({
  children,
  columnGap,
  rowGap,
  breakPointOption,
  fetchMoreOption,
}) => {
  const [loading, setLoading] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const option = useMemo(() => {
    return {
      threshold: 0,
      customLoader: null,
      ...fetchMoreOption,
    };
  }, [fetchMoreOption]);

  // infinity scrolling
  useEffect(() => {
    if (!fetchMoreOption) return;

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
        let offsetBottom = offsetTop + height;

        if (option.threshold) {
          offsetBottom -= option.threshold;
        }

        if (!loading && wScrollBottom >= offsetBottom) {
          option.callback && option.callback();
          setLoading(true);
        }
      }
    };

    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [loading, option.callback, option.threshold, option, fetchMoreOption]);

  useEffect(() => {
    setLoading(false);
  }, [option.dataLength]);

  return (
    <div id="masonryLayout">
      <Masonry columnGap={columnGap} rowGap={rowGap} breakPointOption={breakPointOption} loadMoreRef={loadMoreRef}>
        {children}
      </Masonry>
      {loading && (option.customLoader || <h2 style={{ textAlign: 'center' }}>loading...</h2>)}
    </div>
  );
};

export default MasonryLayout;
