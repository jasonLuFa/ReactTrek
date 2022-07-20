import React from "react";
import { useGlobalContext } from "../context";

const WarningModal = ({ message, handleSure, handleCancel }) => {
  const { isOpenWarningModal, setIsOpenWarningModal } = useGlobalContext();

  return (
    <div
      className={`${
        isOpenWarningModal ? "modal-container isOpen" : "modal-container"
      }`}
    >
      <div className="modal-content">
        <h4>{message}</h4>
        <div className="warning-button-container">
          <button className="cancel-btn" onClick={handleCancel}>
            cancel
          </button>
          <button className="sure-btn" onClick={handleSure}>
            sure
          </button>
        </div>
      </div>
    </div>
  );
};
export default WarningModal;
