import React, { useState, useContext } from 'react';
import { ImageContext } from '../../context/ImageContext';
import CustomButton from './components/CustomButton';
import ConfirmDialog from './components/ConfirmDialog';

const ErosionFilter = () => {
   const { modifiedImage, setModifiedImage } = useContext(ImageContext);
   const [isConfirming, setIsConfirming] = useState(false);
   const [unFilteredImage, setUnFilteredImage] = useState(modifiedImage);

   const applyErosion = () => {
      setUnFilteredImage(modifiedImage);

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = modifiedImage;

      img.onload = () => {
         canvas.width = img.width;
         canvas.height = img.height;
         ctx.drawImage(img, 0, 0);
         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
         const data = imageData.data;

         // Erosion algorithm
         const width = img.width;
         const height = img.height;
         const erodedData = new Uint8ClampedArray(data);

         for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
               let minR = 255; // Red channel
               let minG = 255; // Green channel
               let minB = 255; // Blue channel
               
               for (let dy = -1; dy <= 1; dy++) {
                  for (let dx = -1; dx <= 1; dx++) {
                     const idx = ((y + dy) * width + (x + dx)) * 4;
                     minR = Math.min(minR, data[idx]);     // Red channel
                     minG = Math.min(minG, data[idx + 1]); // Green channel
                     minB = Math.min(minB, data[idx + 2]); // Blue channel
                  }
               }

               const idx = (y * width + x) * 4;
               erodedData[idx] = minR;       // Set Red
               erodedData[idx + 1] = minG;   // Set Green
               erodedData[idx + 2] = minB;   // Set Blue
               erodedData[idx + 3] = 255;     // Alpha
            }
         }

         ctx.putImageData(new ImageData(erodedData, width, height), 0, 0);
         setModifiedImage(canvas.toDataURL());
      };

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
            <CustomButton onClick={applyErosion} text={"Erosion"} />
         ) : (
            <div className="dark:bg-gray-500 dark:text-black bg-gray-200 text-gray-800 py-2 mb-2 rounded-lg px-4 pb-4">
               <h3 className="text-lg font-semibold mb-2">Erosion</h3>
               
               <ConfirmDialog
                  message={"erosion"}
                  onConfirm={confirmApply}
                  onCancel={cancelApply}
               />
            </div>
         )}
      </div>
   );
};

export default ErosionFilter;
