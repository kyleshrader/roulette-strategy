import { TextField, InputAdornment } from "@mui/material";
import { useSimulationContext } from "../../../context/SimulationContext";

export default function SpinTime() {
  const { spinTime, setSpinTime, simulationRunning } = useSimulationContext();
  return (
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
          <InputAdornment position="end" disablePointerEvents disableTypography>
            s
          </InputAdornment>
        ),
      }}
    />
  );
}
