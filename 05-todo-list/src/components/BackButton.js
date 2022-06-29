import React from "react";
import { useGlobalContext } from "../context";
import { POMODORO_ACTIONS } from "../pomodoroReducer";

const BackButton = () => {
  const { pomodoroDispatch } = useGlobalContext();

  return (
    <button
      className='back-btn'
      onClick={() =>
        pomodoroDispatch({ type: POMODORO_ACTIONS.CLOSE_POMODORO_SETTING })
      }
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-5 w-5'
        viewBox='0 0 20 20'
        fill='currentColor'
      >
        <path
          fillRule='evenodd'
          d='M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z'
          clipRule='evenodd'
        />
      </svg>
      <p>Back</p>
    </button>
  );
};

export default BackButton;
