import React from "react";
import { FiCoffee } from "react-icons/fi";

const BreakButton = ({ setMode, setIsAlarming }) => {
  return (
    <button
      className="break-btn"
      onClick={() => {
        setMode("BREAK");
        // setIsAlarming(false);
      }}
    >
      <FiCoffee
        style={{
          display: "block",
          margin: "0 auto",
        }}
      />
    </button>
  );
};

export default BreakButton;
