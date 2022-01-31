import React, { useEffect, useMemo, useRef, useState } from 'react';
import MasonryLayout from './components/MasonryLayout';
import Photo from './components/Photo';
import { ResponseGetImage } from './services/Unsplash/models';
import UnsplashService from './services/Unsplash/UnsplashService';

const App: React.FC = () => {
  const [photos, setPhotos] = useState<ResponseGetImage[]>([]);
  const [futherRequest, setFutherRequest] = useState(false);
  const unsplashService = useMemo(() => new UnsplashService(), []);

  const photosRef = useRef<HTMLDivElement>(null);
  const pageCount = useRef(1);

  useEffect(() => {
    unsplashService.getImages().then((res) => {
      setPhotos(res);
    });
  }, [unsplashService]);

  // 추기 요청하기
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const wHeight = window.innerHeight;
      const scrollBottom = scrollTop + wHeight;

      const photoContainer = photosRef.current!;
      const pBottom = photoContainer.offsetTop + photoContainer.clientHeight;

      if (!futherRequest && scrollBottom > pBottom) {
        pageCount.current += 1;
        setFutherRequest(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      return window.removeEventListener('scroll', handleScroll);
    };
  }, [futherRequest]);

  useEffect(() => {
    if (futherRequest) {
      setTimeout(() => {
        unsplashService.getImages(pageCount.current).then((res) => {
          setPhotos((prev) => prev.concat(res));
          setFutherRequest(false);
        });
      }, 2000);
    }
  }, [futherRequest, unsplashService]);

  return (
    <MasonryLayout columnWidth={270} columnGap={20} rowGap={30} photosRef={photosRef}>
      {photos.length && photos.map((p) => <Photo key={p.id} imageUrl={p.imageUrl} description={p.description} />)}
    </MasonryLayout>
  );
};

export default App;
