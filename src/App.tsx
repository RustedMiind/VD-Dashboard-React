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

const rows = repeatObject(
  createData(
    "علي سليمان",
    "06/07/2023",
    "القاهرة",
    "في ميديا",
    "07:30 ص",
    "07:33 ص",
    "04:15 م",
    "3د",
    "7 س",
    "600"
  ),
  50
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <Typography mb={3} variant="h5">
          حضور الموظفين
        </Typography>
        <Paper
          variant="elevation"
          sx={{ backgroundColor: "Background" }}
          elevation={4}
        >
          <TableContainer sx={{ maxHeight: 700 }}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              stickyHeader
            >
              <TableHead>
                <TableRow
                  sx={{
                    "th,td": {
                      fontWeight: 700,
                      backgroundColor: "background.paper",
                      borderBottom: "1px solid transparent",
                      borderBottomColor: "primary.main",
                    },
                  }}
                >
                  <TableCell>الاسم</TableCell>
                  <TableCell>التاريخ</TableCell>
                  <TableCell>الفرع</TableCell>
                  <TableCell>الادارة</TableCell>
                  <TableCell>الحضور الرسمي</TableCell>
                  <TableCell>الانصراف الرسمي</TableCell>
                  <TableCell>الحضور الفعلي</TableCell>
                  <TableCell>الانصراف الفعلي</TableCell>
                  <TableCell>ساعات التأخير</TableCell>
                  <TableCell>اجمالي ساعات اليوم</TableCell>
                  <TableCell>الاجر اليومي</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.branch}</TableCell>
                    <TableCell>{row.management}</TableCell>
                    <TableCell>{row.attendTime}</TableCell>
                    <TableCell>{row.clockOutTime}</TableCell>
                    <TableCell>{row.clockInTime}</TableCell>
                    <TableCell>{row.clockOutTime}</TableCell>
                    <TableCell>{row.latency}</TableCell>
                    <TableCell>{row.totalWorkHours}</TableCell>
                    <TableCell>{row.todaysPay}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
