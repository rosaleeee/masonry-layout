import React from 'react';
import Utils from '../utils/Utils';

type ItemProps = {
  num: number;
};

const Item: React.FC<ItemProps> = ({ num }) => {
  const utils = new Utils();
  const height = utils.generateRandomNum(200, 500);

  const style = {
    height: `${height}px`,
    backgroundColor: '#ccc',
    border: '1px solid #000',
  };

  return (
    <div style={style} className="item">
      {num}
    </div>
  );
};

export default Item;
