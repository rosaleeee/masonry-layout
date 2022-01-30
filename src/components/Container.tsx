import React from 'react';

type ContainerProps = {
  containerRef: React.RefObject<HTMLDivElement>;
};

const Container: React.FC<ContainerProps> = ({ children, containerRef }) => {
  return (
    <div id="container" ref={containerRef}>
      {children}
    </div>
  );
};

export default Container;
