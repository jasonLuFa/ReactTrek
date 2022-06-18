import React from "react";
import { FaTrash } from "react-icons/fa";

import { useGlobalContext } from "../context";
import { ACTIONS } from "../todoReducer";

const DeleteButton = ({ id }) => {
  const { dispatch, todos } = useGlobalContext();
  const { buttonStatus, isEdited } = todos;

  const handleDelete = (targetID) => {
    dispatch({ type: ACTIONS.DELETE_ITEM, payload: { targetID } });
  };
  return (
    <button
      disabled={buttonStatus.isDisabledDelete}
      type='button'
      className={isEdited ? "disabled-delete" : "delete-btn"}
      onClick={() => handleDelete(id)}
    >
      <FaTrash />
    </button>
  );
};

export default DeleteButton;
