import {
  IconButton,
  TableBody as MuiTableBody,
  TableCell,
  TableRow,
  Checkbox,
  Typography,
  ChipProps,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import React, { useContext, useEffect, useState } from "react";
import { TableContext } from "../TableContext";
import LimitTypography from "../../../../components/LimitTypograpgy";
import StatusChip from "../../../../components/StatusChip";
import { NavLink } from "react-router-dom";
import {
  TenderApprovalStatus,
  TenderItemStatus,
  TenderPay,
  TenderStep,
} from "../../../../types/Tenders/Status.enum";
import DialogData from "./DialogData";
import axios from "axios";
import { Api } from "../../../../constants";
import { Tender } from "../../../../types";
import { useSnackbar } from "notistack";
export function generateTenderItemStatus(
  status?: TenderItemStatus,
  chipProps?: ChipProps
): JSX.Element {
  let chip = <>---</>;
  if (typeof status === "number" || typeof status === "string")
    switch (status) {
      case TenderItemStatus.SENT:
        chip = <StatusChip label="مقدمة" color="warning" {...chipProps} />;
        break;
      case TenderItemStatus.ONGOING:
        chip = <StatusChip label="جاري" color="success" {...chipProps} />;
        break;
      case TenderItemStatus.EXCLUDED:
        chip = (
          <StatusChip label="مستعبد  فني" color="primary" {...chipProps} />
        );
        break;
      case TenderItemStatus.ENDED:
        chip = <StatusChip label="منتهي" color="error" {...chipProps} />;
        break;
    }

  return chip;
}
export function generateTenderPayedStatus(
  status?: TenderPay,
  chipProps?: ChipProps
): JSX.Element {
  let chip = <>---</>;
  if (typeof status === "number" || typeof status === "string")
    switch (status) {
      case TenderPay.PAYED:
        chip = <StatusChip label="مدفوع" color="success" {...chipProps} />;
        break;
      case TenderPay.NOTPAYED:
        chip = (
          <StatusChip
            label="غير مدفوع"
            color="primary"
            disabled
            {...chipProps}
          />
        );
        break;
    }

  return chip;
}
export function generateTenderApprovalStatusChip(
  status?: TenderApprovalStatus,
  chipProps?: ChipProps
): JSX.Element {
  let chip = <>---</>;
  if (typeof status === "number" || typeof status === "string")
    switch (status) {
      case TenderApprovalStatus.ACCEPTED:
        chip = <StatusChip label="مقبول" color="primary" {...chipProps} />;
        break;
      case TenderApprovalStatus.REJECTED:
        chip = <StatusChip label="مرفوض" color="error" {...chipProps} />;
        break;
    }

  return chip;
}
function TableBody() {
  const { tenderTableData, setSelectedTenderId, selectedTenderId } =
    useContext(TableContext);
  const [open, setOpen] = useState<boolean>(false);
  const [displayData, setDisplayData] = useState<TypeDisplayData>({});
  const { enqueueSnackbar } = useSnackbar();

  function CheckboxHandler(e: React.ChangeEvent<HTMLInputElement>) {
    let isSelect = e.target.checked;
    let value = parseInt(e.target.value);
    if (isSelect) {
      setSelectedTenderId &&
        selectedTenderId &&
        setSelectedTenderId([...selectedTenderId, value]);
    } else {
      setSelectedTenderId &&
        setSelectedTenderId((prevData) => {
          return prevData.filter((id) => {
            return id !== value;
          });
        });
    }
  }
  function showDialog(id: number, type: TenderStep) {
    return function () {
      axios
        .get<{ data: Tender }>(Api(`employee/tender/${id}`))
        .then((res) => {
          if (res.data.data) {
            setOpen(!open);
            const tender = res.data.data;
            let dataObject: TypeDisplayData = {};
            switch (type) {
              case TenderStep.ACCEPTION:
                dataObject = {
                  endDate: tender?.tender_tasks?.end_dete_accept,
                  eng: tender?.tender_tasks?.eng_employee?.name,
                  status: generateTenderApprovalStatusChip(
                    tender?.eng_employee_status
                  ),
                  note: tender?.eng_employee_note,
                  startDate: "---",
                };
                break;
              case TenderStep.PURCHASE:
                dataObject = {
                  endDate: tender?.tender_tasks?.dete_buy_tender,
                  eng: tender?.tender_tasks?.eng_employee_buy_tender?.name,
                  status: generateTenderPayedStatus(tender?.buy_status),
                  note: tender?.buy_note,
                  startDate: "---",
                };
                break;
              case TenderStep.TECHNICAL:
                dataObject = {
                  endDate: tender?.tender_tasks?.end_dete_technical,
                  eng: tender?.tender_tasks?.eng_employee_technical?.name,
                  status: generateTenderItemStatus(tender?.technical_status),
                  note: tender?.technical_note,
                  startDate: "---",
                };
                break;
              case TenderStep.FINANCIAL:
                dataObject = {
                  endDate: tender?.tender_tasks?.dete_file_finacial,
                  eng: tender?.tender_tasks?.eng_employee_file_finacial?.name,
                  status: generateTenderItemStatus(
                    tender?.file_finacial_status
                  ),
                  note: tender?.file_finacial_note,
                  startDate: "---",
                };
                break;
              case TenderStep.FILE:
                dataObject = {
                  endDate: tender?.tender_tasks?.end_dete_trace,
                  eng: tender?.tender_tasks?.employee_trace?.name,
                  status: generateTenderItemStatus(tender?.trace_status),
                  note: tender?.eng_employee_note,
                  startDate: "---",
                };
                break;
              case TenderStep.APPLY:
                dataObject = {
                  endDate: tender?.tender_tasks?.dete_apply_tender,
                  eng: tender?.tender_tasks?.eng_employee?.name,
                  status: generateTenderItemStatus(tender?.apply_status),
                  note: tender?.apply_note,
                  startDate: "---",
                };
                break;
            }
            setDisplayData(dataObject);
          }
        })
        .catch(() => {
          enqueueSnackbar("فشل في تحميل بيانات الاجراء", { variant: "error" });
        });
    };
  }

  return (
    <MuiTableBody>
      {Array.isArray(tenderTableData) &&
        tenderTableData.map((tender) => (
          <TableRow key={tender.id}>
            <TableCell>
              <Checkbox
                checked={selectedTenderId?.includes(tender.id)}
                value={tender.id}
                onChange={CheckboxHandler}
              />
            </TableCell>
            <TableCell>
              <Typography
                component={NavLink}
                to={`${tender.id}`}
                variant="body2"
                color={"primary.main"}
                fontWeight={700}
              >
                {tender.tenderdata?.code_reference}
              </Typography>
            </TableCell>
            <TableCell>
              <LimitTypography maxWidth={180}>
                {tender.tenderdata?.code_tender}
              </LimitTypography>
            </TableCell>
            <TableCell>
              <LimitTypography>
                {tender.tenderdata?.organization?.name}
              </LimitTypography>
            </TableCell>
            <TableCell>
              <LimitTypography>{tender.tenderdata?.name}</LimitTypography>
            </TableCell>
            <TableCell>{tender.tenderdata?.strat_date}</TableCell>
            <TableCell>{tender.tenderdata?.end_date}</TableCell>
            <TableCell>
              {generateTenderPayedStatus(tender.buy_status, {
                onClick: showDialog(tender?.id, TenderStep.PURCHASE),
              })}
            </TableCell>
            <TableCell>{tender.tenderdata?.period} يوم</TableCell>
            <TableCell>{tender.tenderdata?.department?.name}</TableCell>
            <TableCell>
              {generateTenderApprovalStatusChip(tender.eng_employee_status, {
                onClick: showDialog(tender?.id, TenderStep.ACCEPTION),
              })}
            </TableCell>
            <TableCell>
              {generateTenderItemStatus(tender.trace_status, {
                onClick: showDialog(tender?.id, TenderStep.FILE),
              })}
            </TableCell>
            <TableCell>
              {generateTenderItemStatus(tender.technical_status, {
                onClick: showDialog(tender?.id, TenderStep.TECHNICAL),
              })}
            </TableCell>
            <TableCell>
              {generateTenderItemStatus(tender.file_finacial_status, {
                onClick: showDialog(tender?.id, TenderStep.FINANCIAL),
              })}
            </TableCell>
            <TableCell>
              {generateTenderItemStatus(tender.apply_status, {
                onClick: showDialog(tender?.id, TenderStep.APPLY),
              })}
            </TableCell>
            <TableCell>
              <IconButton color="primary">
                <SettingsIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      <DialogData open={open} setOpen={setOpen} displayData={displayData} />
    </MuiTableBody>
  );
}

export type TypeDisplayData = {
  status?: React.ReactNode;
  startDate?: string;
  endDate?: string;
  eng?: string;
  note?: string;
};

export default TableBody;
