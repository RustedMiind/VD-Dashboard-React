import { Box, Stack, Typography } from "@mui/material";
import { ShowMap } from "./components/Map";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddationInformation from "./components/AddationInformation";

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
      {/* load map pathes from file */}
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{
          borderRadius: "12px",
          bgcolor: "#f3f5f7",
          my: 2,
          p: 1,
        }}
      >
        <Typography variant="body2" fontSize={"0.6"}>
          تحميل مسارات الخريطة من الملف{" "}
        </Typography>
        <AddCircleOutlineIcon />
      </Stack>
      {/* Addation information about map */}
      <AddationInformation />
    </Box>
  );
}

type PositionType = [number, number];
