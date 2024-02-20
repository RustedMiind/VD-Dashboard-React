import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import { Box, Button, Grid, LinearProgress, Typography } from "@mui/material";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import MissionsProgressBar from "./components/MissionsProgressBar";

const WorkOrdersTypesDetails = () => {
  // * Declare our component state
  const [mission, setMission] = useState("");
  const [workName, setWorkName] = useState("");
  let dummyProcedures = [
    { name: "أجراء 1" },
    { name: "أجراء 2" },
    { name: "أجراء 3" },
  ];
  let dummyMissions = [{ name: "مهمة 1" }, { name: "مهمة 2" }];

  //TODO::Declare helper variables
  const SubHeader = ({ text }: { text: string }) => {
    return (
      <Typography
        sx={{
          textAlign: "center",
          bgcolor: "primary.main",
          borderRadius: "8px",
          margin: "0 0.4rem",
          color: "primary.contrastText",
          paddingY: "1rem",
          fontSize: "1.2rem",
        }}
        variant="body1"
        fontWeight={700}
      >
        {text}
      </Typography>
    );
  };
  const ProcedureItem = ({ text }: { text: string }) => {
    return (
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "4rem",
            backgroundColor:
              text !== "أجراء 2" ? "primary.lightest" : "background.med",
            margin: "0.4rem 0.2rem",
            width: "96%",
            borderRadius: "11px",
            padding: "0 10px",
          }}
        >
          <Typography variant="body1" fontSize={17} fontWeight={800}>
            {text}
          </Typography>
          <KeyboardArrowLeftOutlinedIcon />
        </Box>
      </Box>
    );
  };
  const MissionItem = ({ text }: { text: string }) => {
    return (
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "4rem",
            backgroundColor: "background.med",
            margin: "0.4rem 0.2rem",
            width: "96%",
            borderRadius: "11px",
            padding: "0 10px",
          }}
        >
          <Typography variant="body1" fontSize={17} fontWeight={800}>
            {text}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "5rem",
            }}
          >
            <RemoveRedEyeOutlinedIcon />
            <SettingsOutlinedIcon />
          </Box>
        </Box>
      </Box>
    );
  };
  //TODO::Declare helper functions
  const getData = () => {};

  return (
    <>
      <SearchBar
        getData={getData}
        mission={mission}
        setMission={setMission}
        workName={workName}
        setWorkName={setWorkName}
      />

      <Grid container sx={{ minHeight: "60vh",marginTop:'2rem'}}>
        <Grid item xs={12} md={6}>
          <SubHeader text="اجراءات" />
          {dummyProcedures.map((p, idx) => {
            return <ProcedureItem key={idx} text={p.name} />;
          })}
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundColor: "primary.lightest",
            minHeight: "19vh",
          }}
        >
          <SubHeader text="المهام" />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "80%",
              justifyContent: "space-between",
            }}
          >
            <Box>
              {dummyMissions.map((mission, idx) => (
                <MissionItem key={idx} text={mission.name} />
              ))}
            </Box>
            {/* add new mission btn */}
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <Button
                sx={{
                  color: "#F19B02",
                  width: "96%",
                  justifyContent: "space-between",
                  padding: "1.5rem",
                  borderColor: "#F7BD56",
                  border: "1px solid",
                  backgroundColor: "#FFF4E5",
                }}
              >
                <Typography variant="body2" fontSize={16} fontWeight={700}>
                  اضافة مهمة اخرى
                </Typography>
                <AddBoxOutlinedIcon />
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <MissionsProgressBar />
    </>
  );
};

export default WorkOrdersTypesDetails;
