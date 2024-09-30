const ConfirmDialog = ({ message, onConfirm, onCancel, customMessage }) => (

   <div >
      {customMessage ? (
         <p>{customMessage}</p>
      ) : (
         <p>Are you sure you want to apply the {message} filter?</p>
      )}
      <div className="flex justify-between mt-4">
         <button
            onClick={onConfirm}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
         >
            Apply
         </button>
         <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
         >
            Cancel
         </button>
      </div>
   </div>
);

export default ConfirmDialog;