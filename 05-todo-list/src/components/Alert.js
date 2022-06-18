import React, { useEffect } from "react";
import { useGlobalContext } from "../context";
import { ACTIONS } from "../todoReducer";

const Alert = () => {
  const { todos, dispatch, input, setInput } = useGlobalContext();
  const { alert } = todos;

  useEffect(() => {
    const closeAlert = () => {
      dispatch({ type: ACTIONS.CLOSE_ALERT });
    };
    const timeout = setTimeout(() => closeAlert(), 2000);
    return () => clearTimeout(timeout);
  }, [dispatch]);

  return <p className={`alert ${alert.type}`}>{alert.message}</p>;
};

export default Alert;
