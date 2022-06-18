import { useGlobalContext } from "../context";
import { ACTIONS } from "../todoReducer";
const ClearButton = () => {
  const { todos, dispatch, setInput } = useGlobalContext();
  const { buttonStatus } = todos;

  const handleClear = () => {
    dispatch({ type: ACTIONS.CLEAR_ITEMS });
    setInput("");
  };

  return (
    <button
      onClick={handleClear}
      disabled={buttonStatus.isDisabledClear}
      className={buttonStatus.isDisabledClear ? "disabled-clear" : "clear-btn"}
    >
      clear items
    </button>
  );
};

export default ClearButton;
