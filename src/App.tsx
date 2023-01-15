import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import "./App.css";
import Container from "@mui/material/Container";
import { PokeListContainer } from "./components/PokeListContainer";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <PokeListContainer />
      </Container>
    </React.Fragment>
  );
}

export default App;
