import React, { useEffect, useRef } from 'react';

type WrapProps = {
  wrapRefs: React.RefObject<HTMLDivElement>[];
};

const Wrap: React.FC<WrapProps> = ({ children, wrapRefs }) => {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    wrapRefs.push(wrapRef);
  }, [wrapRefs]);

  return (
    <div className="wrap" ref={wrapRef}>
      {children}
    </div>
  );
};

export default Wrap;
