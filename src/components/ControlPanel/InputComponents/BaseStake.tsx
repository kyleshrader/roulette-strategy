import { TextField, InputAdornment } from "@mui/material";
import { useSimulationContext } from "../../../context/SimulationContext";

export default function BaseStake() {
  const { stakeValue, setStakeValue, simulationRunning } =
    useSimulationContext();
  return (
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
  );
}
