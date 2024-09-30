import React, { createContext, useState, useEffect } from 'react';

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [originalImage, setOriginalImage] = useState(null);
  const [modifiedImage, setModifiedImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);

  return (
    <ImageContext.Provider
      value={
        {
          originalImage,
          modifiedImage,
          setModifiedImage,
          setOriginalImage,
          imageUploaded,
          setImageUploaded
        }
      }>
      {children}
    </ImageContext.Provider>
  );
};