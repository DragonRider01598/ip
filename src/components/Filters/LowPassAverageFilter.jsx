import React, { useState, useContext, useEffect } from 'react';
import { ImageContext } from '../../context/ImageContext';

const LowPassAverageFilter = () => {
   const { modifiedImage, setModifiedImage } = useContext(ImageContext);
   const [isConfirming, setIsConfirming] = useState(false);
   const [unFilteredImage, setUnFilteredImage] = useState(modifiedImage);
   const [filterSize, setFilterSize] = useState(3); // Default filter size

   const applyLowPassFilter = () => {
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

         const halfSize = Math.floor(filterSize / 2);

         for (let y = halfSize; y < height - halfSize; y++) {
            for (let x = halfSize; x < width - halfSize; x++) {
               let sumR = 0, sumG = 0, sumB = 0;
               let count = 0;
               
               for (let dy = -halfSize; dy <= halfSize; dy++) {
                  for (let dx = -halfSize; dx <= halfSize; dx++) {
                     const pixel = getPixel(x + dx, y + dy);
                     sumR += pixel.r;
                     sumG += pixel.g;
                     sumB += pixel.b;
                     count++;
                  }
               }

               const avgR = sumR / count;
               const avgG = sumG / count;
               const avgB = sumB / count;
               setPixel(x, y, avgR, avgG, avgB);
            }
         }

         ctx.putImageData(imageData, 0, 0);
         setModifiedImage(canvas.toDataURL());
      };
   },[filterSize, unFilteredImage, setModifiedImage])
   return (
      <div>
         {!isConfirming ? (
            <div>
               <button
                  onClick={applyLowPassFilter}
                  className="w-full bg-blue-500 text-white py-2 mb-2 rounded-lg hover:bg-blue-600 transition-colors"
               >
                  Apply Low-Pass Average Filter
               </button>
            </div>
         ) : (
            <div className="bg-gray-200 text-gray-800 py-2 mb-2 rounded-lg px-4 pb-4">
               <h3 className="text-lg font-semibold mb-2">Apply Low-Pass Average Filter</h3>
               <label className="block mb-2 text-gray-700">Filter Size: {filterSize}</label>
               <input
                  type="range"
                  min="3"
                  max="15"
                  step="1"
                  value={filterSize}
                  onChange={(e) => setFilterSize(Number(e.target.value))}
                  className="w-full mb-4"
               />
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