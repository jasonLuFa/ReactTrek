import { setLocalStorage } from "./utils";

export const pomodoroReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case POMODORO_ACTIONS.OPEN_POMODORO:
      return {
        ...state,
        isOpenPomodoro: true,
      };

    case POMODORO_ACTIONS.SET_ITEM_ID:
      return {
        ...state,
        targetItemId: payload.targetItemId,
      };

    case POMODORO_ACTIONS.REMOVE_ITEM_ID:
      return {
        ...state,
        targetItemId: "",
      };

    case POMODORO_ACTIONS.CLOSE_POMODORO:
      return {
        ...state,
        pomodoroInfo: { isPause: true },
        isOpenPomodoro: false,
      };

    case POMODORO_ACTIONS.OPEN_POMODORO_SETTING:
      return { ...state, isShowPomodoroSettings: true };

    case POMODORO_ACTIONS.CLOSE_POMODORO_SETTING:
      setLocalStorage("pomodoroSettingInfo", state.settingInfo);
      return { ...state, isShowPomodoroSettings: false };

    case POMODORO_ACTIONS.CHANGE_WORK_MINUTES:
      return {
        ...state,
        settingInfo: {
          ...state.settingInfo,
          workMinutes: payload.newWorkMinutes,
        },
      };

    case POMODORO_ACTIONS.CHANGE_BREAK_MINUTES:
      return {
        ...state,
        settingInfo: {
          ...state.settingInfo,
          breakMinutes: payload.newBreakMinutes,
        },
      };

    case POMODORO_ACTIONS.PAUSE_POMODORO:
      return {
        ...state,
        pomodoroInfo: {
          ...state.pomodoroInfo,
          isPause: true,
        },
      };

    case POMODORO_ACTIONS.START_POMODORO:
      return {
        ...state,
        pomodoroInfo: {
          ...state.pomodoroInfo,
          isPause: false,
        },
      };

    default:
      throw new Error("There is no find matched action");
  }
};

export const POMODORO_ACTIONS = {
  OPEN_POMODORO_SETTING: "open_pomodoro_setting",
  CLOSE_POMODORO_SETTING: "close_pomodoro_setting",
  OPEN_POMODORO: "open_pomodoro",
  SET_ITEM_ID: "set_item_id",
  REMOVE_ITEM_ID: "remove_item_id",
  CLOSE_POMODORO: "close_pomodoro",
  CHANGE_WORK_MINUTES: "change_work_minutes",
  CHANGE_BREAK_MINUTES: "change_break_minutes",
  PAUSE_POMODORO: "pause_pomodoro",
  START_POMODORO: "start_pomodoro",
};
