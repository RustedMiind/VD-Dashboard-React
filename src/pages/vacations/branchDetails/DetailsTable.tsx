import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { VacationsDetailsType } from ".";
import StatusChip from "../../../components/StatusChip";
import { useState } from "react";
import ShowVactionDialog from "../ShowVactionDialog";
import { NavLink } from "react-router-dom";
import { DialogState } from "./FilterDetails";
import EditIcon from "@mui/icons-material/Edit";

function DetailsTable(props: PropsType) {
  const [open, setOpen] = useState<boolean>(false);
  const [itemId, setItemId] = useState<number>();

  function openDialog() {
    setOpen(!open);
  }
  return (
    <Paper>
      <Stack p={2}>
        <TableContainer>
          <Table padding="normal">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: 20 }}>العام</TableCell>
                <TableCell align="center" sx={{ fontSize: 17 }}>
                  عدد الأجازات
                </TableCell>
                <TableCell align="center" sx={{ fontSize: 17 }}>
                  عدد الأيام
                </TableCell>
                <TableCell align="center" sx={{ fontSize: 17 }}>
                  الحالة
                </TableCell>
                <TableCell align="center" sx={{ fontSize: 17 }}>
                  المستخدم
                </TableCell>
                <TableCell align="center" sx={{ fontSize: 17 }}>
                  المتبقي
                </TableCell>
                <TableCell align="center" sx={{ fontSize: 17 }}>
                  الإعدادت
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.vacationsData?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.year}</TableCell>
                  <TableCell align="center">{item.vacationNumber}</TableCell>
                  <TableCell align="center">{item.vacationDayNumber}</TableCell>
                  <TableCell align="center">
                    <StatusChip
                      color={
                        item.status.name === "مسودة" ? "warning" : "success"
                      }
                      label={item.status.name}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {item.vacationDayNumberUsed}
                  </TableCell>
                  <TableCell align="center">
                    {item.vacationDayNumberstay}
                  </TableCell>
                  <TableCell align="center">
                    <NavLink to={`${item.id}`}>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </NavLink>
                    <IconButton
                      onClick={() => {
                        setItemId(item.id);
                        props.openDetailsDialog();
                      }}
                    >
                      <VisibilityIcon color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <ShowVactionDialog
        closeDialog={props.closeDialog}
        open={props.dialogState == "details"}
        itemId={itemId}
        vacationsData={props.vacationsData}
      />
    </Paper>
  );
}

export default DetailsTable;

type PropsType = {
  vacationsData?: VacationsDetailsType[];
  openDetailsDialog: () => void;
  dialogState: DialogState;
  closeDialog: () => void;
};
