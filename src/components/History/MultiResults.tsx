import { Box, TextField } from "@mui/material";
import {
    ResponsiveContainer,
} from "recharts";
import { useSimulationContext } from "../../context/SimulationContext";
import { formatNumber } from "../../utils/numberFormatter";

export default function MultiResults() {
    const { simulationHistory, budgetValue, stopLoss, stopWin } = useSimulationContext();

    const results = simulationHistory!.reduce((acc, curr) => {
        if (curr[curr.length - 1].balance >= budgetValue - stopWin) acc.wins++
        else acc.losses++
        return acc
    }, { wins: 0, losses: 0 })

    return (
        <Box height="100%" width="100%">
            <ResponsiveContainer width="100%">
                <div>
                    <TextField
                        sx={{ maxWidth: "5rem", minWidth: "3rem" }}
                        type="text"
                        id="wins"
                        label="Wins"
                        value={formatNumber(results.wins)}
                        variant="outlined"
                        InputProps={{
                            readOnly: true
                        }}
                    />
                    <TextField
                        sx={{ maxWidth: "5rem", minWidth: "3rem" }}
                        type="text"
                        id="losses"
                        label="Losses"
                        value={formatNumber(results.losses)}
                        variant="outlined"
                        InputProps={{
                            readOnly: true
                        }}
                    />
                </div>
            </ResponsiveContainer>
        </Box>
    );
}
