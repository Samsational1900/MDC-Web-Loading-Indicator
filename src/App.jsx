import { useState } from "react";
import LoadingIndicator from "@/react/LoadingIndicator";
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
        <LoadingIndicator
  indicatorColor={"#219600"}
/>
      </Box>
    </>
  );
}

export default App;