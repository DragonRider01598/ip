import React, { useState, useContext } from 'react';
import { ImageContext } from '../../context/ImageContext';

const LowPassMedianFilter = () => {
   const { modifiedImage, setModifiedImage } = useContext(ImageContext);
   const [isConfirming, setIsConfirming] = useState(false);
   const [unFilteredImage, setUnFilteredImage] = useState(modifiedImage);

   const applyMedianFilter = () => {
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

         const getMedian = (values) => {
            values.sort((a, b) => a - b);
            const mid = Math.floor(values.length / 2);
            return values.length % 2 !== 0 ? values[mid] : (values[mid - 1] + values[mid]) / 2;
         };

         // Apply median filter (3x3 kernel)
         for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
               let rValues = [];
               let gValues = [];
               let bValues = [];
               for (let dy = -1; dy <= 1; dy++) {
                  for (let dx = -1; dx <= 1; dx++) {
                     const pixel = getPixel(x + dx, y + dy);
                     rValues.push(pixel.r);
                     gValues.push(pixel.g);
                     bValues.push(pixel.b);
                  }
               }
               const medianR = getMedian(rValues);
               const medianG = getMedian(gValues);
               const medianB = getMedian(bValues);
               setPixel(x, y, medianR, medianG, medianB);
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
               onClick={applyMedianFilter}
               className="w-full bg-blue-500 text-white py-2 mb-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
               Apply Low-Pass Median Filter
            </button>
         ) : (
            <div className="bg-gray-200 text-gray-800 py-2 mb-2 rounded-lg px-4 pb-4">
               <h3 className="text-lg font-semibold mb-2">Apply Low-Pass Median Filter</h3>
               <p>Are you sure you want to apply the low-pass median filter?</p>
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

export default LowPassMedianFilter;