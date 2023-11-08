import "./App.scss";
import Typography from "@mui/material/Typography";
import { theme } from "./theme/MUI_Theme";
import { ThemeProvider, Paper } from "@mui/material";
import MainLayout from "./layout/main-layout/MainLayout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import RoutesComponent from "./Routes";
import axios from "axios";
import { token } from "./token";

function repeatObject(obj: any, length: number): any[] {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(obj);
  }
  return arr;
}

function createData(
  name: string,
  date: string,
  branch: string,
  management: string,
  attendTime: string,
  clockInTime: string,
  clockOutTime: string,
  latency: string,
  totalWorkHours: string,
  todaysPay: string
) {
  return {
    name,
    date,
    branch,
    management,
    attendTime,
    clockInTime,
    clockOutTime,
    latency,
    totalWorkHours,
    todaysPay,
  };
}

axios.defaults.headers.common.Authorization = token;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <RoutesComponent />
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
