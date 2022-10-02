import { TextField, InputAdornment } from "@mui/material";
import { useEffect } from "react";
import { useSimulationContext } from "../../../context/SimulationContext";

export default function BudgetValue() {
  const { budgetValue, setBudgetValue, stakeValue, simulationRunning } =
    useSimulationContext();

  useEffect(() => {
    budgetValue < stakeValue ? setBudgetValue(stakeValue) : null;
  }, [budgetValue, stakeValue]);

  return (
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
  );
}
