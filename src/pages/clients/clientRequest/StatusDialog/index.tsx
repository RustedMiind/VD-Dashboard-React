import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { formatDate } from "../../../../methods";
import { PanelData, StepStatusData } from "../types";
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
  const [details, setDetails] = useState<StepStatusData[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (open && id) {
      setDetails(undefined);
      axios
        .get<{ data: StepStatusData[] }>(
          Api(`employee/client/order/statusOrder?client_id=${id}`)
        )
        .then(({ data }) => {
          setDetails(data.data);
        });
    }
  }, [open]);
  const generateChip = (value: number): JSX.Element => {
    const variant = "outlined";
    let chip: JSX.Element = <></>;

    switch (value) {
      case 2:
        chip = <Chip color="primary" variant={variant} label="تحت الاجراء" />;

        break;
      case 99:
        chip = <Chip color="error" variant={variant} label="مرفوض" />;
        break;
      case 33:
        chip = <Chip color="success" variant={variant} label="مقبول" />;
        break;
      case 100:
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
                  const note = step?.order_step_form[0]?.note;
                  return (
                    <TableRow key={step.id}>
                      <TableCell>
                        {
                          step.order_step_form[0]?.order_step[0]?.employees
                            ?.name
                        }
                      </TableCell>
                      <TableCell>{formatDate(step?.created_date)}</TableCell>
                      <TableCell>
                        {formatDate(step?.order_step_form[0]?.end_date)}
                      </TableCell>
                      <TableCell>
                        {
                          step.order_step_form[0]?.order_step[0]?.department
                            ?.name
                        }
                      </TableCell>
                      <TableCell>
                        {generateChip(step.order_step_form[0]?.status)}
                      </TableCell>
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
