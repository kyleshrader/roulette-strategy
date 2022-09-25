import { AppBar } from "@mui/material";
import { Container, Typography } from "@mui/material";
export default function NavigationBar() {
  return (
    <>
      <AppBar position="relative" color="primary" sx={{ py: 1 }}>
        <Container maxWidth="lg">
          <Typography variant="body1">Roulette Strategies</Typography>
        </Container>
      </AppBar>
    </>
  );
}
