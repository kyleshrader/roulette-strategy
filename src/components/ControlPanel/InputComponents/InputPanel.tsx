import { Stack, Typography } from "@mui/material";
import { useSimulationContext } from "../../../context/SimulationContext";
import BaseStake from "./BaseStake";
import BudgetValue from "./BudgetValue";
import CommonInputs from "./CommonInputs";
import SpinTime from "./SpinTime";
import WinningTarget from "./winningTarget";
import BetWinnings from "./betWinnings";
import StopInputs from "./stopInputs";

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
            <BetWinnings />
            <BaseStake />
            <StopInputs />
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
