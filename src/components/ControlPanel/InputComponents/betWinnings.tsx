import { TextField, InputAdornment, Checkbox } from "@mui/material";
import { useSimulationContext } from "../../../context/SimulationContext";

export default function BetWinnings() {
  const { betWinnings, setBetWinnings, simulationRunning } =
    useSimulationContext();
  return (
    <div>
      <label htmlFor="betWinnings">Bet Winnings</label>
      <Checkbox
        sx={{ maxWidth: "10rem" }}
        id="betWinnings"
        value={betWinnings}
        onChange={(e) => {
          e.target.checked
            ? setBetWinnings(e.target.checked)
            : setBetWinnings(false);
        }}
        inputProps={{
          defaultChecked: false
        }}
        disabled={simulationRunning}
        readOnly={simulationRunning}
      />
    </div>
  );
}
