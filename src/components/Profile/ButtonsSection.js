import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./ButtonsSection.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0A0656",
      darker: "#053e85",
    },
    neutral: {
      main: "#06BCD4",
      contrastText: "#fff",
    },
  },
});

export default function ButtonsSection({ transcript }) {
  console.log("transcript");
  console.log(transcript);
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2} direction="row" className="buttons-container">
        <a
          href={transcript}
          download
          class="button"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Button variant="contained" color="primary">
            Download Transcript
          </Button>
        </a>

        <Button variant="contained" color="neutral">
          Request Meeting
        </Button>
        <Button variant="contained" color="primary">
          Request Onboarding Materials
        </Button>
      </Stack>
    </ThemeProvider>
  );
}
