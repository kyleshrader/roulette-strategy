import { TextField, InputAdornment } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSimulationContext } from "../../../context/SimulationContext";

export default function WinningTarget() {
  const {
    winningTarget,
    setWinningTarget,
    sequence,
    simulationRunning,
    targetSequenceDiff,
    setTargetSequenceDiff,
  } = useSimulationContext();

  const [sequenceString, setSequenceString] = useState("");

  useEffect(() => {
    sequence.current = sequenceString
      .split(" ")
      .map((value) => parseInt(value))
      .filter((value) => !isNaN(value) && value > 0);
    setTargetSequenceDiff(
      winningTarget -
        sequence.current.reduce((total, value) => total + value, 0)
    );
  }, [sequenceString, winningTarget]);

  const handleAddNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const matchingChars = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      " ",
    ];
    setSequenceString(
      e.target.value
        .split("")
        .filter((char) => matchingChars.includes(char)) //remove unwanted chars
        .join("")
        .replace(/\s+/g, " ") //remove double space
    );
  };
  return (
    <>
      <TextField
        sx={{ maxWidth: "10rem" }}
        type="number"
        id="winningTarget"
        label="Target to win"
        value={winningTarget}
        variant="outlined"
        onChange={(e) => {
          setWinningTarget(parseInt(e.target.value));
        }}
        inputProps={{
          step: 10,
          min: 10,
        }}
        InputProps={{
          disabled: simulationRunning,
          readOnly: simulationRunning,
          startAdornment: (
            <InputAdornment
              position="start"
              disablePointerEvents
              disableTypography
            >
              $
            </InputAdornment>
          ),
        }}
      />
      <TextField
        sx={{ maxWidth: "15rem" }}
        type="text"
        id="numberSequence"
        label="Betting sequence"
        helperText="Provide set of numbers that add up to your target. Separate each number with space."
        value={sequenceString}
        onChange={handleAddNumber}
        variant="outlined"
        error={targetSequenceDiff < 0}
        color={targetSequenceDiff === 0 ? "success" : "primary"}
        InputProps={{
          disabled: simulationRunning,
          readOnly: simulationRunning,
          endAdornment: (
            <InputAdornment
              position="end"
              disablePointerEvents
              disableTypography
            >
              {targetSequenceDiff}
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}
