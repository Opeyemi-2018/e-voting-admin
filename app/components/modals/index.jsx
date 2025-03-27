import React from "react";

const Modal = ({ isOpen, onClose, onProceed, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Background overlay with transparency and blur */}
      <div className="absolute inset-0 bg-black/50 "></div>

      {/* Modal Content with smooth fade-in and scale effect */}
      <div className="relative bg-white p-6 rounded-lg w-4/5 max-w-md shadow-lg transition-all duration-300 transform scale-100 opacity-100">
        <h2 className="text-lg mb-6">{title || "Alert"}</h2>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 rounded bg-[#f5e3d6] hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onProceed}
            className="bg-[#e57226] text-white px-4 py-2 rounded hover:bg-[#d89c75]"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
