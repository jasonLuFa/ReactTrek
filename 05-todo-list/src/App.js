import { useState, useRef, useEffect } from 'react';
import Alert from './Alert';
import './App.css';
import List from './List';
import { getLocalStorage, setLocalStorage } from './utils';

const setupButtonStatus = (items) => {
  const isDisabledClear = items.length === 0 ? true : false;
  return { isDisabledClear, isDisabledDelete: false };
};

function App() {
  const [isEdited, setIsEdited] = useState(false);
  const [editID, setEditID] = useState('');
  const [input, setInput] = useState('');
  const [items, setItems] = useState(() => getLocalStorage() ?? []);
  const inputRef = useRef();
  const [buttonStatus, setButtonStatus] = useState(() =>
    setupButtonStatus(items)
  );
  const [alert, setAlert] = useState({ isShow: false, message: '', type: '' });

  const handleEmpty = () => {
    if (!input) {
      setAlert({
        isShow: true,
        message: 'please enter value',
        type: 'alert-danger',
      });
    }
  };

  const handleAdd = () => {
    if (input && !isEdited) {
      const newItem = { id: new Date().getTime().toString(), name: input };
      setItems([...items, newItem]);
      setLocalStorage([...items, newItem]);
      setInput('');
      setButtonStatus({ ...buttonStatus, isDisabledClear: false });
      setAlert({
        isShow: true,
        message: 'add item',
        type: 'alert-success',
      });
    }
  };

  const handleEdit = () => {
    if (input && isEdited) {
      const newItem = items.map((item) =>
        item.id === editID ? { ...item, name: input } : item
      );
      setItems(newItem);
      setLocalStorage(newItem);
      setIsEdited(false);
      setButtonStatus({ isDisabledDelete: false, isDisabledClear: false });
      setInput('');
      setAlert({
        isShow: true,
        message: 'finished edit',
        type: 'alert-success',
      });
    }
  };

  const isNameDuplicate = () => {
    return items.filter((item) => item.name === input).length > 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNameDuplicate()) {
      setAlert({
        isShow: true,
        message: 'name duplicate',
        type: 'alert-danger',
      });
      return;
    }
    handleEmpty();
    handleAdd();
    handleEdit();
  };

  const clearItems = () => {
    setItems([]);
    setLocalStorage([]);
    setButtonStatus({ ...buttonStatus, isDisabledClear: true });
    setAlert({ isShow: true, message: 'clear items', type: 'alert-danger' });
  };

  useEffect(() => {
    const endOfInput = inputRef.current.value.length;
    inputRef.current.setSelectionRange(endOfInput, endOfInput);
    inputRef.current.focus();
  });

  return (
    <section>
      <div className='section-center'>
        {alert.isShow && (
          <Alert alert={alert} setAlert={setAlert} inputRef={inputRef} />
        )}
        <form className='todo-list-form' onSubmit={handleSubmit}>
          <h3>Todo list</h3>
          <div className='form-control'>
            <input
              type='text'
              className='todo-list-form-input'
              placeholder='e.g. reading'
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className='submit-btn'>submit</button>
          </div>
        </form>
        <List
          buttonStatus={buttonStatus}
          items={items}
          setItems={setItems}
          isEdited={isEdited}
          setIsEdited={setIsEdited}
          setButtonStatus={setButtonStatus}
          editID={editID}
          setEditID={setEditID}
          setInput={setInput}
        />
        <button
          onClick={clearItems}
          disabled={buttonStatus.isDisabledClear}
          className={
            buttonStatus.isDisabledClear ? 'disabled-clear' : 'clear-btn'
          }
        >
          clear items
        </button>
      </div>
    </section>
  );
}

export default App;
