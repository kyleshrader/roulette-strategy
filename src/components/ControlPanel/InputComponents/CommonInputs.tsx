import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tooltip,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useSimulationContext } from "../../../context/SimulationContext";

export default function CommonInputs() {
  const {
    simulationRunning,
    rouletteType,
    setRouletteType,
    strategy,
    setStrategy,
  } = useSimulationContext();
  return (
    <>
      <FormControl sx={{ mt: 3, mb: 2 }}>
        <InputLabel id="strategySelectLabel">Strategy</InputLabel>
        <Select
          disabled={simulationRunning}
          labelId="strategySelectLabel"
          id="strategySelect"
          value={strategy}
          onChange={(event) => {
            setStrategy(event.target.value);
          }}
          label="Strategy"
        >
          <MenuItem value="martingale">Martingale Strategy</MenuItem>
          <MenuItem value="labouchere">Labouchere System</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ mb: 2 }}>
        <FormLabel id="rouletteType">Roulette type:</FormLabel>
        <RadioGroup
          row
          aria-labelledby="rouletteType"
          name="controlled-radio-buttons-group"
          value={rouletteType}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setRouletteType((event.target as HTMLInputElement).value);
          }}
        >
          <Tooltip title="Single 0" placement="left" enterDelay={400} arrow>
            <FormControlLabel
              value="europeanRoulette"
              control={<Radio disabled={simulationRunning} />}
              label="European"
            />
          </Tooltip>
          <Tooltip title="Double 0" placement="right" enterDelay={400} arrow>
            <FormControlLabel
              value="americanRoulette"
              control={<Radio disabled={simulationRunning} />}
              label="American"
            />
          </Tooltip>
        </RadioGroup>
      </FormControl>
    </>
  );
}
