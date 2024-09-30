import React, { useState, useContext, useEffect } from 'react';
import { ImageContext } from '../../context/ImageContext';
import CustomButton from './components/CustomButton';
import ConfirmDialog from './components/ConfirmDialog';

const PowerLawTransformationFilter = () => {
   const { modifiedImage, setModifiedImage } = useContext(ImageContext);
   const [isConfirming, setIsConfirming] = useState(false);
   const [unFilteredImage, setUnFilteredImage] = useState(modifiedImage);
   const [gamma, setGamma] = useState(1);

   const applyPowerLawTransformation = () => {
      setUnFilteredImage(modifiedImage);
      setGamma(1);
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
            data[i] = 255 * Math.pow(data[i] / 255, gamma);
            data[i + 1] = 255 * Math.pow(data[i + 1] / 255, gamma);
            data[i + 2] = 255 * Math.pow(data[i + 2] / 255, gamma);
         }

         ctx.putImageData(imageData, 0, 0);
         setModifiedImage(canvas.toDataURL());
      };
   }, [gamma, setModifiedImage, unFilteredImage]);

   return (
      <div>
         {!isConfirming ? (
            <CustomButton onClick={applyPowerLawTransformation} text={"Power-Law Trnasformation"} />
         ) : (
            <div className="bg-gray-200 text-gray-800 py-2 mb-2 rounded-lg px-4 pb-4 dark:bg-gray-500 dark:text-black">
               <h3 className="text-lg font-semibold mb-2">Power-Law Transformation</h3>

               <p>Adjust the gamma value:</p>
               <div className="flex items-center mb-4">
                  <input
                     type="range"
                     min="0"
                     max="5"
                     step="0.1"
                     value={gamma}
                     onChange={(e) => setGamma(Number(e.target.value))}
                     className="w-full"
                  />
                  <span className="ml-2">{gamma.toFixed(1)}</span>
               </div>
               <ConfirmDialog
                  message={"power-law transformation"}
                  onConfirm={confirmApply}
                  onCancel={cancelApply}
               />
            </div>
         )}
      </div>
   );
};

export default PowerLawTransformationFilter;