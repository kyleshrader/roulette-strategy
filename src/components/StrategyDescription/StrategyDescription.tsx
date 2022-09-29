import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from "@mui/material";
import Martingale from "./Martingale";
import Labouchere from "./Labouchere";

export default function StrategyDescription() {
  return (
    <Stack sx={{ my: 2 }}>
      <Martingale />
      <Labouchere />
    </Stack>
  );
}
