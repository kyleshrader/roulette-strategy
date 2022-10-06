import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useSimulationContext } from "../../context/SimulationContext";

export default function HistoryTable() {
  const { historyData, budgetValue } = useSimulationContext();
  return (
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
              <TableCell align="center">{data.balance - budgetValue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
