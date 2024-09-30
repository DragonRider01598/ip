import React, { useContext } from 'react';
import { ImageContext } from '../context/ImageContext';
import { FaUpload, FaDownload } from 'react-icons/fa';

const UploadImage = () => {
  const { setOriginalImage, setModifiedImage, modifiedImage, imageUploaded, setImageUploaded } = useContext(ImageContext);

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
    <div className="flex flex-row items-center justify-center space-x-6">
      <label className="flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-56 h-24 sm:h-28 flex flex-col items-center justify-center cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 dark:border-blue-400  hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white text-blue-500 dark:text-blue-400 transition-colors duration-300">
        <FaUpload className="w-8 h-8" />
        <span className="mt-2 text-sm sm:text-base">Upload</span>
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
        className={`flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-56 h-24 sm:h-28 flex flex-col items-center justify-center rounded-lg shadow-lg tracking-wide uppercase border transition-colors duration-300 ${imageUploaded
          ? 'bg-white dark:bg-gray-800 border-green-500 dark:border-green-400 text-green-500 dark:text-green-400 hover:bg-green-500 hover:text-white dark:hover:bg-green-500 dark:hover:text-white cursor-pointer'
          : 'bg-gray-200 dark:bg-gray-700 border-gray-400 text-gray-500 dark:text-gray-500 cursor-not-allowed'
          }`}
        onClick={(e) => {
          if (!imageUploaded) e.preventDefault();
        }}
      >
        <FaDownload className="w-8 h-8" />
        <span className="mt-2 text-sm sm:text-base" >Download</span>
      </a>
    </div>
  );
};

export default UploadImage;