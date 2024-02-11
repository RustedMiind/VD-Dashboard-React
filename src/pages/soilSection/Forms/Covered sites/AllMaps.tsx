import { Box, Grid, GridProps, Paper, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import StatusChip from "../../../../components/StatusChip";
import { SoilContext } from "../../SoilContext";
import { Button } from "@mui/material";
import { Map } from "./Leaflet/Map";
import { ShowMap } from "../../../../components/Leaflet/Map";
import { json } from "stream/consumers";
const GridItem = (props: GridProps) => (
  <Grid sx={{ padding: "0.5rem" }} item md={6} {...props} />
);
const marginTyp = 2;
export default function AllMaps({ setOpenAllMaps, openAllMaps }: PropsType) {
  const { soilData, setSoilData } = useContext(SoilContext);
  const [positionClick, setPositionClick] = useState<[number, number][]>([]);
  const [open, setOpen] = useState<boolean>(false);

  function handlePostion(position: string) {
    let str = position.slice(2, -2);
    let arr = str?.toString().split("},{");

    let positions: [number, number][] = [];
    for (let i = 0; i < arr?.length; i++) {
      let cordin = arr[i].split(",");
      let temp: [number, number] = [
        +cordin[0].split(":")[1],
        +cordin[1].split(":")[1],
      ];

      positions.push(temp);
    }
    setPositionClick(positions);
  }
  console.log("typeof positionClick ", typeof positionClick);

  useEffect(() => {
    setOpen(!open);
  }, [JSON.stringify(positionClick)]);
  return (
    <Stack>
      <Button
        sx={{ width: 0.02, fontWeight: 600, fontSize: "20px" }}
        variant="text"
        onClick={() => {
          setOpenAllMaps(!openAllMaps);
        }}
      >
        رجوع
      </Button>
      <Grid container>
        <Grid item xs={4} padding={2}>
          <Typography sx={{ mb: 2, fontSize: "30px", fontWeight: 600 }}>
            الخريطة الكلية
          </Typography>
          {typeof soilData === "object" &&
            soilData?.soil_location?.map((item) => (
              <Box
                key={item.id}
                component={Paper}
                bgcolor={"Background"}
                padding={2}
                display={"flex"}
                flexDirection={"row"}
                marginBottom={2}
                sx={{
                  background: "Background",
                  p: 2,
                  display: "flex",
                  flexDirection: "row",
                  mb: 2,
                  cursor: "pointer",
                }}
                onClick={() => {
                  handlePostion(item?.map?.map.toString());
                  setOpen(true);
                }}
              >
                <Grid item xs={5}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    حالة العرض
                  </Typography>
                  <Box sx={{ marginY: marginTyp }}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      اسم الموقع
                    </Typography>
                    <Typography variant="body1">
                      {item?.location_name && item?.location_name}
                    </Typography>
                  </Box>
                  <Box sx={{ marginY: marginTyp }}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      نظام البناء
                    </Typography>
                    <Typography variant="body1">
                      {item?.building_system && item?.building_system}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={7}>
                  <StatusChip label="نشط" color="success" />
                  <Box sx={{ marginY: marginTyp }}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      المدينة
                    </Typography>
                    <Typography variant="body1">
                      {item?.city?.name && item?.city?.name}
                    </Typography>
                  </Box>
                  <Box sx={{ marginY: marginTyp }}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      الموقع
                    </Typography>
                    <Typography variant="body1">--- </Typography>
                  </Box>
                </Grid>
              </Box>
            ))}
        </Grid>
        <Grid item xs={8} sx={{ mt: 2 }}>
          <ShowMap
            key={+open}
            positionClick={positionClick}
            setPositionClick={setPositionClick}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

type PropsType = {
  setOpenAllMaps: React.Dispatch<React.SetStateAction<boolean>>;
  openAllMaps: boolean;
};
