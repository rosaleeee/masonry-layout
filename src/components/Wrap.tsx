import React, { useRef } from 'react';

type WrapProps = {
  wrapRefs: React.RefObject<HTMLDivElement>[];
};

const Wrap: React.FC<WrapProps> = ({ children, wrapRefs }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  wrapRefs.push(wrapRef);

  return (
    <div className="wrap" ref={wrapRef}>
      {children}
    </div>
  );
};

export default Wrap;
