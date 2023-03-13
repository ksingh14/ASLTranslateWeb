import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import './Styles/App.css';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#000"
    },
    secondary: {
      main: "#001e3c"
    },
    error: {
      main: red.A400
    }
  },
  typography: {
    fontFamily: [
      'Archivo',
      'Montserrat',
      'Quicksand',
      'sans-serif'
    ].join(','),
    fontWeightLight: 300,
    fontWeightMedium: 400,
    fontWeightBold: 500
  }
});

export default theme;
