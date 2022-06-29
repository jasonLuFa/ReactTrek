import React from "react";
import { GiTomato } from "react-icons/gi";
import DecreaseButton from "./DecreaseButton";
import IncreaseButton from "./IncreaseButton";
import { useGlobalContext } from "../context";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import CancelButton from "./CancelButton";

const TodoItem = ({ item }) => {
  const {
    todos: { isEdited, editID },
    setIsOpenWarningModal,
  } = useGlobalContext();
  const { id, name, pomodoros } = item;

  const displayFinishedPomodoros = () => {
    const pomodors = [];
    for (
      let index = 0;
      index < pomodoros.totalAmount - pomodoros.unfinishedAmount;
      index++
    ) {
      pomodors.push(
        <GiTomato
          key={index}
          style={{
            color: "rgb(137, 126, 126)",
            fontSize: "1.2rem",
            cursor: "not-allowed",
          }}
        />
      );
    }
    return pomodors;
  };

  const displayUnfinishedPomodoros = () => {
    const pomodors = [];
    for (let index = 0; index < pomodoros.unfinishedAmount; index++) {
      pomodors.push(
        <GiTomato
          key={index}
          style={{
            color: "#ff6347",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
          onClick={() => setIsOpenWarningModal(true)}
        />
      );
    }
    return pomodors;
  };
  return (
    <div className='todo-list-contaienr'>
      <div key={id} className='todo-item-container'>
        <div className='amount-btn-container'>
          <IncreaseButton id={id} />
          <DecreaseButton id={id} />
        </div>
        <div
          className={`todo-item ${
            isEdited && editID === id ? "todo-item-selected" : ""
          }`}
        >
          <p className='title'>{name}</p>
          <div className='btn-container'>
            <CancelButton id={id} />
            <EditButton id={id} />
            <DeleteButton id={id} />
          </div>
        </div>
        <div className='tomatoes'>
          {displayUnfinishedPomodoros()}
          {displayFinishedPomodoros()}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
