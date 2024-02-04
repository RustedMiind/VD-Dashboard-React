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
import NonRoundedChip from "../../../../components/NonRoundedChip";

const StatusDialog = ({ open, onClose, id }: PropsType) => {
  const [details, setDetails] = useState<Partial<PanelData>>();
  const [date, setDate] = useState("");

  useEffect(() => {
    if (open && id) {
      axios
        .get<{ data: PanelData }>(
          Api(`employee/client/order/statusOrder/${id}`)
        )
        .then(({ data }) => {
          setDetails(data.data || []);
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
      case 18:
        chip = <NonRoundedChip color="error" variant={variant} label="مرفوض" />;
        break;
      case 19:
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
                {typeof details === "object" &&
                  details.order_step_form?.map((step) => (
                    <TableRow key={step.id}>
                      <TableCell>
                        {step?.employee?.name || "لا يوجد موظف"}
                      </TableCell>
                      <TableCell>
                        {formatDate(step.employee.created_at)}
                      </TableCell>
                      <TableCell>
                        {formatDate(step?.employee.updated_at)}
                      </TableCell>
                      <TableCell>{step?.department.name}</TableCell>
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
                          {step.note}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
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
