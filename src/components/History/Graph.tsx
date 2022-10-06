import { Box } from "@mui/material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { useSimulationContext } from "../../context/SimulationContext";

export default function Graph() {
  const { historyData } = useSimulationContext();
  return (
    <Box height="100%" width="100%">
      <ResponsiveContainer width="80%" height={300}>
        <LineChart data={historyData!}>
          <Line
            animationDuration={3000}
            type="natural"
            dataKey="balance"
            stroke="#8884d8"
            dot={false}
          />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="spin" minTickGap={20} />
          <YAxis tickCount={5} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
