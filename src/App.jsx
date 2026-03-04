import { useState } from "react";
import "./components/mdc-loading-indicator";

function App() {
  const [count, setCount] = useState(0);

 return (
  <div
    style={{
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
  </div>
);
}

export default App;
