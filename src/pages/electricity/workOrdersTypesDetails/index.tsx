import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import MissionsProgressBar from "./components/MissionsProgressBar";
import CreateAndUpdateDialog from "./components/Dialog";
import axios from "axios";
import { Api } from "../../../constants";
import { Envoy } from "../../../types/Envoys/Envoy";
import { EmployeeType } from "../../../types";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/Loading/Loader";
import { WorkOrderType } from "../../../types/electricity/WorkOrderType";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";

// * declare helper types
type ProcedureType = {
  id: number;
  name: string;
  type_work_instruction_id: number;
  created_at: string;
  updated_at: string;
};
type TaskType = {
  work_instruction_procedure_id: number;
  representative_id: number;
  employee_id: number;
  title: string;
  description: string;
  status: string;
  updated_at: string;
  created_at: string;
  id: number;
};

const WorkOrdersTypesDetails = () => {
  // * Declare our component state
  const [mission, setMission] = useState("");
  const [workName, setWorkName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState<
    "CREATE" | "UPDATE" | "SHOW"
  >("CREATE");
  const [workType, setworkType] = useState<WorkOrderType>();
  const [procedures, setProcedures] = useState<ProcedureType[]>([]);
  const [selectedItem, setSelectedItem] = useState<Partial<TaskType>>({});
  const [envoys, setEnvoys] = useState<Envoy[]>([]);
  const Navigator = useNavigate();
  const [employees, setEmployees] = useState<Partial<EmployeeType>[]>([]);
  const [activeProcedureId, setActiveProcedureId] = useState<number>(0);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  // *extract id from url
  let { id } = useParams();
  //TODO::load required data
  useEffect(() => {
    try {
      if (!id) {
        return Navigator("/");
      }
      // TODO::fetch procedures data
      axios
        .get<{ work_type_instructions: WorkOrderType[] }>(
          Api(`employee/type-work-instruction?id=${id}`)
        )
        .then(({ data }) => {
          setworkType(data.work_type_instructions[0]);
          setProcedures(data.work_type_instructions[0].procedures);
          setActiveProcedureId(
            data.work_type_instructions[0].procedures[0]?.id
          );
        })
        .catch((error) => {
          console.log("error in load envoys data", error);
        })
        .finally(() => {
          console.log("procedures data", procedures, "id", id);
        });

      axios
        .get<{ representatives: Envoy[] }>(Api("employee/representative"))
        .then(({ data }) => {
          setEnvoys(data.representatives);
        })
        .catch((error) => {
          console.log("error in load envoys data", error);
        })
        .finally(() => {
          console.log("Envoys data", envoys);
        });

      axios
        .post<{ data: Partial<EmployeeType>[] }>(Api("employee/employees"))
        .then((res) => {
          setEmployees(res.data.data);
        })
        .catch((err) => {
          console.log("error in fetch employee data", err);
        })
        .finally(() => {
          console.log("employees data", employees);
        });
    } catch (err) {
      console.log("Error in fetch basix data:", err);
    }
  }, []);
  //*fetch procedure tasks
  useEffect(() => {
    setLoadingTasks(true);
    axios
      .get<{ tasks: TaskType[] }>(
        Api(
          `employee/work-instruction/task/get-by-procedure/${activeProcedureId}`
        )
      )
      .then(({ data }) => {
        setTasks(data.tasks);
      })
      .catch((error) => {
        console.log("error in load envoys data", error);
      })
      .finally(() => {
        setLoadingTasks(false);
        console.log(
          "tasks data",
          tasks,
          "activeProcedureId",
          activeProcedureId
        );
      });
  }, [activeProcedureId]);
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
  const ProcedureItem = ({ id, text }: { id: number; text: string }) => {
    return (
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "4rem",
            backgroundColor:
              activeProcedureId !== id ? "primary.lightest" : "background.med",
            margin: "0.4rem 0.2rem",
            width: "96%",
            borderRadius: "11px",
            padding: "0 10px",
            cursor: "pointer",
          }}
          onClick={() => setActiveProcedureId(id)}
        >
          <Typography variant="body1" fontSize={17} fontWeight={800}>
            {text}
          </Typography>
          <KeyboardArrowLeftOutlinedIcon />
        </Box>
      </Box>
    );
  };
  const MissionItem = ({ text, task }: { text: string; task: TaskType }) => {
    const [showOptions, setShowOptions] = useState(false);

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
            <RemoveRedEyeOutlinedIcon
              sx={{ cursor: "pointer" }}
              onClick={() => HandleShowTaskData(task)}
            />
            <Box sx={{ position: "relative" }}>
              <SettingsOutlinedIcon
                sx={{ cursor: "pointer", position: "relative" }}
                className="has-dropdown-on-hover"
                onClick={() => setShowOptions((prev) => !prev)}
              />
              <Paper
                className="menu"
                sx={{
                  position: "absolute",
                  top: "30px",
                  display: showOptions ? "flex" : "none",
                  width: "63px",
                  left: "-13px",
                  justifyContent: "space-between",
                  height: "35px",
                  zIndex: "10",
                  alignItems: "center",
                  boxShadow: "1px 1px 8px gray",
                  background: "#fff",
                  transition: "all 0.5s ease",
                  ":hover": {
                    transform: "scale(1.0599)",
                  },
                }}
              >
                <EditIcon
                  color="warning"
                  sx={{ cursor: "pointer" }}
                  onClick={() => HandleEditTaskData(task)}
                />
                <DeleteIcon
                  color="error"
                  sx={{ cursor: "pointer" }}
                  onClick={() => HandleDeleteTaskData(task)}
                />
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };
  //TODO::Declare helper functions
  const getData = async () => {
    // Get Procedures
    axios
      .get<{ work_type_instructions: WorkOrderType[] }>(
        Api(`employee/type-work-instruction?id=${id}`)
      )
      .then(({ data }) => {
        setworkType(data.work_type_instructions[0]);
        let allData = data.work_type_instructions[0].procedures;
        if (allData.filter((p) => p.name.includes(workName)).length == 0) {
          setProcedures(allData);
          return allData;
        } else {
          allData = allData.filter((p) => p.name.includes(workName));
          setProcedures(allData);
          return allData;
        }
      })
      .then(async (produces) => {
        setLoadingTasks(true);
        let n = produces.length;
        for (let i = 0; i < n; i++) {
          let _tasks = await axios
            .get<{ tasks: TaskType[] }>(
              Api(
                `employee/work-instruction/task/get-by-procedure/${produces[i].id}`
              )
            )
            .then(({ data }) => {
              return data.tasks;
            });
          if (mission.length)
            _tasks = _tasks.filter((t) => t.title.includes(mission));

          if (_tasks.length) {
            setActiveProcedureId(produces[i].id);
            return _tasks;
          }
        }
        return [];
      })
      .then((_tasks) => {
        setTasks(_tasks);
      })
      .catch((error) => {
        console.log("error in load envoys data", error);
      })
      .finally(() => {
        setLoadingTasks(false);
        console.log("procedures data", procedures, "id", id);
      });
  };
  const HandleShowTaskData = (t: TaskType) => {
    setSelectedItem(t);
    setDialogAction("SHOW");
    console.log("show:-", selectedItem);
    setOpenDialog(true);
  };
  const HandleEditTaskData = (t: TaskType) => {
    setSelectedItem(t);
    setDialogAction("UPDATE");
    setOpenDialog(true);
  };
  const HandleDeleteTaskData = (t: TaskType) => {
    axios
      .delete(Api("employee/work-instruction/task/delete"), {
        data: { ids: [t.id] },
      })
      .then((res) => {
        setTasks((prev) => prev.filter((e) => e.id != t.id));
        enqueueSnackbar("تم الحذف بنجاح");
      })
      .catch((err) => {
        enqueueSnackbar("تعذر في الحذف ", { variant: "error" });
      });
  };

  return (
    <>
      <CreateAndUpdateDialog
        workType={workType}
        setTasks={setTasks}
        selectedItem={selectedItem}
        dialogProps={{
          onClose: () => setOpenDialog(false),
          open: openDialog === true,
        }}
        openDialog={openDialog}
        handleClose={() => setOpenDialog(false)}
        dialogAction={dialogAction}
        envoys={envoys}
        employees={employees}
        activeProcedureId={activeProcedureId}
      />

      <SearchBar
        getData={getData}
        mission={mission}
        setMission={setMission}
        workName={workName}
        setWorkName={setWorkName}
      />

      <Grid container sx={{ minHeight: "60vh", marginTop: "2rem" }}>
        <Grid item xs={12} md={6}>
          <SubHeader text="اجراءات" />
          {procedures.length > 0 &&
            procedures.map((p, idx) => {
              return <ProcedureItem key={idx} id={p.id} text={p.name} />;
            })}
          {procedures.length == 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
              }}
            >
              <Typography variant="h6">لايوجد أجراءات</Typography>
            </Box>
          )}
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
              {loadingTasks && <Loader h="250px" />}
              {!loadingTasks && tasks.length == 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "200px",
                  }}
                >
                  <Typography variant="h6">لايوجد مهام</Typography>
                </Box>
              )}
              {!loadingTasks &&
                tasks.length > 0 &&
                tasks.map((mission, idx) => (
                  <MissionItem key={idx} task={mission} text={mission.title} />
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
                onClick={() => {
                  setDialogAction("CREATE");
                  setOpenDialog(true);
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
