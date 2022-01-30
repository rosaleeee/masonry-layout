import React, { useRef } from 'react';

type BrickProps = {
  brickRefs: React.RefObject<HTMLDivElement>[];
};

const Brick: React.FC<BrickProps> = ({ children, brickRefs }) => {
  const brickRef = useRef<HTMLDivElement>(null);
  brickRefs.push(brickRef);

  return (
    <div className="brick" ref={brickRef}>
      {children}
    </div>
  );
};

export default Brick;
