import React from "react";
import ReactSlider from "react-slider";
import { useGlobalContext } from "../context";
import { POMODORO_ACTIONS } from "../pomodoroReducer";
import BackButton from "./BackButton";

const PomodoroSetting = () => {
  const {
    pomodoro: {
      isShowPomodoroSettings,
      settingInfo: { workMinutes, breakMinutes },
    },
    pomodoroDispatch,
  } = useGlobalContext();

  return (
    <div
      className={`${
        isShowPomodoroSettings ? "modal-container isOpen" : "modal-container"
      }`}
    >
      <div className="modal-content">
        <h3>Pomodoro Setting</h3>
        <label>work: {workMinutes} minutes</label>
        <ReactSlider
          className="slider-red"
          thumbClassName="thumb"
          trackClassName="track"
          value={workMinutes}
          min={1}
          max={120}
          onChange={(newWorkMinutes) =>
            pomodoroDispatch({
              type: POMODORO_ACTIONS.CHANGE_WORK_MINUTES,
              payload: { newWorkMinutes },
            })
          }
        />
        <label>break : {breakMinutes} minutes</label>
        <ReactSlider
          className="slider-green"
          thumbClassName="thumb"
          trackClassName="track"
          value={breakMinutes}
          min={1}
          max={120}
          onChange={(newBreakMinutes) =>
            pomodoroDispatch({
              type: POMODORO_ACTIONS.CHANGE_BREAK_MINUTES,
              payload: { newBreakMinutes },
            })
          }
        />
        <BackButton />
      </div>
    </div>
  );
};

export default PomodoroSetting;
