import React from "react";
import { useGlobalContext } from "../context";
import { FaRegTimesCircle } from "react-icons/fa";

import { ACTIONS } from "../todoReducer";

const CancelButton = ({ id }) => {
  const { dispatch, todos, setInput } = useGlobalContext();
  const { isEdited, editID } = todos;

  const handleCancel = (targetID) => {
    setInput("");
    dispatch({ type: ACTIONS.CANCEL_EDIT_ITEM, payload: { targetID } });
  };

  return (
    <>
      {isEdited && editID === id && (
        <button
          type='button'
          className='cancel-btn'
          onClick={() => handleCancel(id)}
        >
          <FaRegTimesCircle />
        </button>
      )}
    </>
  );
};

export default CancelButton;
