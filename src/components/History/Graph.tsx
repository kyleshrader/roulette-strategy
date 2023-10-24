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
import { useEffect } from "react";

export default function Graph() {
  const { historyData, simulationHistory, simulationRunning } = useSimulationContext();
  const data: typeof simulationHistory = []
  if (simulationHistory) data.push(...simulationHistory)
  if (simulationRunning && historyData) data.push(historyData)

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Box height="100%" width="100%">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart>
          {
            data.flatMap((lineData, index) => (
              <Line
              key={index}
              data={lineData}
              isAnimationActive={false}
              type="natural"
              dataKey="balance"
              dot={false}
            />
            ))
          }
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="spin" minTickGap={20} type="category" allowDuplicatedCategory={false} />
          <YAxis tickCount={5} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
