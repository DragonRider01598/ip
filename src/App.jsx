import React from 'react';
import { ImageProvider } from './context/ImageContext';
import { ThemeProvider } from './context/ThemeContext';
import UploadImage from './components/UploadImage';
import ImageDisplay from './components/ImageDisplay';
import FilterList from './components/FilterList';
import DarkModeToggle from './components/DarkModeToggle';

const App = () => {
  return (
    <ImageProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center p-4 transition-colors duration-300">
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl rounded-lg p-8 transition-colors duration-300">
          <div className='w-full flex flex-col lg:flex-row items-center justify-between py-4 lg:py-8 px-4 lg:px-0 space-y-6 lg:space-y-0 lg:space-x-6'>
            <h1 className="text-4xl font-extrabold text-center lg:text-left mb-4 lg:mb-0 text-blue-500 dark:text-blue-400 transition-colors duration-300">
              Image Processor
            </h1>
            <div className='flex items-center justify-center lg:justify-end'>
              <ThemeProvider>
                <DarkModeToggle />
              </ThemeProvider>
            </div>
          </div>

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