import {
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HistoryTable from "./HistoryTable";
import Graph from "./Graph";

export default function History() {
  return (
    <Stack sx={{ my: 2 }}>
      <Accordion sx={{ p: 1 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="history-content"
          id="history-header"
        >
          <Typography color="primary" variant="h6">
            History
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack gap={2} justifyContent="center" alignItems="center">
            <Graph />
            <HistoryTable />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}
