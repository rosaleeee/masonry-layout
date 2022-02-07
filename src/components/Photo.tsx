import React from 'react';

type PhotoProps = {
  imageUrl: string;
  description: string;
};

const Photo: React.FC<PhotoProps> = ({ imageUrl, description }) => {
  return (
    <div>
      <img src={imageUrl} alt="사진" style={{ width: '100%' }} />
      {/* <p>{description}</p> */}
    </div>
  );
};

export default Photo;
