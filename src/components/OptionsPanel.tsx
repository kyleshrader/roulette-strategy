import { TextField, InputAdornment, Stack } from "@mui/material";
import { useEffect, useState } from "react";
export default function OptionsPanel() {
  const [budgetValue, setBudgetValue] = useState(10000);
  const [stakeValue, setStakeValue] = useState(50);

  useEffect(() => {
    budgetValue < stakeValue ? setBudgetValue(stakeValue) : null;
  }, [budgetValue, stakeValue]);
  return (
    <Stack sx={{ my: 3 }} direction="row" gap={3}>
      <TextField
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
          step: 1,
          min: stakeValue,
        }}
        InputProps={{
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
    </Stack>
  );
}
