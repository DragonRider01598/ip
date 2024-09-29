import React, { createContext, useState } from 'react';

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [originalImage, setOriginalImage] = useState(null);
  const [modifiedImage, setModifiedImage] = useState(null);

  return (
    <ImageContext.Provider value={{ originalImage, modifiedImage, setModifiedImage, setOriginalImage }}>
      {children}
    </ImageContext.Provider>
  );
};