import React, { Children } from 'react';
import Brick from './Brick';
import Container from './Container';

const MasonryLayout: React.FC = ({ children }) => {
  const childrenArr = Children.toArray(children);

  return (
    <div id="masonry">
      <Container>
        {childrenArr.map((child, index) => {
          return <Brick key={index}>{child}</Brick>;
        })}
      </Container>
    </div>
  );
};

export default MasonryLayout;
