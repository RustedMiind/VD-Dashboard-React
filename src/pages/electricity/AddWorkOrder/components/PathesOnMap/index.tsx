import { Box } from "@mui/material";
import { ShowMap } from "./components/Map";
import { useState } from "react";

export default function PathesOnMap() {
  const [locationsPositions, setLocationsPositions] = useState<PositionType[]>(
    []
  );

  return (
    <Box>
      <ShowMap
        positionClick={locationsPositions}
        setPositionClick={setLocationsPositions}
        lat={21.036}
        long={34.2048}
      />
    </Box>
  );
}

type PositionType = [number, number];
