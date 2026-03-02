import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { Color, Solver } from "@/utils/ColorSolver";

/**
 * A customizable Material Design 3 Loading Indicator.
 * @param {string} containerColor - Background color of the circle.
 * @param {string} indicatorColor - CSS filter string to color the GIF.
 * @param {string|number} customSize - Override responsive sizing.
 * @param {boolean} isContainedIndicator - Whether to show the circular background.
 */
export default function LoadingIndicator({ 
  containerColor, 
  indicatorColor, 
  width,
  height,
  isContainedIndicator = true
}) {

const solvedFilter = useMemo(() => {
    // If it's already a filter string or empty, just return it
    if (!indicatorColor || indicatorColor.includes("invert")) {
      return indicatorColor;
    }

    // Assume indicatorColor is a Hex code
    const hex = indicatorColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const color = new Color(r, g, b);
    const solver = new Solver(color);
    const result = solver.solve();

    // Your solver returns "filter: invert(...)"; we only need the value
    return result.filter.replace('filter: ', '').replace(';', '');
  }, [indicatorColor]);
  
  return (
    <Box
      sx={{
        padding: "10px",
       width: width || "38px", 
        height: height || "38px",
        borderRadius: "50%",
        backgroundColor: isContainedIndicator ? (containerColor || "#C7B3FC") : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
     <Box
        component="img"
        src="/material-loading-indicator.gif"
        alt="Loading..."
        sx={{
          width: "100%", 
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          userSelect: "none",
          filter: solvedFilter || "brightness(0) saturate(100%) invert(24%) sepia(9%) saturate(3907%) hue-rotate(217deg) brightness(96%) contrast(89%)",
           }}
      />
    </Box>
  );
}

LoadingIndicator.propTypes = {
  containerColor: PropTypes.string,
  indicatorColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isContainedIndicator: PropTypes.bool,
};
