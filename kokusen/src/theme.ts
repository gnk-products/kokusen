'use client';

import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    black: string;
    main: string;
  }
  interface TypeText {
    error: string;
  }
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: false;
    lg: false;
    xl: false;
  }
}

const theme = createTheme({
  spacing: 4,
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  typography: {
    fontFamily: ['system-ui', '-apple-system', '"Segoe UI"', 'Roboto'].join(
      ',',
    ),
    subtitle1: {
      fontWeight: 700,
    },
    subtitle2: {
      fontSize: 16,
      fontWeight: 400,
    },
    body1: {
      fontSize: 16,
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          '& ::placeholder': {
            fontWeight: 'normal',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-outlined': {
            backgroundColor: '#fff',
          },
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: 'unset !important',
          padding: 0,
          '& .MuiAccordionSummary-content': {
            margin: '0px !important',
          },
        },
      },
    },
  },
  palette: {
    primary: {
      light: '#64b5f6',
      main: '#1e88e5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    background: {
      black: '#333333',
      main: '#1A1A2E',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
      error: '#e53935',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
    },
  },
});

export default theme;
