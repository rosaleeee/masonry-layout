import React, { useEffect, useMemo, useRef } from 'react';
import Brick from './Brick';
import Container from './Container';
import Wrap from './Wrap';

const MasonryLayout: React.FC = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const brickRefs: React.RefObject<HTMLDivElement>[] = useMemo(() => [], []);
  const wrapRefs: React.RefObject<HTMLDivElement>[] = useMemo(() => [], []);

  useEffect(() => {
    console.log(containerRef);
    console.log(brickRefs);
    console.log(wrapRefs);
  }, [brickRefs, wrapRefs]);

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
