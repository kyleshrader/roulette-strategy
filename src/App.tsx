import { Container, Typography, Button } from "@mui/material";
import "./App.css";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import StrategyDescription from "./components/StrategyDescription/StrategyDescription";

function App() {
  return (
    <>
      <Container maxWidth="lg">
        <StrategyDescription />
        <ControlPanel />
      </Container>
    </>
  );
}

export default App;
