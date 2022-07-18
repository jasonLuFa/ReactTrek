import React from "react";
import { useGlobalContext } from "../context";
import { POMODORO_ACTIONS } from "../pomodoroReducer";

const StopButton = () => {
  const { setIsOpenWarningModal } = useGlobalContext();

  return (
    <button className="stop-btn" onClick={() => setIsOpenWarningModal(true)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default StopButton;
