import { useState, useEffect } from "react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import StopButton from "./StopButton";
import BreakButton from "./BreakButton";
import { useGlobalContext } from "../context";

const red = "#f54e4e";
const green = "#4aec8c";

const Timer = () => {
  const {
    pomodoro: {
      settingInfo,
      pomodoroInfo: { isPause },
    },
    pomodoroCycle,
    setPomodoroCycle,
    setIsAlarming,
  } = useGlobalContext();
  // const [isAlarming, setIsAlarming] = useState(false);
  const [mode, setMode] = useState("WORK"); // WORK, BREAK
  const [workSecondsLeft, setWorkSecondsLeft] = useState(
    () => settingInfo.workMinutes * 60
  );
  const [breakSecondsLeft, setBreakSecondsLeft] = useState(
    () => settingInfo.breakMinutes * 60
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPause) {
        return;
      }
      if (mode === "WORK") {
        setWorkSecondsLeft((prevSecondLeft) => prevSecondLeft - 1);
      }
      if (mode === "BREAK") {
        setBreakSecondsLeft((prevSecondLeft) => prevSecondLeft - 1);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [settingInfo, isPause, mode]);

  const adjustText = () => {
    return (
      adjustMinutes(mode === "WORK" ? workSecondsLeft : breakSecondsLeft) +
      ":" +
      adjustSeconds(mode === "WORK" ? workSecondsLeft : breakSecondsLeft)
    );
  };

  const adjustMinutes = (secondLeft) => {
    if (secondLeft > 0) {
      return Math.floor(secondLeft / 60);
    } else if (-59 <= secondLeft && secondLeft < 0) {
      return "-0";
    } else {
      return Math.ceil(secondLeft / 60);
    }
  };

  const adjustSeconds = (secondLeft) => {
    const seconds = secondLeft % 60;
    if (seconds >= 10) {
      return seconds;
    } else if (0 <= seconds && seconds < 10) {
      return "0" + seconds;
    } else if (-10 < seconds && seconds < -0) {
      return "0" + -seconds;
    } else {
      return -seconds;
    }
  };

  const itemId = pomodoroCycle.itemId;
  useEffect(() => {
    if (workSecondsLeft <= 0) {
      setPomodoroCycle({ itemId, isFinished: true });
    }
  }, [workSecondsLeft, setPomodoroCycle, itemId]);

  useEffect(() => {
    if (workSecondsLeft <= 0 && mode === "WORK") {
      setIsAlarming(true);
      return;
    }
    if (breakSecondsLeft <= 0) {
      setIsAlarming(true);
      return;
    }
  }, [breakSecondsLeft, workSecondsLeft, mode, setIsAlarming]);

  return (
    <div>
      {/* <Sound
        url={alarmClock}
        playStatus={setIsAlarming ? Sound.status.PLAYING : Sound.status.STOPPED}
        loop={true}
      /> */}
      <CircularProgressbarWithChildren
        value={(workSecondsLeft / (settingInfo.workMinutes * 60)) * 100}
        text={adjustText()}
        strokeWidth={8}
        styles={buildStyles({
          textColor: mode === "WORK" ? red : green,
          pathColor: red,
          trailColor: "hsl(212, 33%, 89%)",
        })}
      >
        {/*
          Width here needs to be (100 - 2 * strokeWidth)% 
          in order to fit exactly inside the outer progressbar.
        */}
        <div style={{ width: "84%" }}>
          <CircularProgressbar
            value={(breakSecondsLeft / (settingInfo.breakMinutes * 60)) * 100}
            strokeWidth={5}
            styles={buildStyles({
              trailColor: "hsl(212, 33%, 93%)",
              pathColor: green,
            })}
          />
        </div>
      </CircularProgressbarWithChildren>
      <div className="pomodoro-btn-container">
        {isPause ? <PlayButton /> : <PauseButton />}
        {mode === "WORK" && workSecondsLeft <= 0 && (
          <BreakButton setMode={setMode} />
        )}
        <StopButton />
      </div>
    </div>
  );
};

export default Timer;
