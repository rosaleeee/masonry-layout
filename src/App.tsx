import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MasonryLayout from './components/MasonryLayout';
import Photo from './components/Photo';
import { ResponseGetImage } from './services/Unsplash/models';
import UnsplashService from './services/Unsplash/UnsplashService';

const App: React.FC = () => {
  const [photos, setPhotos] = useState<ResponseGetImage[]>([]);
  const pageIndex = useRef(1);
  const unsplashService = useMemo(() => new UnsplashService(), []);

  useEffect(() => {
    unsplashService.getImages().then((res) => {
      pageIndex.current += 1;
      setPhotos(res);
    });
  }, [unsplashService]);

  const fetchMoreData = useCallback(() => {
    unsplashService.getImages(pageIndex.current).then((res) => {
      pageIndex.current += 1;
      setTimeout(() => setPhotos((p) => p.concat(...res)), 2000);
    });
  }, [unsplashService]);

  return (
    <MasonryLayout
      columnGap={20}
      rowGap={30}
      breakPointOption={{
        default: 4,
        1200: 3,
        780: 2,
        510: 1,
      }}
      dataLength={photos.length}
      callback={fetchMoreData}
    >
      {photos.length && photos.map((p) => <Photo key={p.id} imageUrl={p.imageUrl} description={p.description} />)}
    </MasonryLayout>
  );
};

export default App;
