import React, { useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';

const DarkModeToggle = () => {
   const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

   const toggleDarkMode = () => {
      setIsDarkMode((curr) => !curr);
   };

   return (
      <label className="relative inline-flex items-center cursor-pointer">
         <input
            type="checkbox"
            className="sr-only"
            checked={isDarkMode}
            onChange={toggleDarkMode}
         />
         <div
            className={`w-20 h-10 border border-blue-400 dark:border-gray-700 rounded-full transition-colors duration-300 flex items-center justify-between px-2 bg-blue-200 dark:bg-gray-800 shadow-lg`}
         >
            <FaMoon
               className={`h-5 w-5 text-gray-300 transition-opacity duration-300 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}
            />
            <FaSun
               className={`h-5 w-5 text-yellow-400 transition-opacity duration-300 ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}
            />

            <div
               className={`absolute left-1 top-1 w-8 h-8 bg-white dark:bg-gray-500 rounded-full shadow-lg transform transition-transform duration-300 ${isDarkMode ? 'translate-x-10' : 'translate-x-0'
                  }`}
            />
         </div>

      </label>
   );
};

export default DarkModeToggle;
