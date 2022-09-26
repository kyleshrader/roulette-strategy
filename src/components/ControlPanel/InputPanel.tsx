import { TextField, InputAdornment, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSimulationContext } from "../../context/SimulationContext";

export default function InputPanel() {
  const {
    budgetValue,
    setBudgetValue,
    stakeValue,
    setStakeValue,
    spinTime,
    setSpinTime,
    simulationRunning,
  } = useSimulationContext();

  useEffect(() => {
    budgetValue < stakeValue ? setBudgetValue(stakeValue) : null;
  }, [budgetValue, stakeValue]);

  return (
    <Stack>
      <Typography variant="body1" color="primary">
        Input Panel
      </Typography>
      <Stack
        sx={{ my: 3 }}
        direction="row"
        gap={2}
        flexWrap={{
          xs: "wrap",
          sm: "wrap",
        }}
      >
        <TextField
          sx={{ maxWidth: "15rem" }}
          type="number"
          id="budgetValue"
          label="Budget"
          value={budgetValue}
          variant="outlined"
          onChange={(e) => {
            parseFloat(e.target.value) >= stakeValue
              ? setBudgetValue(parseFloat(e.target.value))
              : setBudgetValue(stakeValue);
          }}
          inputProps={{
            step: 100,
            min: stakeValue,
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
          sx={{ maxWidth: "10rem" }}
          type="number"
          id="stake"
          label="Stake"
          value={stakeValue}
          variant="outlined"
          onChange={(e) => {
            parseFloat(e.target.value) >= 0.1
              ? setStakeValue(parseFloat(e.target.value))
              : setStakeValue(0.1);
          }}
          inputProps={{
            step: 1,
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
          sx={{ width: "10rem" }}
          type="number"
          id="spinTime"
          label="Time for spin"
          value={spinTime}
          variant="outlined"
          onChange={(e) => {
            parseFloat(e.target.value) >= 1
              ? setSpinTime(parseInt(e.target.value))
              : setSpinTime(1);
          }}
          inputProps={{
            step: 1,
          }}
          InputProps={{
            disabled: simulationRunning,
            readOnly: simulationRunning,
            endAdornment: (
              <InputAdornment
                position="end"
                disablePointerEvents
                disableTypography
              >
                s
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </Stack>
  );
}
