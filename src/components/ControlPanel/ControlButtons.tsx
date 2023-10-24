import {
  Button,
  Stack,
  Slider,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { useSimulationContext } from "../../context/SimulationContext";
import { useState } from "react";

export default function ControlButtons() {
  const {
    simulationRunning,
    simulationSpeed,
    setSimulationSpeed,
    startSimulation,
    stopSimulation,
    targetSequenceDiff,
    strategy,
  } = useSimulationContext();

  const [openAlert, setOpenAlert] = useState(false);

  const handleStart = () => {
    if (targetSequenceDiff === 0 || strategy !== "labouchere")
      startSimulation();
    else setOpenAlert(true);
  };

  return (
    <Box sx={{ maxWidth: "40rem" }}>
      <Stack direction="row" gap={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleStart}
          disabled={simulationRunning}
        >
          <PlayCircleIcon sx={{ mr: 1 }} />
          SIMULATE
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={stopSimulation}
          disabled={!simulationRunning}
        >
          <StopCircleIcon sx={{ mr: 1 }} />
          STOP
        </Button>
      </Stack>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
      >
        <Alert severity="error">
          Betting sequence values must add up to winning target
        </Alert>
      </Snackbar>
      <Box sx={{ mt: 2 }} textAlign="center">
        <Typography variant="body1" id="simulationSpeed">
          Simulation speed
        </Typography>
        <Stack direction="row" alignItems="center" gap={2}>
          <Typography variant="body2">Low</Typography>
          <Slider
            aria-label="simulationSpeed"
            value={1000 - simulationSpeed}
            min={0}
            max={980}
            onChange={(event, value) =>
              setSimulationSpeed(1000 - (value as number))
            }
          />
          <Typography variant="body2">High</Typography>
        </Stack>
      </Box>
    </Box>
  );
}
