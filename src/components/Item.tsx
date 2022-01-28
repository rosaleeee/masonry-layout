import React from 'react';

type ItemProps = {
  num: number;
};

const Item: React.FC<ItemProps> = ({ num }) => {
  const style = {
    height: '300px',
    backgroundColor: '#ccc',
    border: '1px solid #000',
  };

  return <div style={style}>{num}</div>;
};

export default Item;
