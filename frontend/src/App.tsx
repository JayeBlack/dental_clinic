import { Container, Typography, Box, Button } from '@mui/material';

function App() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box textAlign="center">
        <Typography variant="h3" color="primary" gutterBottom>
          Smile Clinic
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Welcome to your modern dental clinic management system!
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 4 }}>
          Get Started
        </Button>
      </Box>
    </Container>
  );
}

export default App;