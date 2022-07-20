import React, { useState, useContext, useReducer, useRef } from "react";
import { getLocalStorage } from "./utils";
import { todoReducer } from "./todoReducer";
import { pomodoroReducer } from "./pomodoroReducer";
import useAudio from "./customState/useAudio";
import alarmClock from "./sound/alarm-clock.mp3";

const AppContext = React.createContext();

const setupItems = () => getLocalStorage("item") ?? [];
const setupPomodoroSettingInfo = () =>
  getLocalStorage("pomodoroSettingInfo") ?? {
    workMinutes: 45,
    breakMinutes: 15,
  };

const setupButtonStatus = (items) => {
  const isDisabledClear = items.length === 0 ? true : false;
  return { isDisabledClear, isDisabledDelete: false };
};

const todoInitial = {
  // [{id ,name , pomodoros:{totalAmount, unfinishedAmount}},...]
  items: setupItems(),
  // { isDisabledClear, isDisabledDelete}
  buttonStatus: setupButtonStatus(setupItems()),
  alert: { isShow: false, message: "", type: "" },
  isEdited: false,
  editID: "",
};

const pomodoroInitial = {
  isShowPomodoroSettings: false,
  isOpenPomodoro: false,
  targetItemId: "",
  settingInfo: setupPomodoroSettingInfo(),
  pomodoroInfo: {
    isPause: true,
    isStop: true,
  },
};

const AppProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, todoInitial);
  const [pomodoro, pomodoroDispatch] = useReducer(
    pomodoroReducer,
    pomodoroInitial
  );
  const [input, setInput] = useState("");
  const inputRef = useRef();
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
  const [pomodoroCycle, setPomodoroCycle] = useState({
    itemId: "",
    isFinished: false,
  });
  const [, setIsAlarming] = useAudio(alarmClock);

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
        pomodoroCycle,
        setPomodoroCycle,
        setIsAlarming,
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
