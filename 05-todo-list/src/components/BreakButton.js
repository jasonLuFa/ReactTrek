import React from "react";
import { FiCoffee } from "react-icons/fi";
import { useGlobalContext } from "../context";

const BreakButton = ({ setMode }) => {
  const { setIsAlarming } = useGlobalContext();
  return (
    <button
      className="break-btn"
      onClick={() => {
        setMode("BREAK");
        setIsAlarming(false);
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
