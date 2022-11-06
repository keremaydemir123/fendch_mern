import React from "react";

function SettingsModal({ children, open, onClose }) {
  if (!open) {
    document.body.className = "overflow-visible";
    return null;
  }
  document.body.className = "overflow-hidden";

  return (
    <div
      className="overlay absolute w-screen h-screen top-0 left-0 bottom-0 right-0 bg-slate-800 bg-opacity-80 z-10"
      onClick={onClose}
    >
      <div
        className="modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-max bg-blue-200 p-8 z-50 rounded-lg min-w-[300px]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default SettingsModal;
