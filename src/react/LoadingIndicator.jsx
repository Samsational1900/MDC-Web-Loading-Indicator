import React, { memo, useState, useEffect } from 'react';
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Color, Solver } from "@/utils/ColorSolver";

// 1. Pre-computed Map: Skip the math for common colors!
const PRE_COMPUTED_FILTERS = {
  "ffffff": "brightness(0) invert(100%)",
  "000000": "brightness(0)",
  "4e3b7b": "brightness(0) saturate(100%) invert(22%) sepia(9%) saturate(4921%) hue-rotate(221deg) brightness(96%) contrast(85%)",
};

// 2. Wrap in memo so parent re-renders don't trigger this logic
const LoadingIndicator = memo(({ 
  containerColor = "#C7B3FC", 
  indicatorColor = "#4E3B7B", 
  width = "38px", 
  height = "38px", 
  isContainedIndicator = true 
}) => {
  const defaultFilter = PRE_COMPUTED_FILTERS["4e3b7b"];
  const [solvedFilter, setSolvedFilter] = useState(defaultFilter);

  useEffect(() => {
    if (!indicatorColor) return;
    
    // Handle already-solved strings
    if (indicatorColor.includes("invert")) {
      setSolvedFilter(indicatorColor);
      return;
    }

    const hex = indicatorColor.replace('#', '').toLowerCase();

    // Strategy A: Check Pre-computed Map (Fastest)
    if (PRE_COMPUTED_FILTERS[hex]) {
      setSolvedFilter(PRE_COMPUTED_FILTERS[hex]);
      return;
    }

    // Strategy B: Check LocalStorage (Fast)
    const cacheKey = `f_cache_${hex}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setSolvedFilter(cached);
      return;
    }

    // Strategy C: Solve (Heavy - Offloaded)
    const calculate = setTimeout(() => {
      try {
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        // Basic validation to prevent solver crash
        if (isNaN(r) || isNaN(g) || isNaN(b)) return;

        const color = new Color(r, g, b);
        const solver = new Solver(color);
        const result = solver.solve();
        const filterValue = result.filter.replace('filter: ', '').replace(';', '');

        localStorage.setItem(cacheKey, filterValue);
        setSolvedFilter(filterValue);
      } catch (e) {
        console.error("Samsational Solver Error:", e);
      }
    }, 50); // Small delay to prioritize UI frame

    return () => clearTimeout(calculate);
  }, [indicatorColor]);

  return (
    <Box
      sx={{
        padding: "10px",
        width, height,
        borderRadius: "50%",
        backgroundColor: isContainedIndicator ? containerColor : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.3s ease", // Optimized transition
        willChange: "filter", // Tells the browser to prep the GPU
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
          filter: solvedFilter,
          pointerEvents: "none",
        }}
      />
    </Box>
  );
});

LoadingIndicator.displayName = "LoadingIndicator";

export default LoadingIndicator;