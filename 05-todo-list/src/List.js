import React from 'react';
import { FaEdit, FaTrash, FaRegTimesCircle } from 'react-icons/fa';
import { setLocalStorage } from './utils';

const List = ({
  editID,
  buttonStatus,
  setButtonStatus,
  setInput,
  isEdited,
  setIsEdited,
  setEditID,
  items,
  setItems,
}) => {
  const deleteItem = (targetId) => {
    const newItems = items.filter((item) => item.id !== targetId);
    setItems(newItems);
    setLocalStorage(newItems);
    if (newItems.length === 0) {
      setButtonStatus({ ...buttonStatus, isDisabledClear: true });
    }
  };

  const cancelEdit = (targetId) => {
    if (editID === targetId) {
      setButtonStatus({ isDisabledClear: false, isDisabledDelete: false });
      setInput('');
      setIsEdited(false);
    }
  };

  const editItem = (targetId) => {
    const editItem = items.find((item) => item.id === targetId);
    setEditID(targetId);
    setButtonStatus({
      isDisabledClear: true,
      isDisabledDelete: true,
    });
    setInput(editItem.name);
    setIsEdited(true);
  };
  return (
    <div className='todo-list-contaienr'>
      {items.map((item) => {
        const { id, name } = item;
        return (
          <div
            key={id}
            className={`todo-item ${
              isEdited && editID === id ? 'todo-item-selected' : ''
            }`}
          >
            <p className='title'>{name}</p>
            <div className='btn-container'>
              {isEdited && editID === id && (
                <button
                  type='button'
                  className='cancel-btn'
                  onClick={() => cancelEdit(id)}
                >
                  <FaRegTimesCircle />
                </button>
              )}
              <button
                type='button'
                className='edit-btn'
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                disabled={buttonStatus.isDisabledDelete}
                type='button'
                className={isEdited ? 'disabled-delete' : 'delete-btn'}
                onClick={() => deleteItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
