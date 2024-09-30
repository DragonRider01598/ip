import React, { useState, useContext, useEffect } from 'react';
import { ImageContext } from '../../context/ImageContext';
import ConfirmDialog from './components/ConfirmDialog';
import CustomButton from './components/CustomButton';

const HistogramEqualizationFilter = () => {
   const { modifiedImage, setModifiedImage } = useContext(ImageContext);
   const [isConfirming, setIsConfirming] = useState(false);
   const [unFilteredImage, setUnFilteredImage] = useState(modifiedImage);
   const [channel, setChannel] = useState('grayscale'); 

   const applyEqualization = () => {
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

         const hist = new Array(256).fill(0);
         for (let i = 0; i < data.length; i += 4) {
            const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
            hist[gray]++;
         }

         let cdf = [...hist];
         for (let i = 1; i < 256; i++) {
            cdf[i] += cdf[i - 1];
         }

         const cdfMin = Math.min(...cdf);
         const totalPixels = data.length / 4;

         for (let i = 0; i < data.length; i += 4) {
            let eqVal;
            if (channel === 'grayscale') {
               const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
               eqVal = Math.round((cdf[gray] - cdfMin) / (totalPixels - cdfMin) * 255);
               data[i] = data[i + 1] = data[i + 2] = eqVal;
            } else if (channel === 'rgb') {
               for (let j = 0; j < 3; j++) {
                  eqVal = Math.round((cdf[data[i + j]] - cdfMin) / (totalPixels - cdfMin) * 255);
                  data[i + j] = eqVal;
               }
            } else {
               const channelIndex = channel === 'red' ? 0 : channel === 'green' ? 1 : 2;
               eqVal = Math.round((cdf[data[i + channelIndex]] - cdfMin) / (totalPixels - cdfMin) * 255);
               data[i + channelIndex] = eqVal;
            }
         }

         ctx.putImageData(imageData, 0, 0);
         setModifiedImage(canvas.toDataURL());
      };
   }, [channel, setModifiedImage, unFilteredImage]);

   return (
      <div>
         {!isConfirming ? (
            <CustomButton onClick={applyEqualization} text={"Histogram Equalization"}/>
         ) : (
            <div className="dark:bg-gray-500 dark:text-black bg-gray-200 text-gray-800 py-2 mb-2 rounded-lg px-4 pb-4">
               <h3 className="text-lg font-semibold mb-2">Adjust Histogram Equalization</h3>

               <p>Adjust the channel for Equalization:</p>
               <div className="mb-4">
                  <select
                     value={channel}
                     onChange={(e) => setChannel(e.target.value)}
                     className="w-full p-2 border dark:bg-gray-500 dark:text-black bg-gray-200 text-gray-800 dark:border-black border-gray-500 rounded-lg"
                  >
                     <option value="grayscale">Grayscale</option>
                     <option value="rgb">RGB</option>
                     <option value="red">Red</option>
                     <option value="green">Green</option>
                     <option value="blue">Blue</option>
                  </select>
               </div>
               <ConfirmDialog
                  message={"histogram equalization"}
                  onConfirm={confirmApply}
                  onCancel={cancelApply}
               />
            </div>
         )}
      </div>
   );
};

export default HistogramEqualizationFilter;