import { useState } from "react";
import "./components/mdc-loading-indicator";
import { Box } from "@mui/material";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Box
        sx={{
          cursor: "not-allowed",
          pointerEvents: "all",
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <mdc-loading-indicator />
      </Box>
    </>
  );
}

export default App;
