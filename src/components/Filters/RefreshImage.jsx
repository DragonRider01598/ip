import React, { useState, useContext } from 'react';
import { ImageContext } from '../../context/ImageContext';
import ConfirmDialog from './components/ConfirmDialog';
import CustomButton from './components/CustomButton';

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
            <CustomButton onClick={applyRefresh} text={"Refresh Image"} />
         ) : (
            <div className="mt-4 bg-gray-200 text-gray-800 py-2 mb-2 rounded-lg px-4 pb-4 dark:bg-gray-500 dark:text-black">
               <h3 className="text-lg font-semibold mb-2">Refresh Image</h3>
               <ConfirmDialog
                  customMessage={"Are you sure you want to refresh the image?"}
                  onConfirm={confirmApply}
                  onCancel={cancelApply}
               />
            </div>
         )}
      </div>
   );
};

export default RefreshImage;