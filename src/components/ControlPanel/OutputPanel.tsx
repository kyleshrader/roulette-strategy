import { TextField, InputAdornment, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSimulationContext } from "../../context/SimulationContext";
export default function OptionsPanel() {
  const {
    currentBalance,
    setCurrentBalance,
    spinNumber,
    setSpinNumber,
    currentStake,
    setCurrentStake,
    highestStake,
    setHighestStake,
    lowestBalance,
    setLowestBalance,
    timeStamp,
    setTimeStamp,
  } = useSimulationContext();

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
          value={currentBalance}
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
          value={lowestBalance}
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
          value={currentStake}
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
          label="Highest stake"
          value={highestStake}
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
          id="totalEarnings"
          label="Total earnings"
          value={0}
          variant="outlined"
          onChange={(e) => {}}
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
          value={0}
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
      <Typography>Playing time: 4 hours, 3 mins, 10 secs </Typography>
    </Stack>
  );
}
