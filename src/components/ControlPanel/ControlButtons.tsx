import { Button, Stack, Slider, Box, Typography } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { useSimulationContext } from "../../context/SimulationContext";

export default function ControlButtons() {
  const {
    simulationSpeed,
    setSimulationSpeed,
    startSimulation,
    stopSimulation,
  } = useSimulationContext();
  return (
    <Box sx={{ maxWidth: "40rem" }}>
      <Stack direction="row" gap={1}>
        <Button variant="contained" color="primary" onClick={startSimulation}>
          <PlayCircleIcon sx={{ mr: 1 }} />
          SIMULATE
        </Button>
        <Button variant="contained" color="warning" onClick={stopSimulation}>
          <StopCircleIcon sx={{ mr: 1 }} />
          STOP
        </Button>
      </Stack>
      <Box sx={{ mt: 2 }} textAlign="center">
        <Typography variant="body1" id="simulationSpeed">
          Simulation speed
        </Typography>
        <Stack direction="row" alignItems="center" gap={2}>
          <Typography variant="body2">Low</Typography>
          <Slider
            aria-label="simulationSpeed"
            value={2000 - simulationSpeed}
            min={0}
            max={1800}
            onChange={(event, value) =>
              setSimulationSpeed(2000 - (value as number))
            }
          />
          <Typography variant="body2">High</Typography>
        </Stack>
      </Box>
    </Box>
  );
}
