import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
   const [isDarkMode, setIsDarkMode] = useState(() => {
      const storedValue = localStorage.getItem('dark-mode');
      return storedValue === 'true';
   });

   useEffect(() => {
      localStorage.setItem('dark-mode', isDarkMode);
      document.documentElement.classList.toggle('dark', isDarkMode);
   }, [isDarkMode]);

   return (
      <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
         {children}
      </ThemeContext.Provider>
   );
};