import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // Soft blue
    },
    secondary: {
      main: '#4caf50', // Light green
    },
    background: {
      default: '#f9f9f9', // Very light gray
    },
    error: {
      main: '#f44336',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
