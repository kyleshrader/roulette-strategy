import { Container, Typography, Button } from "@mui/material";
import "./App.css";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import Credits from "./components/Credits";
import History from "./components/History/History";
import StrategyDescription from "./components/StrategyDescription/StrategyDescription";

function App() {
  return (
    <>
      <Container maxWidth="lg">
        <StrategyDescription />
        <ControlPanel />
        <History />
      </Container>
      <Credits />
    </>
  );
}

export default App;
