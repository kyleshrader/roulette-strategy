import { TextField, InputAdornment, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
export default function OptionsPanel() {
  const [currentBalance, setCurrentBalance] = useState();
  const [spinNumber, setSpinNumber] = useState(0);
  const [currentStake, setCurrentStake] = useState();
  const [highestStake, setHighestStake] = useState();
  const [lowestBalance, setLowestBalance] = useState();
  const [simulationSpeed, setSimulationSpeed] = useState();
  const [timeStamp, setTimeStamp] = useState();

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
          onChange={(e) => {}}
          inputProps={{
            min: 0,
          }}
          InputProps={{
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
          onChange={(e) => {}}
          inputProps={{
            min: 0,
          }}
          InputProps={{
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
          onChange={(e) => {}}
          InputProps={{
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
          onChange={(e) => {}}
          inputProps={{
            min: 0,
          }}
          InputProps={{
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
          inputProps={{
            min: 0,
          }}
          InputProps={{
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
          onChange={(e) => {}}
          inputProps={{
            min: 0,
          }}
          InputProps={{
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
      <Typography>Time passed: </Typography>
    </Stack>
  );
}
