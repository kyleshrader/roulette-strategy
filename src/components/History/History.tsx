import {
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HistoryTable from "./HistoryTable";
import Graph from "./Graph";
import { useState } from "react";
import { useSimulationContext } from "../../context/SimulationContext";
import MultiResults from "./MultiResults";

export default function History() {
  const [showGraph, setShowGraph] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const { historyData, simulationHistory } = useSimulationContext();

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
          <Stack
            sx={{ mt: 2 }}
            gap={2}
            justifyContent="center"
            alignItems="center"
          >
            {historyData ? (
              <Stack direction="row" gap={1}>
                <Button
                  color="primary"
                  variant={showGraph ? "outlined" : "contained"}
                  onClick={() => setShowGraph(!showGraph)}
                  size="small"
                >
                  {showGraph ? "Hide graph" : "Show graph"}
                </Button>
                <Button
                  color="primary"
                  variant={showTable ? "outlined" : "contained"}
                  onClick={() => setShowTable(!showTable)}
                  size="small"
                >
                  {showTable ? "Hide table" : "Show table"}
                </Button>
              </Stack>
            ) : (
              <Typography>No history to display. Run simulation.</Typography>
            )}
            {simulationHistory && simulationHistory.length > 1 ? (<MultiResults />) : null}
            {showGraph ? <Graph /> : null}
            {showTable ? <HistoryTable /> : null}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}
