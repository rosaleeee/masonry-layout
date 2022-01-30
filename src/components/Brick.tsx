import React, { useEffect, useRef } from 'react';

type BrickProps = {
  brickRefs: React.RefObject<HTMLDivElement>[];
};

const Brick: React.FC<BrickProps> = ({ children, brickRefs }) => {
  const brickRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    brickRefs.push(brickRef);
  }, [brickRefs]);

  return (
    <div className="brick" ref={brickRef}>
      {children}
    </div>
  );
};

export default Brick;
