import React, { useState, useContext } from 'react';
import { ImageContext } from '../../context/ImageContext';
import CustomButton from './components/CustomButton';
import ConfirmDialog from './components/ConfirmDialog';

const DilationFilter = () => {
   const { modifiedImage, setModifiedImage } = useContext(ImageContext);
   const [isConfirming, setIsConfirming] = useState(false);
   const [unFilteredImage, setUnFilteredImage] = useState(modifiedImage);

   const applyDilation = () => {
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

         // Dilation algorithm
         const width = img.width;
         const height = img.height;
         const dilatedData = new Uint8ClampedArray(data);

         for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
               let maxR = 0; // Red channel
               let maxG = 0; // Green channel
               let maxB = 0; // Blue channel

               for (let dy = -1; dy <= 1; dy++) {
                  for (let dx = -1; dx <= 1; dx++) {
                     const idx = ((y + dy) * width + (x + dx)) * 4;
                     maxR = Math.max(maxR, data[idx]);     // Red channel
                     maxG = Math.max(maxG, data[idx + 1]); // Green channel
                     maxB = Math.max(maxB, data[idx + 2]); // Blue channel
                  }
               }

               const idx = (y * width + x) * 4;
               dilatedData[idx] = maxR;       // Set Red
               dilatedData[idx + 1] = maxG;   // Set Green
               dilatedData[idx + 2] = maxB;   // Set Blue
               dilatedData[idx + 3] = 255;     // Alpha
            }
         }

         ctx.putImageData(new ImageData(dilatedData, width, height), 0, 0);
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
            <CustomButton onClick={applyDilation} text={"Dilation"} />
         ) : (
            <div className="dark:bg-gray-500 dark:text-black bg-gray-200 text-gray-800 py-2 mb-2 rounded-lg px-4 pb-4">
               <h3 className="text-lg font-semibold mb-2">Dilation</h3>
               
               <ConfirmDialog
                  message={"dilation"}
                  onConfirm={confirmApply}
                  onCancel={cancelApply}
               />
            </div>
         )}
      </div>
   );
};

export default DilationFilter;
