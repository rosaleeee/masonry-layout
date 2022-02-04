import React, { useEffect, useMemo, useState } from 'react';
import Masonry from './components/Masonry';
import Photo from './components/Photo';
import { ResponseGetImage } from './services/Unsplash/models';
import UnsplashService from './services/Unsplash/UnsplashService';

const App: React.FC = () => {
  const [photos, setPhotos] = useState<ResponseGetImage[]>([]);
  const unsplashService = useMemo(() => new UnsplashService(), []);

  useEffect(() => {
    unsplashService.getImages().then((res) => {
      setPhotos(res);
    });
  }, [unsplashService]);

  return (
    <Masonry
      columnGap={20}
      rowGap={30}
      breakPointOption={{
        default: 4,
        1200: 3,
        780: 2,
        510: 1,
      }}
    >
      {photos.length && photos.map((p) => <Photo key={p.id} imageUrl={p.imageUrl} description={p.description} />)}
    </Masonry>
  );
};

export default App;
