import { useEffect, useState } from "react";
import { Api } from "../../../constants";
import axios from "axios";
import BranchImage from "../../../assets/images/branch_image.jpg";
import {
  Box,
  Button,
  CardActions,
  Grid,
  Stack,
  CardMedia,
  Typography,
  Card,
  CardActionArea,
  Tooltip,
  Alert,
  IconButton,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { NavLink } from "react-router-dom";
import BranchCardPlaceholder from "./BranchCardPlaceholder";
import BranchLoadingPlaceholder from "./BranchLoadingPlaceholder";

function VacationsSettings() {
  const [vacationsArr, setVacationsData] = useState<
    VacationsArr[] | "error" | "loading" | "none"
  >("none");

  useEffect(() => {
    setVacationsData("loading");
    axios
      .get<{ date: VacationsArr[] }>(Api("employee/vacation"))
      .then((data) => {
        setVacationsData(data.data.date);
      })
      .catch((err) => {
        setVacationsData("error");
      });
  }, []);

  return (
    <Stack>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        إعدادات الأجازات
      </Typography>

      {vacationsArr === "loading" && <BranchLoadingPlaceholder />}
      <Grid container spacing={4} mt={1}>
        {Array.isArray(vacationsArr) &&
          vacationsArr?.map((vacation) => (
            <Grid item xs={4} key={vacation.id}>
              <Card>
                <CardActionArea
                  component={NavLink}
                  to={`${vacation.id}`}
                  sx={{ position: "relative" }}
                >
                  <CardMedia component="img" height={220} image={BranchImage} />
                  <Stack
                    sx={{
                      top: 0,
                      position: "absolute",
                      width: 1,
                      height: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "linear-gradient(180deg, rgba(243, 245, 247, 0.4) 20%, #dadcde 100%)",
                    }}
                  >
                    {vacation?.vacationbranch?.status_id === 34 && (
                      <Tooltip
                        arrow
                        color="primary"
                        placement="top-end"
                        leaveDelay={400}
                        title={
                          <Typography>
                            لم يعتمد اضافة محدد الى الفرع، يرجى مراجعة البيانات.
                          </Typography>
                        }
                      >
                        <IconButton
                          color="warning"
                          size="small"
                          sx={{
                            bgcolor: "Background",
                            position: "absolute",
                            top: 4,
                            right: 4,
                          }}
                        >
                          <ErrorOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      {vacation.name}
                    </Typography>
                  </Stack>
                </CardActionArea>
                <Box
                  sx={{
                    backgroundColor: "primary.main",
                  }}
                  py={1}
                >
                  <CardActions
                    sx={{
                      overflowX: "auto",
                      maxWidth: 1,
                      width: 1,
                      direction: "row",
                    }}
                  >
                    {vacation.vacation_dates.map((vacationDate, index) => (
                      <Box
                        key={index}
                        sx={{
                          borderRadius: 1,
                          bgcolor: "Background",
                          maxWidth: 0.318,
                          minWidth: 0.318,
                        }}
                      >
                        <Button
                          component={NavLink}
                          to={`${vacation.id}/${vacationDate.id}`}
                          size="large"
                          color="primary"
                          fullWidth
                        >
                          {vacationDate.year}
                        </Button>
                      </Box>
                    ))}
                  </CardActions>
                </Box>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Stack>
  );
}

export default VacationsSettings;

type VacationsArr = {
  id: number;
  name: string;
  vacation_dates: VacationDate[];
  vacationbranch: VacationBranch;
};

type VacationBranch = {
  branch_id: number;
  id: number;
  status_id: number;
  // card_image: null;
  // created_at: null;
  // updated_at: null;
};

type VacationDate = {
  id: number;
  branch_id: number;
  year: number;
  // created_at: null;
  // updated_at: null;
};
