import React from "react";
import { FaEdit, FaTrash, FaRegTimesCircle } from "react-icons/fa";
import { useGlobalContext } from "../context";
import { ACTIONS } from "../todoReducer";

const EditButton = ({ id }) => {
  const { dispatch, todos, setInput } = useGlobalContext();

  const handleEdit = (targetID) => {
    const editItem = todos.items.find((item) => item.id === targetID);
    setInput(editItem.name);
    dispatch({ type: ACTIONS.EDIT_ITEM, payload: { targetID } });
  };

  return (
    <button type='button' className='edit-btn' onClick={() => handleEdit(id)}>
      <FaEdit />
    </button>
  );
};

export default EditButton;
