import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { useSimulationContext } from "../../context/SimulationContext";
import { formatNumber } from "../../utils/numberFormatter";

export default function HistoryTable() {
  const { historyData, budgetValue } = useSimulationContext();

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="history-table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Spin #</TableCell>
            <TableCell align="center">Drawn Number</TableCell>
            <TableCell />
            <TableCell align="center">Balance</TableCell>
            <TableCell align="center">Lowest balance</TableCell>
            <TableCell align="center">Highest balance</TableCell>
            <TableCell align="center">Next stake</TableCell>
            <TableCell align="center">Earnings</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {historyData?.map((data, index) => (
            <TableRow key={data.spin}>
              <TableCell align="center">{formatNumber(data.spin)}</TableCell>
              <TableCell align="center">
                {index === 0 ? (
                  ""
                ) : (
                  <Typography color={data.drawnNumber.color}>
                    {data.drawnNumber.value}
                  </Typography>
                )}
              </TableCell>
              <TableCell align="center">
                {index === 0 ? (
                  ""
                ) : historyData[index - 1]?.balance > data.balance ? (
                  <Typography color="red">Lost</Typography>
                ) : (
                  <Typography color="green">Won</Typography>
                )}
              </TableCell>
              <TableCell align="center">{formatNumber(data.balance)}</TableCell>
              <TableCell align="center">
                {formatNumber(data.lowestBalance)}
              </TableCell>
              <TableCell align="center">
                {formatNumber(data.highestBalance)}
              </TableCell>
              <TableCell align="center">{formatNumber(data.stake)}</TableCell>
              <TableCell align="center">
                {formatNumber(data.balance - budgetValue)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
