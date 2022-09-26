import { Button, Stack, Slider, Box, Typography } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { useState } from "react";

export default function ControlButtons() {
  const [simulationSpeed, setSimulationSpeed] = useState();
  return (
    <Box sx={{ maxWidth: "40rem" }}>
      <Stack sx={{}} direction="row" gap={1}>
        <Button variant="contained" color="primary">
          <PlayCircleIcon sx={{ mr: 1 }} />
          SIMULATE
        </Button>
        <Button variant="contained" color="warning">
          <StopCircleIcon sx={{ mr: 1 }} />
          STOP
        </Button>
      </Stack>
      <Box sx={{ mt: 2 }} textAlign="center">
        <Typography variant="body1">Simulation speed</Typography>
        <Stack direction="row" alignItems="center" gap={2}>
          <Typography variant="body2">Low</Typography>
          <Slider aria-label="Volume" value={50} />
          <Typography variant="body2">High</Typography>
        </Stack>
      </Box>
    </Box>
  );
}
