import React from 'react';
import Masonry, { breakPointColumns } from './Masonry';

type MasonryLayoutProps = {
  columnGap: number;
  rowGap: number;
  breakPointOption: breakPointColumns;
};

const MasonryLayout: React.FC<MasonryLayoutProps> = ({ children, columnGap, rowGap, breakPointOption }) => {
  return (
    <Masonry columnGap={columnGap} rowGap={rowGap} breakPointOption={breakPointOption}>
      {children}
    </Masonry>
  );
};

export default MasonryLayout;
