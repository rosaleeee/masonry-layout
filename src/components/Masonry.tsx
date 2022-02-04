import React, { useEffect, useMemo, useRef, useState } from 'react';
import Utils from '../utils/Utils';
import Brick from './Brick';
import Container from './Container';
import Wrap from './Wrap';

export interface breakPointColumns {
  [key: number | string]: number;
}

type MasonryProps = {
  columnGap: number;
  rowGap: number;
  breakPointOption: breakPointColumns;
  loadMoreRef: React.RefObject<HTMLDivElement>;
};

const Masonry: React.FC<MasonryProps> = ({ children, columnGap, rowGap, breakPointOption, loadMoreRef }) => {
  const [columnCount, setColumnCount] = useState(1);
  const [columnWidth, setColumnWidth] = useState(0);
  const [reload, setReload] = useState(0);

  const masonryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const brickRefs: React.RefObject<HTMLDivElement>[] = useMemo(() => [], []);
  const wrapRefs: React.RefObject<HTMLDivElement>[] = useMemo(() => [], []);

  const utils = useMemo(() => new Utils(), []);

  // 칼럼 개수 설정
  useEffect(() => {
    const resizeHandler = () => {
      const wWidth = window.innerWidth; // 윈도우 너비
      setColumnCount(utils.caculateColumnCount(wWidth, breakPointOption));
    };

    resizeHandler();
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [breakPointOption, utils]);

  // 반응형 너비
  useEffect(() => {
    const resizeHandler = () => {
      if (masonryRef.current) {
        const scrollBarWidth = 15; // 스크롤바 너비
        const lWidth =
          parseInt(window.getComputedStyle(masonryRef.current).getPropertyValue('width')) - scrollBarWidth || 0; // layout 너비
        const cWidth = lWidth / columnCount; // 칼럼 너비
        setColumnWidth(cWidth);
      }
    };

    resizeHandler();
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [masonryRef, columnCount]);

  // Wrap 컴포넌트 설정
  useEffect(() => {
    wrapRefs.forEach((el) => {
      const wrapEl = el.current;

      if (wrapEl) {
        wrapEl.style.paddingLeft = columnGap / 2 + 'px';
        wrapEl.style.paddingRight = columnGap / 2 + 'px';
        wrapEl.style.paddingBottom = rowGap + 'px';
      }
    });
  }, [wrapRefs, columnGap, rowGap, children]);

  // Brick 컴포넌트 설정
  useEffect(() => {
    brickRefs.forEach((el, index) => {
      const brickEl = el.current;
      const wrapEl = wrapRefs[index].current;
      const cellWidth = columnWidth;

      // 이미지가 있다면 이미지 로딩 후, reload를 업데이트함으로써 Brick 컴포넌트 설정 및 배치
      if (brickEl && wrapEl) {
        const imgEl = wrapEl.querySelector('img');
        if (imgEl) {
          imgEl.addEventListener('load', () => {
            brickEl.style.position = 'absolute';
            brickEl.style.left = 0 + 'px';
            brickEl.style.top = 0 + 'px';
            brickEl.style.width = cellWidth + 'px';
            brickEl.style.height = wrapEl.clientHeight + 'px';
            setReload((prev) => prev + 1);
          });
        }
        brickEl.style.position = 'absolute';
        brickEl.style.left = 0 + 'px';
        brickEl.style.top = 0 + 'px';
        brickEl.style.width = cellWidth + 'px';
        brickEl.style.height = wrapEl.clientHeight + 'px';
      }
    });
  }, [brickRefs, wrapRefs, columnWidth, columnGap, children]);

  // Container 컴포넌트 설정
  useEffect(() => {
    const containerEl = containerRef.current;

    if (containerEl) {
      containerEl.style.position = 'relative';
    }
  }, []);

  useEffect(() => {
    if (!columnCount) return;

    const rowPos = Array(columnCount).fill(0);
    const columnPos = Array(columnCount).fill(0);
    const cellWidth = columnWidth;

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
      const containerWidth = cellWidth * columnCount;
      const containerHeight = Math.max.apply(null, columnPos);

      containerEl.style.width = containerWidth + 'px';
      containerEl.style.height = containerHeight + 'px';
    }
  }, [columnCount, containerRef, brickRefs, columnWidth, columnGap, children, reload]);

  return (
    <div id="masonry" ref={masonryRef}>
      <div id="loadMore" ref={loadMoreRef}>
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
    </div>
  );
};

export default Masonry;
