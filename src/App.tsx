import { Container, Typography, Button } from "@mui/material";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import OptionsPanel from "./components/OptionsPanel";

function App() {
  return (
    <>
      <NavigationBar />
      <Container maxWidth="lg">
        <OptionsPanel />
      </Container>
    </>
  );
}

export default App;
