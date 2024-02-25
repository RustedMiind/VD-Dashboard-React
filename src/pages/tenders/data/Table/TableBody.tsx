import {
  IconButton,
  TableBody as MuiTableBody,
  TableCell,
  TableRow,
  Checkbox,
  Typography,
  ChipProps,
  Menu,
  MenuItem,
  Paper,
  Backdrop,
  Stack,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import React, { useContext, useEffect, useState } from "react";
import { TableContext } from "../TableContext";
import LimitTypography from "../../../../components/LimitTypograpgy";
import StatusChip from "../../../../components/StatusChip";
import { NavLink } from "react-router-dom";
import {
  TenderApprovalStatus,
  TenderEntityStatus,
  TenderItemStatus,
  TenderPay,
  TenderStep,
} from "../../../../types/Tenders/Status.enum";
import DialogData from "./DialogData";
import axios, { AxiosError } from "axios";
import { Api } from "../../../../constants";
import { Tender } from "../../../../types";
import { useSnackbar } from "notistack";
import Countdown from "react-countdown";
export function generateTenderItemStatus(
  status?: TenderItemStatus,
  chipProps?: ChipProps
): JSX.Element {
  let chip = <>---</>;
  if (typeof status === "number" || typeof status === "string")
    switch (status) {
      case TenderItemStatus.PENDING:
        chip = <StatusChip label="مستلم" color="warning" {...chipProps} />;
        break;
      case TenderItemStatus.ONGOING:
        chip = <StatusChip label="جاري" color="success" {...chipProps} />;
        break;
      case TenderItemStatus.ENDED:
        chip = <StatusChip label="منتهي" color="error" {...chipProps} />;
        break;
    }

  return chip;
}
export function generateTenderStatus(
  status?: TenderEntityStatus,
  chipProps?: ChipProps
): JSX.Element {
  let chip = <>---</>;
  if (typeof status === "number" || typeof status === "string")
    switch (status) {
      case TenderEntityStatus.SENT:
        chip = <StatusChip label="مقدمة" color="warning" {...chipProps} />;
        break;
      case TenderEntityStatus.ONGOING:
        chip = <StatusChip label="جاري" color="success" {...chipProps} />;
        break;
      case TenderEntityStatus.NOT_SENT:
        chip = <StatusChip label="غير مقدم" color="warning" {...chipProps} />;
        break;
      case TenderEntityStatus.ENDED:
        chip = <StatusChip label="منتهي" color="error" {...chipProps} />;
        break;
      case TenderEntityStatus.AWARDED:
        chip = <StatusChip label="تم الترسية" color="primary" {...chipProps} />;
        break;
      case TenderEntityStatus.TECHNICAL_REVIEW:
        chip = <StatusChip label="فحص فني" color="primary" {...chipProps} />;
        break;
      case TenderEntityStatus.EXCLUDED:
        chip = <StatusChip label="مستبعد فني" color="primary" {...chipProps} />;
        break;
      case TenderEntityStatus.FINANCIAL_EXCLUDE:
        chip = (
          <StatusChip label="مستبعد مالي" color="primary" {...chipProps} />
        );
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
      case TenderApprovalStatus.NONE:
        chip = <StatusChip label="مستلم" color="warning" {...chipProps} />;
        break;
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
  const [directorateAnchorEl, setDirectorateAnchorEl] =
    useState<null | HTMLElement>(null);
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

  const directorateStatusChangeHandler =
    (tenderId: number | string) =>
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      setDirectorateAnchorEl(null);
      axios
        .post(
          Api(`employee/tender/form/change-directorate-for-tender/${tenderId}`)
        )
        .then(() => {
          enqueueSnackbar("تم تعديل حالة المنافسة لدي الجهة بنجاح");
        })
        .catch((err: AxiosError<{ message?: string; msg?: string }>) => {
          enqueueSnackbar(
            err.response?.data?.message ||
              err.response?.data?.msg ||
              "تعذر في تعديل حالة المنافسة لدي الجهة",
            { variant: "error" }
          );
        });
    };

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
                  endDate: tender?.eng_employee_date,
                  eng: tender?.tender_tasks?.eng_employee?.name,
                  status: generateTenderApprovalStatusChip(
                    tender?.eng_employee_status
                  ),
                  note: tender?.eng_employee_note,
                  startDate: tender?.created_at,
                };
                break;
              case TenderStep.PURCHASE:
                dataObject = {
                  endDate: tender?.buy_date,
                  eng: tender?.tender_tasks?.eng_employee_buy_tender?.name,
                  status: generateTenderPayedStatus(tender?.buy_status),
                  note: tender?.buy_note,
                  startDate: tender?.eng_employee_date,
                };
                break;
              case TenderStep.TECHNICAL:
                dataObject = {
                  endDate: tender?.technical_date,
                  eng: tender?.tender_tasks?.eng_employee_technical?.name,
                  status: generateTenderItemStatus(tender?.technical_status),
                  note: tender?.technical_note,
                  startDate: tender?.eng_employee_date,
                };
                break;
              case TenderStep.FINANCIAL:
                dataObject = {
                  endDate: tender?.file_finacial_date,
                  eng: tender?.tender_tasks?.eng_employee_file_finacial?.name,
                  status: generateTenderItemStatus(
                    tender?.file_finacial_status
                  ),
                  note: tender?.file_finacial_note,
                  startDate: tender?.eng_employee_date,
                };
                break;
              case TenderStep.FILE:
                dataObject = {
                  endDate: tender?.trace_date,
                  eng: tender?.tender_tasks?.employee_trace?.name,
                  status: generateTenderItemStatus(tender?.trace_status),
                  note: tender?.eng_employee_note,
                  startDate: tender?.eng_employee_date,
                };
                break;
              case TenderStep.APPLY:
                dataObject = {
                  endDate: tender?.apply_date,
                  eng: tender?.tender_tasks?.eng_employee?.name,
                  status: generateTenderItemStatus(tender?.apply_status),
                  note: tender?.apply_note,
                  startDate: tender?.eng_employee_date,
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
        tenderTableData.map((tender) => {
          const isAcceptedTender =
            tender?.eng_employee_status === TenderApprovalStatus.ACCEPTED;
          const handleDirectorateStatus = directorateStatusChangeHandler(
            tender.id
          );
          let timeLeft: Date;
          if (typeof tender === "object" && tender.tenderdata?.strat_date) {
            timeLeft = new Date(tender.tenderdata?.strat_date);
          } else {
            timeLeft = new Date();
          }
          return (
            <>
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
                  <Countdown date={timeLeft} />
                </TableCell>
                <TableCell>
                  {isAcceptedTender &&
                    generateTenderPayedStatus(tender.buy_status, {
                      onClick: showDialog(tender?.id, TenderStep.PURCHASE),
                    })}
                </TableCell>
                <TableCell>{tender.tenderdata?.period} يوم</TableCell>
                <TableCell>{tender.tenderdata?.department?.name}</TableCell>
                <TableCell>
                  {generateTenderApprovalStatusChip(
                    tender.eng_employee_status,
                    {
                      onClick: showDialog(tender?.id, TenderStep.ACCEPTION),
                    }
                  )}
                </TableCell>
                <TableCell>
                  {isAcceptedTender &&
                    generateTenderStatus(tender.directorate_status, {
                      onClick: (e) => {
                        setDirectorateAnchorEl(e.currentTarget);
                      },
                    })}
                </TableCell>
                <TableCell>
                  {isAcceptedTender &&
                    generateTenderItemStatus(tender.technical_status, {
                      onClick: showDialog(tender?.id, TenderStep.TECHNICAL),
                    })}
                </TableCell>
                <TableCell>
                  {isAcceptedTender &&
                    generateTenderItemStatus(tender.file_finacial_status, {
                      onClick: showDialog(tender?.id, TenderStep.FINANCIAL),
                    })}
                </TableCell>
                <TableCell>
                  {isAcceptedTender &&
                    generateTenderItemStatus(tender.apply_status, {
                      onClick: showDialog(tender?.id, TenderStep.APPLY),
                    })}
                </TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <SettingsIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
              <Menu
                open={!!directorateAnchorEl}
                anchorEl={directorateAnchorEl}
                onClose={() => setDirectorateAnchorEl(null)}
                elevation={1}
                anchorOrigin={{ horizontal: "right", vertical: "top" }}
              >
                <MenuItem
                  value={TenderEntityStatus.ENDED}
                  onClick={handleDirectorateStatus}
                >
                  منتهي
                </MenuItem>
                <MenuItem
                  onClick={handleDirectorateStatus}
                  value={TenderEntityStatus.AWARDED}
                >
                  تم الترسية
                </MenuItem>
                <MenuItem
                  onClick={handleDirectorateStatus}
                  value={TenderEntityStatus.NOT_SENT}
                >
                  لم يرسل
                </MenuItem>
                <MenuItem
                  onClick={handleDirectorateStatus}
                  value={TenderEntityStatus.FINANCIAL_EXCLUDE}
                >
                  مستبعد مالي
                </MenuItem>
                <MenuItem
                  onClick={handleDirectorateStatus}
                  value={TenderEntityStatus.EXCLUDED}
                >
                  مستبعد فني
                </MenuItem>
                <MenuItem
                  onClick={handleDirectorateStatus}
                  value={TenderEntityStatus.TECHNICAL_REVIEW}
                >
                  فحص فني
                </MenuItem>
                <MenuItem
                  onClick={handleDirectorateStatus}
                  value={TenderEntityStatus.ONGOING}
                >
                  جاري
                </MenuItem>
              </Menu>
            </>
          );
        })}
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
