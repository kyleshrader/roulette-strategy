import { TextField, InputAdornment } from "@mui/material";
import { useSimulationContext } from "../../../context/SimulationContext";

export default function StopInputs() {
  const { stopLoss, setStopLoss, stopWin, setStopWin, simulationRunning } =
    useSimulationContext();
  return (
    <div>
      <div style={{paddingBottom: "10px"}}>
        <TextField
          sx={{ maxWidth: "10rem" }}
          type="number"
          id="stopLoss"
          label="Stop Loss"
          value={stopLoss}
          variant="outlined"
          onChange={(e) => {
            parseFloat(e.target.value) >= 0
              ? setStopLoss(parseFloat(e.target.value))
              : setStopLoss(0);
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
      </div>
      <div style={{paddingBottom: "10px"}}>
        <TextField
          sx={{ maxWidth: "10rem" }}
          type="number"
          id="stopWin"
          label="Stop Win"
          value={stopWin}
          variant="outlined"
          onChange={(e) => {
            parseFloat(e.target.value) >= 0
              ? setStopWin(parseFloat(e.target.value))
              : setStopWin(0);
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
      </div>
    </div>
  );
}
