import React, { useState, useContext, useEffect } from 'react';
import { ImageContext } from '../../context/ImageContext';
import ConfirmDialog from './components/ConfirmDialog';
import CustomButton from './components/CustomButton';

const HistogramStretchingFilter = () => {
   const { modifiedImage, setModifiedImage } = useContext(ImageContext);
   const [isConfirming, setIsConfirming] = useState(false);
   const [unFilteredImage, setUnFilteredImage] = useState(modifiedImage);
   const [minInput, setMinInput] = useState(0); 
   const [maxInput, setMaxInput] = useState(255); 
   const [minOutput, setMinOutput] = useState(0); 
   const [maxOutput, setMaxOutput] = useState(255); 

   const applyStretching = () => {
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

         const inputRange = maxInput - minInput;
         const outputRange = maxOutput - minOutput;

         for (let i = 0; i < data.length; i += 4) {
            for (let j = 0; j < 3; j++) { 
               data[i + j] = ((data[i + j] - minInput) * (outputRange / inputRange)) + minOutput;
               data[i + j] = Math.max(minOutput, Math.min(maxOutput, data[i + j])); 
            }
         }

         ctx.putImageData(imageData, 0, 0);
         setModifiedImage(canvas.toDataURL());
      };
   }, [minInput, maxInput, minOutput, maxOutput, isConfirming, setModifiedImage, unFilteredImage]);

   return (
      <div>
         {!isConfirming ? (
            <CustomButton onClick={applyStretching} text={"Histogram Stretching"} />
         ) : (
            <div className="dark:bg-gray-500 dark:text-black bg-gray-200 text-gray-800 py-2 mb-2 rounded-lg px-4 pb-4">
               <h3 className="text-lg font-semibold mb-2">Adjust Histogram Stretching</h3>
               <div className="flex items-center mb-4">
                  <label className="mr-2">Min Input:</label>
                  <input
                     type="number"
                     min="0"
                     max="255"
                     value={minInput}
                     onChange={(e) => setMinInput(Number(e.target.value))}
                     className="w-16 mr-4"
                  />
                  <label className="mr-2">Max Input:</label>
                  <input
                     type="number"
                     min="0"
                     max="255"
                     value={maxInput}
                     onChange={(e) => setMaxInput(Number(e.target.value))}
                     className="w-16"
                  />
               </div>
               <div className="flex items-center mb-4">
                  <label className="mr-2">Min Output:</label>
                  <input
                     type="number"
                     min="0"
                     max="255"
                     value={minOutput}
                     onChange={(e) => setMinOutput(Number(e.target.value))}
                     className="w-16 mr-4"
                  />
                  <label className="mr-2">Max Output:</label>
                  <input
                     type="number"
                     min="0"
                     max="255"
                     value={maxOutput}
                     onChange={(e) => setMaxOutput(Number(e.target.value))}
                     className="w-16"
                  />
               </div>
               <ConfirmDialog
                  message={"histogram stretching"}
                  onConfirm={confirmApply}
                  onCancel={cancelApply}
               />
            </div>
         )}
      </div>
   );
};

export default HistogramStretchingFilter;