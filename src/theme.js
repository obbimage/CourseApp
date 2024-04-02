import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
      bg: "#f5f5f5"
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    title: {
      fontSize: 35,
    },
    // // Disable h3 variant
    // h3: undefined,
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          // Map the new variant to render a <h1> by default
          title: 'h2',
        },
      },
    },
  },
  breakpoints: {
    values: {
       xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  }
});

export default theme;