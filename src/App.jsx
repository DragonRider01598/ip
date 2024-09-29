import React from 'react';
import { ImageProvider } from './context/ImageContext';
import UploadImage from './components/UploadImage';
import ImageDisplay from './components/ImageDisplay';
import FilterList from './components/FilterList';

const App = () => {
  return (
    <ImageProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
            Image Processor
          </h1>

          <div className="mb-6 flex justify-center">
            <ImageDisplay />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <FilterList />
            <UploadImage />
          </div>
        </div>
      </div>
    </ImageProvider>
  );
};

export default App;