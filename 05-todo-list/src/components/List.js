import React from "react";
import { useGlobalContext } from "../context";
import TodoItem from "./TodoItem";

const List = () => {
  const { todos } = useGlobalContext();
  const { items } = todos;

  return (
    <div className='todo-list-contaienr'>
      {items.map((item) => {
        return <TodoItem key={item.id} item={item} />;
      })}
    </div>
  );
};

export default List;
