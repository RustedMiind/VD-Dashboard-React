import { IconButton, TableBody, TableCell, TableRow } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SettingButton from "./SettingButton";

export default function TableBodyData(props: PropsType) {
  // declare and define component state and variables

  // return component ui
  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell>اسم المقاول</TableCell>
          <TableCell>رقم الجوال</TableCell>
          <TableCell>السجل التجاري</TableCell>
          <TableCell>البريد الالكتروني</TableCell>
          <TableCell>مدير المشروع</TableCell>
          <TableCell>رقم الجوال مدير المشروع</TableCell>
          <TableCell>المرفقات</TableCell>
          <TableCell>
            <SettingButton />
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>اسم المقاول</TableCell>
          <TableCell>رقم الجوال</TableCell>
          <TableCell>السجل التجاري</TableCell>
          <TableCell>البريد الالكتروني</TableCell>
          <TableCell>مدير المشروع</TableCell>
          <TableCell>رقم الجوال مدير المشروع</TableCell>
          <TableCell>المرفقات</TableCell>
          <TableCell>
            <SettingButton />
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
}
type PropsType = {};
