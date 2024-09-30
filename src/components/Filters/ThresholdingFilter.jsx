import React, { useState, useContext, useEffect } from 'react';
import { ImageContext } from '../../context/ImageContext';
import ConfirmDialog from './components/ConfirmDialog';
import CustomButton from './components/CustomButton';

const ThresholdingFilter = () => {
   const { modifiedImage, setModifiedImage } = useContext(ImageContext);
   const [isConfirming, setIsConfirming] = useState(false);
   const [unFilteredImage, setUnFilteredImage] = useState(modifiedImage);
   const [threshold, setThreshold] = useState(123);

   const applyThresholding = () => {
      setUnFilteredImage(modifiedImage);
      setThreshold(128);
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
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            const value = avg >= threshold ? 255 : 0;
            data[i] = data[i + 1] = data[i + 2] = value;
         }

         ctx.putImageData(imageData, 0, 0);
         setModifiedImage(canvas.toDataURL());
      };
   }, [threshold, setModifiedImage, unFilteredImage]);

   return (
      <div>
         {!isConfirming ? (
            <CustomButton onClick={applyThresholding} text={"Thresholding"} />
         ) : (
            <div className="bg-gray-200 text-gray-800 py-2 mb-2 rounded-lg px-4 pb-4 dark:bg-gray-500 dark:text-black">
               <h3 className="text-lg font-semibold mb-2">Thresholding</h3>
               <p>Adjust the threshold value:</p>
               <div className="flex items-center mb-4">
                  <input
                     type="range"
                     min="0"
                     max="255"
                     value={threshold}
                     onChange={(e) => setThreshold(Number(e.target.value))}
                     className="w-full"
                  />
                  <span className="ml-2">{threshold}</span>
               </div>
               <ConfirmDialog
                  message={"thresholding"}
                  onConfirm={confirmApply}
                  onCancel={cancelApply}
               />
            </div>
         )}
      </div>
   );
};

export default ThresholdingFilter;