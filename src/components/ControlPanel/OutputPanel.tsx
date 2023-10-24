import {
  TextField,
  InputAdornment,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { formatNumber } from "../../utils/numberFormatter";
import { formatTime } from "../../utils/timeFormatter";
import { useSimulationContext } from "../../context/SimulationContext";
export default function OptionsPanel() {
  const {
    simulationMessage,
    currentBalance,
    spinNumber,
    currentStake,
    highestStake,
    lowestBalance,
    highestBalance,
    budgetValue,
    virtualTime,
    highestLosingStreak,
    displayDrawnNumber,
  } = useSimulationContext();

  const time = formatTime(virtualTime.current);

  return (
    <Stack>
      <Typography variant="body1" color="primary">
        Output Panel
      </Typography>
      <Stack
        sx={{ my: 3 }}
        direction="row"
        gap={2}
        flexWrap={{
          xs: "wrap",
          sm: "wrap",
        }}
        alignItems="center"
      >
        <TextField
          sx={{ maxWidth: "10rem" }}
          type="text"
          id="spinNumber"
          label="Spin"
          value={spinNumber}
          variant="outlined"
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment
                position="start"
                disablePointerEvents
                disableTypography
              >
                #
              </InputAdornment>
            ),
          }}
        />
        <TextField
          sx={{ maxWidth: "15rem", minWidth: "8rem" }}
          type="text"
          id="currentBalance"
          label="Current balance"
          value={formatNumber(currentBalance.current)}
          variant="outlined"
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment
                position="start"
                disablePointerEvents
                disableTypography
              >
                $
              </InputAdornment>
            ),
          }}
        />
        <TextField
          sx={{ maxWidth: "15rem", minWidth: "8rem" }}
          type="text"
          id="lowestBalance"
          label="Lowest balance"
          value={formatNumber(lowestBalance.current)}
          variant="outlined"
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment
                position="start"
                disablePointerEvents
                disableTypography
              >
                $
              </InputAdornment>
            ),
          }}
        /><TextField
          sx={{ maxWidth: "15rem", minWidth: "8rem" }}
          type="text"
          id="highestBalance"
          label="Highest balance"
          value={formatNumber(highestBalance.current)}
          variant="outlined"
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment
                position="start"
                disablePointerEvents
                disableTypography
              >
                $
              </InputAdornment>
            ),
          }}
        />
        <TextField
          sx={{ maxWidth: "10rem" }}
          type="text"
          id="currentStake"
          label="Current stake"
          value={formatNumber(currentStake.current)}
          variant="outlined"
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment
                position="start"
                disablePointerEvents
                disableTypography
              >
                $
              </InputAdornment>
            ),
          }}
        />
        <TextField
          sx={{ maxWidth: "10rem" }}
          type="text"
          id="highestStake"
          label="Highest stake / Losing streak"
          value={formatNumber(highestStake.current)}
          variant="outlined"
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment
                position="start"
                disablePointerEvents
                disableTypography
              >
                $
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                disablePointerEvents
                disableTypography
              >
                {highestLosingStreak.current}
              </InputAdornment>
            ),
          }}
        />
        <TextField
          sx={{ maxWidth: "10rem" }}
          type="text"
          id="totalEarnings"
          label="Total earnings"
          value={
            spinNumber != 0
              ? formatNumber(currentBalance.current - budgetValue)
              : ""
          }
          variant="outlined"
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment
                position="start"
                disablePointerEvents
                disableTypography
              >
                $
              </InputAdornment>
            ),
          }}
        />
        <TextField
          sx={{ maxWidth: "10rem" }}
          type="text"
          id="earningsperh"
          label="Earnings / h"
          value={formatNumber(
            (currentBalance.current - budgetValue) /
            (virtualTime.current / 3600000)
          )}
          variant="outlined"
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment
                position="start"
                disablePointerEvents
                disableTypography
              >
                $
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack justifyContent="center">
        <Typography>
          Simulated playing time: {time.h}h {time.m}m {time.s}s
        </Typography>
        <Typography sx={{ mt: 3 }} variant="h6">
          {spinNumber >= 1 ? simulationMessage.result : ""}
        </Typography>
        <Typography variant="body1">
          Betting on: {simulationMessage.bettingOn}
        </Typography>
        {spinNumber >= 1 ? (
          <Box
            sx={{
              p: 3,
              backgroundColor: displayDrawnNumber.current.color,
              maxWidth: "3rem",
              textJustify: "center",
              textAlign: "center",
            }}
            color="white"
          >
            <Typography variant="h6">
              {displayDrawnNumber.current.value}
            </Typography>
          </Box>
        ) : (
          ""
        )}
      </Stack>
    </Stack>
  );
}
