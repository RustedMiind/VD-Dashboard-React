import { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import NonRoundedChip from "../../../../../../../../components/NonRoundedChip";
import { formatDate } from "../../../../../../../../methods";
import { StepStatusData } from "../../../../../../../clients/clientRequest/types";
import { Api } from "../../../../../../../../constants";

const StatusDialog = ({ open, onClose, id }: PropsType) => {
  const [date, setDate] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(Api(`employee/client/order/statusOrder/${id}`))
        .then(({ data }) => {
          // setDate(formatDate(data.data[0].created_date) || "");
        });
    }
  }, [open]);
  const generateChip = (value: number | undefined): JSX.Element => {
    const variant = "outlined";
    let chip: JSX.Element = <></>;

    switch (value) {
      case 0:
        chip = (
          <NonRoundedChip
            color="primary"
            variant={variant}
            label="تحت الاجراء"
          />
        );
        break;
      case 19:
        chip = <NonRoundedChip color="error" variant={variant} label="مرفوض" />;
        break;
      case 18:
        chip = (
          <NonRoundedChip color="success" variant={variant} label="مقبول" />
        );
        break;
      case 33:
        chip = (
          <NonRoundedChip color="success" variant={variant} label="معتمد" />
        );
        break;
      default:
        break;
    }

    return chip;
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>حالة الطلب</DialogTitle>
      <DialogContent>
        <Paper elevation={3} sx={{ bgcolor: "Background" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>اسم الموظف</TableCell>
                  <TableCell>تاريخ الورود</TableCell>
                  <TableCell>تاريخ الانتهاء</TableCell>
                  <TableCell>القسم الوظيفي</TableCell>
                  <TableCell>حالة الطلب</TableCell>
                  <TableCell>الملاحظات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <Box
                      component="span"
                      sx={{
                        display: "inline-block",
                        maxWidth: 150,
                        overflow: "hidden",
                      }}
                    ></Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default StatusDialog;
type PropsType = {
  open: boolean;
  onClose: () => void;
  id?: number;
};
