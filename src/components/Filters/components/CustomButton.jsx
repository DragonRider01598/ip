const CustomButton = ({ onClick, text }) => (
   <button
      onClick={onClick}
      className="w-full bg-blue-500 text-white py-2 mb-2 rounded-lg hover:bg-blue-600 transition-colors dark:bg-blue-700 dark:hover:bg-blue-800"
   >
      {text}
   </button>
);

export default CustomButton;