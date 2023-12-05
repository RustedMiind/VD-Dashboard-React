import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { formatDate } from "../../../../methods";
import { PanelData, StepStatusData, StepStatus } from "../types";
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
import { Api } from "../../../../constants";

const StatusDialog = ({ open, onClose, id }: PropsType) => {
  const [details, setDetails] = useState<Partial<StepStatus>[]>();
  const [date, setDate] = useState("");

  useEffect(() => {
    if (open && id) {
      axios
        .get<{ data: StepStatusData[] }>(
          Api(`employee/client/order/statusOrder?client_id=${id}`)
        )
        .then(({ data }) => {
          setDetails(data.data[0].order_step_form || []);
          setDate(formatDate(data.data[0].created_date) || "");
        });
    }
  }, [open]);
  const generateChip = (value: number | undefined): JSX.Element => {
    const variant = "outlined";
    let chip: JSX.Element = <></>;

    switch (value) {
      case 0:
        chip = <Chip color="primary" variant={variant} label="قيد العمل" />;
        break;
      case 99:
        chip = <Chip color="error" variant={variant} label="مرفوض" />;
        break;
      case 100:
        chip = <Chip color="success" variant={variant} label="مقبول" />;
        break;
      case 33:
        chip = <Chip color="success" variant={variant} label="معتمد" />;
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
                {details?.map((step) => {
                  const note = step?.note;

                  const orderStep = step?.order_step && step?.order_step[0];
                  return (
                    <TableRow key={step.id}>
                      <TableCell>
                        {orderStep?.employees?.name || "لا يوجد موظف"}
                      </TableCell>
                      <TableCell>{date}</TableCell>
                      <TableCell>{formatDate(step?.end_date)}</TableCell>
                      <TableCell>
                        {step?.order_step?.map((item) => {
                          return item?.department?.name;
                        })}
                      </TableCell>
                      <TableCell>{generateChip(step?.status)}</TableCell>
                      <TableCell>
                        <Box
                          component="span"
                          sx={{
                            display: "inline-block",
                            maxWidth: 150,
                            overflow: "hidden",
                          }}
                        >
                          {note || "..."}
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

type PropsType = {
  id: number | undefined;
  open: boolean;
  onClose: () => void;
  setRequests: Dispatch<
    SetStateAction<
      StepStatusData[] | PanelData[] | "loading" | "none" | "error"
    >
  >;
};

export default StatusDialog;
