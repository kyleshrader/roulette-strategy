import { Stack, Typography } from "@mui/material";
import { useSimulationContext } from "../../../context/SimulationContext";
import BaseStake from "./BaseStake";
import BudgetValue from "./BudgetValue";
import CommonInputs from "./CommonInputs";
import SpinTime from "./spinTime";
import WinningTarget from "./winningTarget";

export default function InputPanel() {
  const { strategy } = useSimulationContext();

  return (
    <Stack>
      <Typography variant="body1" color="primary">
        Input Panel
      </Typography>
      <CommonInputs />
      <Stack
        direction="row"
        gap={2}
        flexWrap={{
          xs: "wrap",
          sm: "wrap",
        }}
      >
        {strategy === "martingale" && (
          <>
            <BudgetValue />
            <BaseStake />
            <SpinTime />
          </>
        )}
        {strategy === "labouchere" && (
          <>
            <BudgetValue />
            <WinningTarget />
            <SpinTime />
          </>
        )}
      </Stack>
    </Stack>
  );
}
