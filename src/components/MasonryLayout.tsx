import React from 'react';
import Brick from './Brick';
import Container from './Container';

const MasonryLayout: React.FC = ({ children }) => {
  return (
    <div id="masonry">
      <Container>
        {React.Children.map(children, (child, index) => {
          return <Brick key={index}>{child}</Brick>;
        })}
      </Container>
    </div>
  );
};

export default MasonryLayout;
