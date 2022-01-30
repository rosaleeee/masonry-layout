import React, { useEffect, useMemo, useRef, useState } from 'react';
import Brick from './Brick';
import Container from './Container';
import Wrap from './Wrap';

type MasonryLayoutProps = {
  columnWidth: number;
  columnGap: number;
  rowGap: number;
};

const MasonryLayout: React.FC<MasonryLayoutProps> = ({ children, columnWidth, columnGap, rowGap }) => {
  const [currentColumnCount, setCurrentColumnCount] = useState(0);

  const masonryLayoutRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const brickRefs: React.RefObject<HTMLDivElement>[] = useMemo(() => [], []);
  const wrapRefs: React.RefObject<HTMLDivElement>[] = useMemo(() => [], []);

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

  // Brick 컴포넌트 설정
  useEffect(() => {
    brickRefs.forEach((el, index) => {
      const wrapEl = wrapRefs[index].current;
      const cellWidth = columnWidth + columnGap;

      if (el.current && wrapEl) {
        el.current.style.position = 'absolute';
        el.current.style.left = 0 + 'px';
        el.current.style.top = 0 + 'px';
        el.current.style.width = cellWidth + 'px';
        el.current.style.height = wrapEl.clientHeight + 'px';
      }
    });
  }, [brickRefs, wrapRefs, columnWidth, columnGap]);

  // Container 컴포넌트 설정
  useEffect(() => {
    const containerEl = containerRef.current;

    if (containerEl) {
      containerEl.style.position = 'relative';
    }
  }, []);

  // 칼럼 개수 설정
  useEffect(() => {
    const masonryLayoutEl = masonryLayoutRef.current;

    function setColumnCount() {
      if (masonryLayoutEl) {
        const cellWidth = columnWidth + columnGap;
        const nextColumnCount = Math.floor(masonryLayoutEl.clientWidth / cellWidth);

        if (nextColumnCount !== currentColumnCount) {
          setCurrentColumnCount(nextColumnCount);
        }
      }
    }

    setColumnCount();
    window.addEventListener('resize', setColumnCount);
    return () => {
      window.removeEventListener('resize', setColumnCount);
    };
  }, [columnWidth, columnGap, currentColumnCount]);

  useEffect(() => {
    if (!currentColumnCount) return;

    const rowPos = Array(currentColumnCount).fill(0);
    const columnPos = Array(currentColumnCount).fill(0);
    const cellWidth = columnWidth + columnGap;

    rowPos.forEach((_, index) => (rowPos[index] = cellWidth * index));

    // Brick 컴포넌트 배치하기
    brickRefs.forEach((el) => {
      const brickEl = el.current;
      const minIndex = columnPos.findIndex((v) => v === Math.min.apply(null, columnPos));

      const posX = rowPos[minIndex];
      const posY = columnPos[minIndex];

      if (brickEl) {
        brickEl.style.transform = 'translateX(' + posX + 'px) translateY(' + posY + 'px)';

        columnPos[minIndex] += brickEl?.clientHeight;
      }
    });

    // Container 컴포넌트 크기 설정
    const containerEl = containerRef.current;
    if (containerEl) {
      const containerWidth = cellWidth * currentColumnCount;
      const containerHeight = Math.max.apply(null, columnPos);

      containerEl.style.width = containerWidth + 'px';
      containerEl.style.height = containerHeight + 'px';
    }
  }, [currentColumnCount, containerRef, brickRefs, columnWidth, columnGap]);

  return (
    <div id="masonry" ref={masonryLayoutRef}>
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
