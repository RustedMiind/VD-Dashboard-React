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
  TenderStep,
} from "../../../../types/Tenders/Status.enum";
import DialogData from "./DialogData";
import axios from "axios";
import { Api } from "../../../../constants";
import { Tender } from "../../../../types";
import { useSnackbar } from "notistack";
export function generateTenderItemStatus(
  status?: TenderItemStatus
): JSX.Element {
  let chip = <>---</>;
  if (typeof status === "number" || typeof status === "string")
    switch (status) {
      case TenderItemStatus.SENT:
        chip = <StatusChip label="مقدمة" color="warning" />;
        break;
      case TenderItemStatus.ONGOING:
        chip = <StatusChip label="جاري" color="success" />;
        break;
      case TenderItemStatus.EXCLUDED:
        chip = <StatusChip label="مستعبد  فني" color="primary" />;
        break;
      case TenderItemStatus.ENDED:
        chip = <StatusChip label="منتهي" color="error" />;
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
  const [tenderName, setTenderName] = useState<Tender | undefined>(undefined);
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
            setTenderName(res.data.data);
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
                break;
              case TenderStep.TECHNICAL:
                break;
              case TenderStep.FINANCIAL:
                break;
              case TenderStep.FILE:
                break;
              case TenderStep.APPLY:
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
            <TableCell>{generateTenderItemStatus(tender.buy_status)}</TableCell>
            <TableCell>{tender.tenderdata?.period} يوم</TableCell>
            <TableCell>{tender.tenderdata?.department?.name}</TableCell>
            <TableCell>
              {generateTenderApprovalStatusChip(tender.eng_employee_status, {
                onClick: showDialog(tender?.id, TenderStep.ACCEPTION),
              })}
            </TableCell>
            <TableCell>
              {generateTenderItemStatus(tender.trace_status)}
            </TableCell>
            <TableCell onClick={() => {}}>
              {generateTenderItemStatus(tender.technical_status)}
            </TableCell>
            <TableCell>
              {generateTenderItemStatus(tender.file_finacial_status)}
            </TableCell>
            <TableCell>
              {generateTenderItemStatus(tender.apply_status)}
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
