import React, { useState, useContext, useReducer, useRef } from "react";
import { getLocalStorage } from "./utils";
import { todoReducer } from "./todoReducer";

const AppContext = React.createContext();

const setupItems = () => getLocalStorage() ?? [];

const setupButtonStatus = (items) => {
  const isDisabledClear = items.length === 0 ? true : false;
  return { isDisabledClear, isDisabledDelete: false };
};

const AppProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, {
    items: setupItems(),
    buttonStatus: setupButtonStatus(setupItems()),
    alert: { isShow: false, message: "", type: "" },
    isEdited: false,
    editID: "",
  });

  const [input, setInput] = useState("");
  const inputRef = useRef();
  return (
    <AppContext.Provider value={{ todos, inputRef, input, setInput, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
