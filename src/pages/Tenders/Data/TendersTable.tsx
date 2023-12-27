import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import TenderStatus from "./TenderStatus";

function TendersTable() {
  return (
    <>
      <TableContainer
        component={Stack}
        p={2}
        sx={{ maxWidth: 1, overflowX: "scroll" }}
      >
        <Table padding="normal" sx={{ minWidth: 2200 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>الرقم المرجعي</TableCell>
              <TableCell>رقم المنافسة</TableCell>
              <TableCell>الجهة الحكومية</TableCell>
              <TableCell>اسم المنافسة</TableCell>
              <TableCell>أخر موعد للتقديم</TableCell>
              <TableCell>تاريخ الإنتهاء من التقديم</TableCell>
              <TableCell>قيمة المنافسة</TableCell>
              <TableCell>مدة العقد</TableCell>
              <TableCell>القسم التابع له</TableCell>
              <TableCell>قبول القسم</TableCell>
              <TableCell>حالة المنافسة لدي الجهة</TableCell>
              <TableCell>حالة العرض الفني</TableCell>
              <TableCell>حالة العرض المالي</TableCell>
              <TableCell>حالة عرض التقديم</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell align="center">02</TableCell>
              <TableCell align="center">5362</TableCell>
              <TableCell align="center">جهة حكومية</TableCell>
              <TableCell align="center">جهة حكومية</TableCell>
              <TableCell align="center">12/5/2015</TableCell>
              <TableCell align="center">13/9/2025</TableCell>
              <TableCell align="center">غير مدفوع</TableCell>
              <TableCell align="center">سنة</TableCell>
              <TableCell align="center">قسم الموارد</TableCell>
              <TableCell align="center">مقبول</TableCell>
              <TableCell align="center">مقدمة</TableCell>
              <TableCell align="center">منتهي</TableCell>
              <TableCell align="center">جاري</TableCell>
              <TableCell align="center">مستبعد فني</TableCell>
              <TableCell align="center">
                <NavLink to={"test"}>
                  <IconButton color="primary">
                    <SettingsIcon />
                  </IconButton>
                </NavLink>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell align="center">02</TableCell>
              <TableCell align="center">5362</TableCell>
              <TableCell align="center">جهة حكومية</TableCell>
              <TableCell align="center">جهة حكومية</TableCell>
              <TableCell align="center">12/5/2015</TableCell>
              <TableCell align="center">13/9/2025</TableCell>
              <TableCell align="center">غير مدفوع</TableCell>
              <TableCell align="center">سنة</TableCell>
              <TableCell align="center">قسم الموارد</TableCell>
              <TableCell align="center">مرفوض</TableCell>
              <TableCell align="center">مقدمة</TableCell>
              <TableCell align="center">منتهي</TableCell>
              <TableCell align="center">جاري</TableCell>
              <TableCell align="center">مستبعد فني</TableCell>
              <TableCell align="center">
                <NavLink to={"test"}>
                  <IconButton color="primary">
                    <SettingsIcon />
                  </IconButton>
                </NavLink>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell align="center">02</TableCell>
              <TableCell align="center">5362</TableCell>
              <TableCell align="center">جهة حكومية</TableCell>
              <TableCell align="center">جهة حكومية</TableCell>
              <TableCell align="center">12/5/2015</TableCell>
              <TableCell align="center">13/9/2025</TableCell>
              <TableCell align="center">غير مدفوع</TableCell>
              <TableCell align="center">سنة</TableCell>
              <TableCell align="center">قسم الموارد</TableCell>
              <TableCell align="center">مقبول</TableCell>
              <TableCell align="center">مقدمة</TableCell>
              <TableCell align="center">منتهي</TableCell>
              <TableCell align="center">جاري</TableCell>
              <TableCell align="center">مستبعد فني</TableCell>
              <TableCell align="center">
                <NavLink to={"test"}>
                  <IconButton color="primary">
                    <SettingsIcon />
                  </IconButton>
                </NavLink>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell align="center">02</TableCell>
              <TableCell align="center">5362</TableCell>
              <TableCell align="center">جهة حكومية</TableCell>
              <TableCell align="center">جهة حكومية</TableCell>
              <TableCell align="center">12/5/2015</TableCell>
              <TableCell align="center">13/9/2025</TableCell>
              <TableCell align="center">غير مدفوع</TableCell>
              <TableCell align="center">سنة</TableCell>
              <TableCell align="center">قسم الموارد</TableCell>
              <TableCell align="center">مرفوض</TableCell>
              <TableCell align="center">مقدمة</TableCell>
              <TableCell align="center">منتهي</TableCell>
              <TableCell align="center">جاري</TableCell>
              <TableCell align="center">مستبعد فني</TableCell>
              <TableCell align="center">
                <NavLink to={"test"}>
                  <IconButton color="primary">
                    <SettingsIcon />
                  </IconButton>
                </NavLink>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TenderStatus />
    </>
  );
}

export default TendersTable;
