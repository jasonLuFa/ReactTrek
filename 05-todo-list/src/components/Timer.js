import React from "react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import StopButton from "./StopButton";

const red = "#f54e4e";
const green = "#4aec8c";

const Timer = () => {
  return (
    <div>
      <CircularProgressbarWithChildren
        value={60}
        text={`60%`}
        strokeWidth={8}
        styles={buildStyles({
          textColor: "#222",
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
            value={70}
            strokeWidth={5}
            styles={buildStyles({
              trailColor: "hsl(212, 33%, 93%)",
              pathColor: green,
            })}
          />
        </div>
      </CircularProgressbarWithChildren>
      <div style={{ marginTop: "2rem" }}>
        <PlayButton />
        <PauseButton />
        <StopButton />
      </div>
    </div>
  );
};

export default Timer;
