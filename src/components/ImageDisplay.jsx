import React, { useContext, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImageContext } from '../context/ImageContext';
import { FaCloudUploadAlt } from 'react-icons/fa';

const ImageDisplay = () => {
  const { modifiedImage, setModifiedImage, setOriginalImage, setImageUploaded } = useContext(ImageContext);
  const [displayedImage, setDisplayedImage] = useState(modifiedImage);

  useEffect(() => {
    setDisplayedImage(modifiedImage);
  }, [modifiedImage]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setModifiedImage(reader.result);
      setOriginalImage(reader.result)
      setImageUploaded(true);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="flex items-center justify-center max-w-full mb-4 p-4 rounded-lg">
      {displayedImage ? (
        <img
          src={displayedImage}
          alt="Modified"
          className="w-full p-1 h-auto max-w-[50%] rounded-md shadow-lg transition-transform duration-300 transform hover:scale-105"
        />
      ) : (
        <div {...getRootProps()} className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-4 cursor-pointer">
          <input {...getInputProps()} />
          <FaCloudUploadAlt className="text-4xl mb-2" />
          <p className='text-center'>Drag & drop an image here, or click to select one</p>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;