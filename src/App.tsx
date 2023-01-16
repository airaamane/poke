import CssBaseline from "@mui/material/CssBaseline";
import React, { useRef, useState } from "react";
import Container from "@mui/material/Container";
import { PokeListContainer } from "./components/PokeListContainer";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <PokeListContainer />
      </Container>
    </React.Fragment>
  );
}

export default App;
