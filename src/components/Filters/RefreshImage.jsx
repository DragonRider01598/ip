import React, { useState, useContext } from 'react';
import { ImageContext } from '../../context/ImageContext';

const RefreshImage = () => {
   const { modifiedImage, setModifiedImage, originalImage } = useContext(ImageContext);
   const [isConfirming, setIsConfirming] = useState(false);
   const [unFilteredImage, setunFilteredImage] = useState(modifiedImage);

   const applyRefresh = () => {
      setunFilteredImage(modifiedImage);
      setModifiedImage(originalImage);
      setIsConfirming(true);
   };

   const confirmApply = () => {
      setIsConfirming(false);
   };

   const cancelApply = () => {
      setModifiedImage(unFilteredImage);
      setIsConfirming(false);
   };

   return (
      <div>
         {!isConfirming ? (
            <button
               onClick={applyRefresh}
               className="w-full bg-blue-500 text-white py-2 mb-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
               Refresh Image
            </button>
         ) : (
            <div className="mt-4 bg-gray-200 text-gray-800 py-2 mb-2 rounded-lg px-4 pb-4">
               <h3 className="text-lg font-semibold mb-2">Refresh Image</h3>
               <p>Are you sure you want to refresh the image?</p>
               <div className="flex justify-between mt-4">
                  <button
                     onClick={confirmApply}
                     className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                  >
                     Apply
                  </button>
                  <button
                     onClick={cancelApply}
                     className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
                  >
                     Cancel
                  </button>
               </div>
            </div>
         )}
      </div>
   );
};

export default RefreshImage;