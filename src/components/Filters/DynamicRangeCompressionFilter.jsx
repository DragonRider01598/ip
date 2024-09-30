import React, { useState, useContext, useEffect } from 'react';
import { ImageContext } from '../../context/ImageContext';
import CustomButton from './components/CustomButton';
import ConfirmDialog from './components/ConfirmDialog';

const DynamicRangeCompressionFilter = () => {
   const { modifiedImage, setModifiedImage } = useContext(ImageContext);
   const [isConfirming, setIsConfirming] = useState(false);
   const [unFilteredImage, setUnFilteredImage] = useState(modifiedImage);
   const [compressionFactor, setCompressionFactor] = useState(1);

   const applyDynamicRangeCompression = () => {
      setUnFilteredImage(modifiedImage);
      setCompressionFactor(1);
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
            const compressedIntensity = intensity / (1 + compressionFactor * (intensity / 255));

            newData[i] = compressedIntensity;
            newData[i + 1] = compressedIntensity;
            newData[i + 2] = compressedIntensity;
            newData[i + 3] = 255;
         }

         ctx.putImageData(newImageData, 0, 0);
         setModifiedImage(canvas.toDataURL());
      };
   }, [compressionFactor, unFilteredImage, setModifiedImage]);

   return (
      <div>
         {!isConfirming ? (
            <CustomButton onClick={applyDynamicRangeCompression} text={"Dynamic Range Compression"} />
         ) : (
            <div className="dark:bg-gray-500 dark:text-black bg-gray-200 text-gray-800 py-2 mb-2 rounded-lg px-4 pb-4">
               <h3 className="text-lg font-semibold mb-2">Dynamic Range Compression</h3>

               <p>Adjust the compression factor:</p>
               <div className="flex items-center mb-4">
                  <input
                     type="range"
                     min="0"
                     max="10"
                     step="0.1"
                     value={compressionFactor}
                     onChange={(e) => setCompressionFactor(Number(e.target.value))}
                     className="w-full"
                  />
                  <span className="ml-2">{compressionFactor.toFixed(1)}</span>
               </div>
               <ConfirmDialog
                  message={"dyanamic range compression"}
                  onConfirm={confirmApply}
                  onCancel={cancelApply}
               />
            </div>
         )}
      </div>
   );
};

export default DynamicRangeCompressionFilter;