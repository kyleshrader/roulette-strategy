import { Container, Typography, Button } from "@mui/material";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import ControlPanel from "./components/ControlPanel/ControlPanel";

function App() {
  return (
    <>
      <NavigationBar />
      <Container maxWidth="lg">
        <ControlPanel />
      </Container>
    </>
  );
}

export default App;
