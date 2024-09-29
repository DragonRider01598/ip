import React, { useContext, useState } from 'react';
import { ImageContext } from '../context/ImageContext';
import { FaUpload, FaDownload } from 'react-icons/fa';

const UploadImage = () => {
  const { setOriginalImage, setModifiedImage, modifiedImage } = useContext(ImageContext);
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result);
        setModifiedImage(reader.result);
        setImageUploaded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center space-x-4">
      <label className="flex-shrink-0 w-28 sm:w-36 md:w-40 lg:w-48 h-24 sm:h-28 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors">
        <FaUpload className="w-6 h-6 text-black/65" />
        <span className="mt-1 text-sm sm:text-base">Upload</span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </label>

      <a
        href={imageUploaded ? modifiedImage : '#'}
        download="modified_image.png"
        className={`flex-shrink-0 w-28 sm:w-36 md:w-40 lg:w-48 h-24 sm:h-28 flex flex-col items-center justify-center rounded-lg shadow-lg tracking-wide uppercase border transition-colors ${imageUploaded
          ? 'bg-white border-green-500 text-green-500 hover:bg-green-500 hover:text-white cursor-pointer'
          : 'bg-gray-200 border-gray-400 text-gray-500 cursor-not-allowed'
          }`}
        onClick={(e) => {
          if (!imageUploaded) e.preventDefault();
        }}
      >
        <FaDownload className="w-6 h-6 text-black/65" />
        <span className="mt-1 text-sm sm:text-base">Download</span>
      </a>
    </div>
  );
};

export default UploadImage;