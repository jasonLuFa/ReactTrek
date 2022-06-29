export const pomodoroReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case POMODORO_ACTIONS.OPEN_POMODORO:
      return { ...state, isOpenPomodoro: true };

    case POMODORO_ACTIONS.CLOSE_POMODORO:
      return { ...state, isOpenPomodoro: false };

    case POMODORO_ACTIONS.OPEN_POMODORO_SETTING:
      return { ...state, isShowPomodoroSettings: true };

    case POMODORO_ACTIONS.CLOSE_POMODORO_SETTING:
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
      console.log(payload.newBreakMinutes);
      return {
        ...state,
        settingInfo: {
          ...state.settingInfo,
          breakMinutes: payload.newBreakMinutes,
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
  CLOSE_POMODORO: "close_pomodoro",
  CHANGE_WORK_MINUTES: "change_work_minutes",
  CHANGE_BREAK_MINUTES: "change_break_minutes",
};
