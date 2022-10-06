import {
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSimulationContext } from "../../context/SimulationContext";

export default function History() {
  const { historyData, budgetValue } = useSimulationContext();
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
            <TableContainer component={Paper}>
              <Table size="small" aria-label="history-table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Spin #</TableCell>
                    <TableCell align="center">Balance</TableCell>
                    <TableCell align="center">Lowest balance</TableCell>
                    <TableCell align="center">Stake</TableCell>
                    <TableCell align="center">Earnings</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historyData?.map((data) => (
                    <TableRow key={data.spin}>
                      <TableCell align="center">{data.spin}</TableCell>
                      <TableCell align="center">{data.balance}</TableCell>
                      <TableCell align="center">{data.lowestBalance}</TableCell>
                      <TableCell align="center">{data.stake}</TableCell>
                      <TableCell align="center">
                        {data.balance - budgetValue}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}
