import React, { useEffect, useMemo, useRef } from 'react';
import Brick from './Brick';
import Container from './Container';
import Wrap from './Wrap';

type MasonryLayoutProps = {
  columnWidth: number;
  columnGap: number;
  rowGap: number;
};

const MasonryLayout: React.FC<MasonryLayoutProps> = ({ children, columnWidth, columnGap, rowGap }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const brickRefs: React.RefObject<HTMLDivElement>[] = useMemo(() => [], []);
  const wrapRefs: React.RefObject<HTMLDivElement>[] = useMemo(() => [], []);

  // Brick 컴포넌트 설정
  useEffect(() => {
    brickRefs.forEach((el, index) => {
      const wrapEl = wrapRefs[index].current;

      if (el.current && wrapEl) {
        el.current.style.width = columnWidth + 'px';
        el.current.style.height = wrapEl.clientHeight + 'px';
      }
    });
  }, [brickRefs, wrapRefs, columnWidth]);

  // Wrap 컴포넌트 설정
  useEffect(() => {
    wrapRefs.forEach((el) => {
      if (el.current) {
        el.current.style.paddingLeft = columnGap / 2 + 'px';
        el.current.style.paddingRight = columnGap / 2 + 'px';
        el.current.style.paddingBottom = rowGap + 'px';
      }
    });
  }, [wrapRefs, columnGap, rowGap]);

  return (
    <div id="masonry">
      <Container containerRef={containerRef}>
        {React.Children.map(children, (child, index) => {
          return (
            <Brick key={index} brickRefs={brickRefs}>
              <Wrap wrapRefs={wrapRefs}>{child}</Wrap>
            </Brick>
          );
        })}
      </Container>
    </div>
  );
};

export default MasonryLayout;
