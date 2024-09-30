import React, { useState, useContext, useEffect } from 'react';
import { ImageContext } from '../../context/ImageContext';
import CustomButton from './components/CustomButton';
import ConfirmDialog from './components/ConfirmDialog';

const ContrastStretchingFilter = () => {
   const { modifiedImage, setModifiedImage } = useContext(ImageContext);
   const [isConfirming, setIsConfirming] = useState(false);
   const [unFilteredImage, setUnFilteredImage] = useState(modifiedImage);
   const [minValue, setMinValue] = useState(0);
   const [maxValue, setMaxValue] = useState(255);

   const applyContrastStretching = () => {
      setUnFilteredImage(modifiedImage);

      setIsConfirming(true);
   };

   const confirmApply = () => {
      setIsConfirming(false);
   };

   const cancelApply = () => {
      setModifiedImage(unFilteredImage);
      setIsConfirming(false);
   };

   useEffect(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = unFilteredImage;

      img.onload = () => {
         canvas.width = img.width;
         canvas.height = img.height;
         ctx.drawImage(img, 0, 0);
         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
         const data = imageData.data;

         for (let i = 0; i < data.length; i += 4) {
            data[i] = ((data[i] - minValue) / (maxValue - minValue)) * 255;
            data[i + 1] = ((data[i + 1] - minValue) / (maxValue - minValue)) * 255;
            data[i + 2] = ((data[i + 2] - minValue) / (maxValue - minValue)) * 255;
         }

         ctx.putImageData(imageData, 0, 0);
         setModifiedImage(canvas.toDataURL());
      };
   }, [minValue, maxValue, setModifiedImage, unFilteredImage]);

   return (
      <div>
         {!isConfirming ? (
            <CustomButton onClick={applyContrastStretching} text={"Contrast Stretching"} />
         ) : (
            <div className="dark:bg-gray-500 dark:text-black bg-gray-200 text-gray-800 py-2 mb-2 rounded-lg px-4 pb-4">
               <h3 className="text-lg font-semibold mb-2">Contrast Stretching</h3>

               <p>Adjust the minimum pixel value:</p>
               <div className="flex items-center mb-4">
                  <input
                     type="range"
                     min="0"
                     max="255"
                     value={minValue}
                     onChange={(e) => setMinValue(Number(e.target.value))}
                     className="w-full"
                  />
                  <span className="ml-2">{minValue}</span>
               </div>

               <p>Adjust the maximum pixel value:</p>
               <div className="flex items-center mb-4">
                  <input
                     type="range"
                     min="0"
                     max="255"
                     value={maxValue}
                     onChange={(e) => setMaxValue(Number(e.target.value))}
                     className="w-full"
                  />
                  <span className="ml-2">{maxValue}</span>
               </div>
               <ConfirmDialog
                  message={"contrast stretching"}
                  onConfirm={confirmApply}
                  onCancel={cancelApply}
               />
            </div>
         )}
      </div>
   );
};

export default ContrastStretchingFilter;