import { useRef, useEffect } from "react";
import { useGlobalContext } from "../context";
import { ACTIONS } from "../todoReducer";

const TodoInput = () => {
  const { todos, dispatch, input, setInput } = useGlobalContext();
  const { isEdited, items } = todos;
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.SUBMIT_ITEM, payload: { input } });
  };

  useEffect(() => {
    const endOfInput = inputRef.current.value.length;
    inputRef.current.setSelectionRange(endOfInput, endOfInput);
    inputRef.current.focus();
  });

  useEffect(() => {
    if (!isEdited) {
      setInput("");
    }
  }, [isEdited, setInput, items]);

  return (
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
  );
};

export default TodoInput;
