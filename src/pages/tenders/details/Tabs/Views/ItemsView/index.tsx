import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import StatusRowComponent from "./StatusRowComponent";
import { useContext, useState } from "react";
import { TenderDataContext } from "../../..";
import BuyDialog from "./TakeActionDialogs/BuyDialog";
import {
  TenderApprovalStatus,
  TenderStep,
} from "../../../../../../types/Tenders/Status.enum";
import SettingsIcon from "@mui/icons-material/Settings";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import OthersDialog from "./TakeActionDialogs/OthersDialog";
import ApprovalRowComponent from "./ApprovalRowComponent";
import TenderApproveDialog from "./TakeActionDialogs/TenderApproveDialog";
import PayRowComponent from "./PayRowComponent";

const Th = (props: TableCellProps) => <TableCell {...props} />;

function ItemsView() {
  const { tender } = useContext(TenderDataContext);
  const [dialogOpen, setDialogOpen] = useState<undefined | TenderStep>(
    undefined
  );
  const closeDialog = () => {
    setDialogOpen(undefined);
  };
  if (typeof tender === "object") {
    const dialogComponent = (dialogType: TenderStep): React.ReactNode => {
      let disabled = false;
      if (
        (dialogType === TenderStep.ACCEPTION &&
          tender.eng_employee_status === -1) ||
        (dialogType === TenderStep.PURCHASE && tender.buy_status === -1) ||
        (dialogType === TenderStep.APPLY && tender.apply_status === -1) ||
        (dialogType === TenderStep.FILE && tender.trace_status === -1) ||
        (dialogType === TenderStep.FINANCIAL &&
          tender.file_finacial_status === -1) ||
        (dialogType === TenderStep.TECHNICAL && tender.technical_status === -1)
      ) {
        disabled = false;
      }

      if (tender.user_type?.includes(parseInt(dialogType))) {
        return (
          <IconButton
            size="small"
            color="primary"
            disabled={disabled}
            onClick={() => {
              setDialogOpen(dialogType);
            }}
          >
            {disabled ? <DoneIcon /> : <SettingsIcon />}
          </IconButton>
        );
      } else {
        return (
          <IconButton size="small" color="primary" disabled>
            {disabled ? <DoneIcon /> : <ClearIcon />}
          </IconButton>
        );
      }
    };
    return (
      <>
        <BuyDialog
          close={closeDialog}
          open={dialogOpen === TenderStep.PURCHASE}
          onClose={closeDialog}
          userType={TenderStep.PURCHASE}
          status={tender?.buy_status}
          uploadedFile={tender.pictures?.buy_tender}
          buyTender={tender?.buy_tender}
        />
        <TenderApproveDialog
          open={dialogOpen === TenderStep.ACCEPTION}
          userType={TenderStep.ACCEPTION}
          close={closeDialog}
          onClose={closeDialog}
          status={tender?.buy_status}
          uploadedFile={tender.pictures?.buy_tender}
        />
        {/* <OthersDialog
          close={closeDialog}
          title="شراء المنافسة"
          open={dialogOpen === TenderStep.PURCHASE}
          onClose={closeDialog}
        /> */}
        <OthersDialog
          close={closeDialog}
          userType={TenderStep.TECHNICAL}
          title="العرض الفني"
          open={dialogOpen === TenderStep.TECHNICAL}
          onClose={closeDialog}
          endDate={tender?.tender_tasks?.end_dete_technical}
          status={tender?.technical_status}
          uploadedFile={tender.pictures?.technical_tender}
        />
        <OthersDialog
          close={closeDialog}
          userType={TenderStep.FILE}
          title="الملف المدمج"
          open={dialogOpen === TenderStep.FILE}
          onClose={closeDialog}
          endDate={tender?.tender_tasks?.end_dete_trace}
          status={tender?.trace_status}
          uploadedFile={tender.pictures?.employee_trace}
        />
        <OthersDialog
          close={closeDialog}
          userType={TenderStep.FINANCIAL}
          title="العرض المالي"
          open={dialogOpen === TenderStep.FINANCIAL}
          onClose={closeDialog}
          endDate={tender?.tender_tasks?.dete_file_finacial}
          status={tender?.file_finacial_status}
          uploadedFile={tender.pictures?.file_finacial_tender}
        />
        <OthersDialog
          close={closeDialog}
          title="الملف المدمج"
          open={dialogOpen === TenderStep.FILE}
          userType={TenderStep.FILE}
          onClose={closeDialog}
          endDate={tender?.tender_tasks?.end_dete_trace}
          status={tender?.trace_status}
          uploadedFile={tender.pictures?.employee_trace}
        />
        <OthersDialog
          close={closeDialog}
          title="تقديم المنافسة"
          open={dialogOpen === TenderStep.APPLY}
          userType={TenderStep.APPLY}
          onClose={closeDialog}
          endDate={tender?.tender_tasks?.dete_apply_tender}
          status={tender?.apply_status}
          uploadedFile={tender.pictures?.apply_tender}
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <Th>البند</Th>
                <Th>حالة البند</Th>
                <Th>المهندس المسؤول</Th>
                <Th>تاريخ الانتهاء</Th>
                <Th>تاريخ الانتهاء الفعلي</Th>
                <Th>عرض الملف</Th>
              </TableRow>
            </TableHead>
            <TableBody>
              <ApprovalRowComponent
                {...{
                  name: "الموافقة",
                  managerName: tender.tender_tasks?.eng_employee?.name,
                  endDate: tender.tender_tasks?.end_dete_accept,
                  accualEndDate: tender.eng_employee_date,
                  iconComponent: dialogComponent(TenderStep.ACCEPTION),
                  status: tender.eng_employee_status,
                }}
              />
              <PayRowComponent
                {...{
                  name: "شراء المنافسة",
                  managerName:
                    tender.tender_tasks?.eng_employee_buy_tender?.name,
                  endDate: tender.tender_tasks?.dete_buy_tender,
                  accualEndDate: tender.buy_date,
                  iconComponent: dialogComponent(TenderStep.PURCHASE),
                  status: tender.buy_status,
                }}
              />
              <StatusRowComponent
                {...{
                  name: "العرض الفني",
                  managerName:
                    tender.tender_tasks?.eng_employee_technical?.name,
                  endDate: tender.tender_tasks?.end_dete_technical,
                  accualEndDate: tender.technical_date,
                  iconComponent: dialogComponent(TenderStep.TECHNICAL),
                  status: tender.technical_status,
                }}
              />
              <StatusRowComponent
                {...{
                  name: "العرض المالي",
                  managerName:
                    tender.tender_tasks?.eng_employee_file_finacial?.name,
                  endDate: tender.tender_tasks?.dete_file_finacial,
                  accualEndDate: tender.file_finacial_date,
                  iconComponent: dialogComponent(TenderStep.FINANCIAL),
                  status: tender.file_finacial_status,
                }}
              />
              <StatusRowComponent
                {...{
                  name: "الملف المدمج",
                  managerName: tender.tender_tasks?.employee_trace?.name,
                  endDate: tender.tender_tasks?.end_dete_trace,
                  accualEndDate: tender.trace_date,
                  iconComponent: dialogComponent(TenderStep.FILE),
                  status: tender.trace_status,
                }}
              />
              <StatusRowComponent
                {...{
                  name: "تقديم المنافسة",
                  managerName:
                    tender.tender_tasks?.eng_employee_apply_tender?.name,
                  endDate: tender.tender_tasks?.dete_apply_tender,
                  accualEndDate: tender.apply_date,
                  iconComponent: dialogComponent(TenderStep.APPLY),
                  status: tender.apply_status,
                }}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  } else return <></>;
}

export default ItemsView;
