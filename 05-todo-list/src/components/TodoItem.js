import React from "react";
import { GiTomato } from "react-icons/gi";
import DecreaseButton from "./DecreaseButton";
import IncreaseButton from "./IncreaseButton";
import { useGlobalContext } from "../context";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import CancelButton from "./CancelButton";

const TodoItem = ({ item }) => {
  const { todos } = useGlobalContext();
  const { isEdited, editID } = todos;
  const { id, name, pomodoros } = item;

  const displayTomatoes = () => {
    const row = [];
    for (let index = 0; index < pomodoros.amount; index++) {
      row.push(
        <GiTomato
          key={index}
          style={{
            color: "#ff6347",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        />
      );
    }
    return row;
  };

  return (
    <div className='todo-list-contaienr'>
      <div key={id} className='todo-item-container'>
        <div className='amount-btn-container'>
          <IncreaseButton id={id} />
          <p className='amount'>{pomodoros.amount}</p>
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
          {displayTomatoes()}
          {/*
          <GiTomato
            style={{
              color: "grey",
              fontSize: "1.2rem",
              cursor: "not-allowed",
            }}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
