import { Box } from "@mui/material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useSimulationContext } from "../../context/SimulationContext";

export default function Graph() {
  const { historyData } = useSimulationContext();
  return (
    <Box height="100%" width="100%">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={historyData!}>
          <Line
            isAnimationActive={false}
            type="natural"
            dataKey="balance"
            stroke="#8884d8"
            dot={false}
          />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="spin" minTickGap={20} />
          <YAxis tickCount={5} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
