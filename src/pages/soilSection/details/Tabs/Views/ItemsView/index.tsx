import {
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useContext, useState } from "react";
import { SoilDataContext } from "../../..";
import { generateChip } from "../../../Cards/Items";
import LimitTypography from "../../../../../../components/LimitTypograpgy";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import IconButton from "@mui/material/IconButton";
import { formatDate } from "../../../../../../methods";
import CloseIcon from "@mui/icons-material/Close";
import ModelDialog from "./Dialogs/ModelDialog";
import DetailsDialog from "./Dialogs/DetailsDialog";
import StatusDialog from "./Dialogs/StatusDialog";
import FinanceDialog from "./Dialogs/financeDialog";
import AcceptDialog from "./Dialogs/acceptDialog";
import ReportDialog from "./Dialogs/reportDialog";
import TestDialog from "./Dialogs/testDialog";
import VisitDialog from "./Dialogs/visitDialog";
function ItemsView() {
  const { items, tasks, soilData } = useContext(SoilDataContext);
  const [selectId, setSeletId] = useState<number>();
  const [dialogOpen, setDialogOpen] = useState<
    | undefined
    | "model"
    | "status"
    | "details"
    | "accept"
    | "finance"
    | "report"
    | "test"
    | "visit"
  >(undefined);
  function handleDialog(formId: number, id: number) {
    return () => {
      switch (formId) {
        case 1:
          handleOpenModel(id);
          break;
        case 2:
          handleOpenModel(id);
          break;
        case 3:
          handleOpenFinance(id);
          break;
        case 4:
          handleOpenAccept(id);
          break;
        case 5:
          handleOpenVisit(id);
          break;
        case 6:
          handleOpenTest(id);
          break;
        case 7:
          handleOpenReport(id);
          break;
        default:
          break;
      }
    };
  }
  const handleOpenModel = (id: number) => {
    setSeletId(id);
    setDialogOpen("model");
  };
  const handleOpenFinance = (id: number) => {
    setSeletId(id);
    setDialogOpen("finance");
  };
  const handleOpenVisit = (id: number) => {
    setSeletId(id);
    setDialogOpen("visit");
  };
  const handleOpenReport = (id: number) => {
    setSeletId(id);
    setDialogOpen("report");
  };
  const handleOpenTest = (id: number) => {
    setSeletId(id);
    setDialogOpen("test");
  };
  const handleOpenAccept = (id: number) => {
    console.log(id);
    setSeletId(id);
    setDialogOpen("accept");
  };
  const handleCloseDialog = () => {
    setDialogOpen(undefined);
  };
  // const handleOpenStatus = () => {
  //   setDialogOpen("status");
  // };
  // const handleOpenDetails = () => {
  //   setDialogOpen("details");
  // };
  const arr = items?.map((item) => {});
  return (
    <>
      <ModelDialog
        open={dialogOpen === "model"}
        id={selectId}
        onClose={handleCloseDialog}
      />
      <DetailsDialog
        open={dialogOpen === "details"}
        id={selectId}
        onClose={handleCloseDialog}
      />
      <StatusDialog
        open={dialogOpen === "status"}
        id={selectId}
        onClose={handleCloseDialog}
      />
      <FinanceDialog
        open={dialogOpen === "finance"}
        id={selectId}
        onClose={handleCloseDialog}
      />
      <AcceptDialog
        open={dialogOpen === "accept"}
        id={selectId}
        onClose={handleCloseDialog}
      />
      <ReportDialog
        open={dialogOpen === "report"}
        id={selectId}
        onClose={handleCloseDialog}
      />
      <TestDialog
        open={dialogOpen === "test"}
        id={selectId}
        onClose={handleCloseDialog}
      />
      <VisitDialog
        open={dialogOpen === "visit"}
        id={selectId}
        onClose={handleCloseDialog}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>البند</TableCell>
              <TableCell>تاريخ الانتهاء</TableCell>
              <TableCell>حالة البند</TableCell>
              <TableCell> المهندس المسؤول</TableCell>
              <TableCell>تاريخ الانتهاء الفعلي</TableCell>
              <TableCell>عرض الملف</TableCell>
            </TableRow>
          </TableHead>
          {Array.isArray(items) &&
            items.map((item) =>
              tasks?.map((task) => (
                <TableBody key={task.id}>
                  <TableCell>{task?.form?.name}</TableCell>
                  <TableCell>{formatDate(task?.updated_at)}</TableCell>
                  <TableCell>
                    {generateChip(task?.order_steps_form?.status)}
                  </TableCell>
                  <TableCell>
                    <LimitTypography>
                      {task?.order_steps_form?.employee?.name}
                    </LimitTypography>
                  </TableCell>
                  <TableCell>{formatDate(task?.updated_at)}</TableCell>
                  <TableCell>
                    {task.has_accses ? (
                      <IconButton
                        onClick={handleDialog(
                          task?.form_id,
                          task.order_steps_form.id
                        )}
                      >
                        <ArticleOutlinedIcon />
                      </IconButton>
                    ) : (
                      <IconButton>
                        <CloseIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableBody>
              ))
            )}
        </Table>
      </TableContainer>
    </>
  );
}

export default ItemsView;
