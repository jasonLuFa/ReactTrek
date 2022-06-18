import React from "react";
import { ACTIONS } from "../todoReducer";
import { useGlobalContext } from "../context";

const DecreaseButton = ({ id }) => {
  const { dispatch } = useGlobalContext();
  return (
    <button
      className='amount-btn'
      onClick={() =>
        dispatch({ type: ACTIONS.DECREASE_POMODORO, payload: { targetID: id } })
      }
    >
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
        <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
      </svg>
    </button>
  );
};

export default DecreaseButton;
