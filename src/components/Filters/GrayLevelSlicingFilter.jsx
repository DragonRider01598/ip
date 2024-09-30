import React, { useState, useContext, useEffect } from 'react';
import { ImageContext } from '../../context/ImageContext';
import CustomButton from './components/CustomButton';
import ConfirmDialog from './components/ConfirmDialog';

const GrayLevelSlicingFilter = () => {
   const { modifiedImage, setModifiedImage } = useContext(ImageContext);
   const [isConfirming, setIsConfirming] = useState(false);
   const [unFilteredImage, setUnFilteredImage] = useState(modifiedImage);
   const [lowerBound, setLowerBound] = useState(100);
   const [upperBound, setUpperBound] = useState(200);
   const [useBackground, setUseBackground] = useState(true);

   const applyGrayLevelSlicing = () => {
      setUnFilteredImage(modifiedImage);
      setLowerBound(100);
      setUpperBound(200);
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


         const newImageData = ctx.createImageData(canvas.width, canvas.height);
         const newData = newImageData.data;

         for (let i = 0; i < data.length; i += 4) {
            const red = data[i];
            const green = data[i + 1];
            const blue = data[i + 2];
            const intensity = (red + green + blue) / 3;


            if (intensity >= lowerBound && intensity <= upperBound) {
               newData[i] = 255;
               newData[i + 1] = 255;
               newData[i + 2] = 255;
            } else {
               if (!useBackground) {
                  newData[i] = 0;
                  newData[i + 1] = 0;
                  newData[i + 2] = 0;
               } else {
                  newData[i] = data[i];
                  newData[i + 1] = data[i + 1];
                  newData[i + 2] = data[i + 2];
               }
            }
            newData[i + 3] = data[i + 3];
         }

         ctx.putImageData(newImageData, 0, 0);
         setModifiedImage(canvas.toDataURL());
      };
   }, [lowerBound, upperBound, unFilteredImage, useBackground, setModifiedImage]);

   return (
      <div>
         {!isConfirming ? (
            <CustomButton onClick={applyGrayLevelSlicing} text={"Gray Level Slicing"} />
         ) : (
            <div className="dark:bg-gray-500 dark:text-black bg-gray-200 text-gray-800 py-2 mb-2 rounded-lg px-4 pb-4">
               <h3 className="text-lg font-semibold mb-2">Gray Level Slicing</h3>

               <p>Adjust the lower and upper bounds:</p>
               <div className="flex items-center mb-4">
                  <input
                     type="range"
                     min="0"
                     max="255"
                     step="1"
                     value={lowerBound}
                     onChange={(e) => setLowerBound(Number(e.target.value))}
                     className="w-full"
                  />
                  <span className="ml-2">{lowerBound}</span>
               </div>
               <div className="flex items-center mb-4">
                  <input
                     type="range"
                     min="0"
                     max="255"
                     step="1"
                     value={upperBound}
                     onChange={(e) => setUpperBound(Number(e.target.value))}
                     className="w-full"
                  />
                  <span className="ml-2">{upperBound}</span>
               </div>

               <div className="flex items-center mb-4">
                  <input
                     type="checkbox"
                     checked={useBackground}
                     onChange={() => setUseBackground(!useBackground)}
                     className="mr-2"
                  />
                  <label>{useBackground ? 'Use Background' : 'Transparent Background'}</label>
               </div>
               <ConfirmDialog
                  message={"gray level slicing"}
                  onConfirm={confirmApply}
                  onCancel={cancelApply}
               />
            </div>
         )}
      </div>
   );
};

export default GrayLevelSlicingFilter;