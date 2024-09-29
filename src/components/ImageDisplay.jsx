import React, { useContext, useEffect, useState } from 'react';
import { ImageContext } from '../context/ImageContext';

const ImageDisplay = () => {
  const { modifiedImage } = useContext(ImageContext);
  const [displayedImage, setDisplayedImage] = useState(modifiedImage);

  useEffect(() => {
    setDisplayedImage(modifiedImage);
  }, [modifiedImage]);

  return (
    <div className='flex items-center justify-center max-w-full mb-4'>
      {displayedImage ? (
        <img src={displayedImage} alt="Modified" className="w-full h-auto max-w-[50%]" />
      ) : (
        <p className='text-center'>No image uploaded.</p>
      )}
    </div>
  );
};

export default ImageDisplay;