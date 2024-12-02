import React from 'react';
import './Modal.css'; // Import CSS file for styling

function Modal({ isVisible, onClose, children }) {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
