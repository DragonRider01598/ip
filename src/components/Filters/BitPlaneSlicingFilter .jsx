import React, { useState, useContext, useEffect } from 'react';
import { ImageContext } from '../../context/ImageContext';

const BitPlaneSlicingFilter = () => {
   const { modifiedImage, setModifiedImage } = useContext(ImageContext);
   const [isConfirming, setIsConfirming] = useState(false);
   const [unFilteredImage, setUnFilteredImage] = useState(modifiedImage);
   const [bitPlane, setBitPlane] = useState(0);

   const applyBitPlaneSlicing = () => {
      setUnFilteredImage(modifiedImage);
      setBitPlane(0);
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
            const redBit = (data[i] >> bitPlane) & 1;
            const greenBit = (data[i + 1] >> bitPlane) & 1;
            const blueBit = (data[i + 2] >> bitPlane) & 1;

            newData[i] = redBit * 255;
            newData[i + 1] = greenBit * 255;
            newData[i + 2] = blueBit * 255;
            newData[i + 3] = 255;
         }

         ctx.putImageData(newImageData, 0, 0);
         setModifiedImage(canvas.toDataURL());
      };
   }, [bitPlane, unFilteredImage]);

   return (
      <div>
         {!isConfirming ? (
            <button
               onClick={applyBitPlaneSlicing}
               className="w-full bg-blue-500 text-white py-2 mb-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
               Apply Bit Plane Slicing
            </button>
         ) : (
            <div className="bg-gray-200 text-gray-800 py-2 mb-2 rounded-lg px-4 pb-4">
               <h3 className="text-lg font-semibold mb-2">Apply Bit Plane Slicing</h3>

               <p>Adjust the bit plane (0-7):</p>
               <div className="flex items-center mb-4">
                  <input
                     type="range"
                     min="0"
                     max="7"
                     value={bitPlane}
                     onChange={(e) => setBitPlane(Number(e.target.value))}
                     className="w-full"
                  />
                  <span className="ml-2">{bitPlane}</span>
               </div>

               <p>Are you sure you want to apply the bit plane slicing filter?</p>
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

export default BitPlaneSlicingFilter;