import React from 'react';
import Brick from './Brick';
import Container from './Container';
import Wrap from './Wrap';

const MasonryLayout: React.FC = ({ children }) => {
  return (
    <div id="masonry">
      <Container>
        {React.Children.map(children, (child, index) => {
          return (
            <Brick key={index}>
              <Wrap>{child}</Wrap>
            </Brick>
          );
        })}
      </Container>
    </div>
  );
};

export default MasonryLayout;
