import React, { useState, useContext, useReducer, useRef } from "react";
import { getLocalStorage } from "./utils";
import { todoReducer } from "./todoReducer";
import { pomodoroReducer } from "./pomodoroReducer";

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
  const [pomodoro, pomodoroDispatch] = useReducer(pomodoroReducer, {
    isShowPomodoroSettings: false,
    isOpenPomodoro: false,
    targetItemID: "",
    settingInfo: {
      workMinutes: 45,
      breakMinutes: 15,
    },
  });
  const [input, setInput] = useState("");
  const inputRef = useRef();
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);

  return (
    <AppContext.Provider
      value={{
        todos,
        inputRef,
        input,
        setInput,
        dispatch,
        isOpenWarningModal,
        setIsOpenWarningModal,
        pomodoro,
        pomodoroDispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
