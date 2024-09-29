import React, { useState, useContext, useEffect } from 'react';
import { ImageContext } from '../../context/ImageContext';

const CustomMaskFilter = () => {
   const { modifiedImage, setModifiedImage } = useContext(ImageContext);
   const [isConfirming, setIsConfirming] = useState(false);
   const [unFilteredImage, setUnFilteredImage] = useState(modifiedImage);
   const [kernel, setKernel] = useState([
      [1, 1, 1],
      [1, 2, 1],
      [1, 1, 1]
   ]);

   const handleKernelChange = (row, col, value) => {
      const newKernel = [...kernel];
      newKernel[row][col] = parseFloat(value);
      setKernel(newKernel);
   };

   const applyCustomMaskFilter = () => {
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

         for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
               let sumR = 0, sumG = 0, sumB = 0, count = 0;
               for (let dy = -1; dy <= 1; dy++) {
                  for (let dx = -1; dx <= 1; dx++) {
                     const pixel = getPixel(x + dx, y + dy);
                     const weight = kernel[dy + 1][dx + 1];
                     sumR += pixel.r * weight;
                     sumG += pixel.g * weight;
                     sumB += pixel.b * weight;
                     count += weight
                  }
               }
               sumR = sumR / count;
               sumG = sumG / count;
               sumB = sumB / count;

               const newR = Math.min(Math.max(sumR, 0), 255);
               const newG = Math.min(Math.max(sumG, 0), 255);
               const newB = Math.min(Math.max(sumB, 0), 255);

               setPixel(x, y, newR, newG, newB);
            }
         }

         ctx.putImageData(imageData, 0, 0);
         setModifiedImage(canvas.toDataURL());
      };
   }, [kernel, unFilteredImage, setModifiedImage]);

   return (
      <div>
         {!isConfirming ? (
            <div>
               <button
                  onClick={applyCustomMaskFilter}
                  className="w-full bg-blue-500 text-white py-2 mb-2 rounded-lg hover:bg-blue-600 transition-colors"
               >
                  Apply Custom Mask Filter
               </button>
            </div>
         ) : (
            <div className="bg-gray-200 text-gray-800 py-2 mb-2 rounded-lg px-4 pb-4">
               <h3 className="text-lg font-semibold mb-2">Apply Custom Mask Filter</h3>
               <p>Adjust the kernel:</p>
               <div className="grid grid-cols-3 gap-2 mb-4">
                  {kernel.map((row, rowIndex) => (
                     row.map((value, colIndex) => (
                        <input
                           key={`${rowIndex}-${colIndex}`}
                           type="number"
                           step="any"
                           value={value}
                           onChange={(e) => handleKernelChange(rowIndex, colIndex, e.target.value)}
                           className="w-full border rounded-lg p-2"
                        />
                     ))
                  ))}
               </div>
               <p>Are you sure you want to apply the high-pass filter?</p>
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

export default CustomMaskFilter;