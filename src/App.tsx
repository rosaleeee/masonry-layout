import React from 'react';
import Item from './components/Item';
import MasonryLayout from './components/MasonryLayout';

const App: React.FC = () => {
  return (
    <MasonryLayout>
      <Item num={1} />
      <Item num={2} />
      <Item num={3} />
      <Item num={4} />
      <Item num={5} />
      <Item num={6} />
      <Item num={7} />
      <Item num={8} />
      <Item num={9} />
      <Item num={10} />
    </MasonryLayout>
  );
};

export default App;
