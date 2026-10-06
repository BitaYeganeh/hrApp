import { createTheme } from '@mui/material/styles';

// Same teal palette and font stack as the About page, used across the app
const theme = createTheme({
  palette: {
    primary: {
      main: '#2f6f6f',
      dark: '#1f4e4e',
      light: '#edf4f4',
      contrastText: '#fff',
    },
    error: {
      main: '#b3261e',
    },
    text: {
      primary: '#1d2a2a',
      secondary: '#4a5c5c',
    },
    background: {
      default: '#f6f9f9',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
  },
});

export default theme;
