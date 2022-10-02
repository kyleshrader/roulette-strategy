import { Paper, Stack, Box } from "@mui/material";
import InputPanel from "./InputComponents/InputPanel";
import OutputPanel from "./OutputPanel";
import ControlButtons from "./ControlButtons";

export default function ControlPanel() {
  return (
    <>
      <Stack gap={2} alignItems="center" sx={{ my: 2 }}>
        <Stack
          direction="row"
          gap={3}
          justifyContent="center"
          flexWrap={{
            xs: "wrap",
            sm: "wrap",
            md: "nowrap",
          }}
        >
          <Paper elevation={3} sx={{ p: 3 }}>
            <InputPanel />
          </Paper>
          <Paper elevation={3} sx={{ p: 3 }}>
            <OutputPanel />
          </Paper>
        </Stack>
        <ControlButtons />
      </Stack>
    </>
  );
}
