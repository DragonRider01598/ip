import React, { useState, useContext } from 'react';
import { ImageContext } from '../../context/ImageContext';

const LowPassAverageFilter = () => {
   const { modifiedImage, setModifiedImage } = useContext(ImageContext);
   const [isConfirming, setIsConfirming] = useState(false);
   const [unFilteredImage, setUnFilteredImage] = useState(modifiedImage);

   const applyLowPassFilter = () => {
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

         const width = canvas.width;
         const height = canvas.height;

         const getPixel = (x, y) => {
            const index = (y * width + x) * 4;
            return { r: data[index], g: data[index + 1], b: data[index + 2] };
         };

         const setPixel = (x, y, r, g, b) => {
            const index = (y * width + x) * 4;
            data[index] = r;
            data[index + 1] = g;
            data[index + 2] = b;
         };

         // Apply low-pass filter (3x3 kernel)
         for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
               let sumR = 0, sumG = 0, sumB = 0;
               for (let dy = -1; dy <= 1; dy++) {
                  for (let dx = -1; dx <= 1; dx++) {
                     const pixel = getPixel(x + dx, y + dy);
                     sumR += pixel.r;
                     sumG += pixel.g;
                     sumB += pixel.b;
                  }
               }
               const avgR = sumR / 9;
               const avgG = sumG / 9;
               const avgB = sumB / 9;
               setPixel(x, y, avgR, avgG, avgB);
            }
         }

         ctx.putImageData(imageData, 0, 0);
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
            <button
               onClick={applyLowPassFilter}
               className="w-full bg-blue-500 text-white py-2 mb-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
               Apply Low-Pass Average Filter
            </button>
         ) : (
            <div className="bg-gray-200 text-gray-800 py-2 mb-2 rounded-lg px-4 pb-4">
               <h3 className="text-lg font-semibold mb-2">Apply Low-Pass Average Filter</h3>
               <p>Are you sure you want to apply the low-pass average filter?</p>
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

export default LowPassAverageFilter;