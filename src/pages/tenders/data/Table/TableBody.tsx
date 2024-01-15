import {
  IconButton,
  TableBody as MuiTableBody,
  TableCell,
  TableRow,
  Checkbox,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useContext } from "react";
import { TableContext } from "../TableContext";
import LimitTypography from "../../../../components/LimitTypograpgy";
import StatusChip from "../../../../components/StatusChip";
import { NavLink } from "react-router-dom";
import {
  TenderApprovalStatus,
  TenderItemStatus,
} from "../../../../types/Tenders/Status.enum";
function generateTenderItemStatus(status?: TenderItemStatus): JSX.Element {
  let chip = <></>;
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
function generateTenderApprovalStatusChip(
  status?: TenderApprovalStatus
): JSX.Element {
  let chip = <></>;
  if (typeof status === "number" || typeof status === "string")
    switch (status) {
      case TenderApprovalStatus.ACCEPTED:
        chip = <StatusChip label="موافق" color="success" />;
        break;
      case TenderApprovalStatus.REJECTED:
        chip = <StatusChip label="مرفوض" color="error" />;
        break;
    }

  return chip;
}
function TableBody() {
  const { tenderTableData, setSelectedTenderId, selectedTenderId } =
    useContext(TableContext);
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
            <TableCell>{tender.tenderdata?.end_date}</TableCell>
            <TableCell>{tender.tenderdata?.strat_date}</TableCell>
            <TableCell>
              <StatusChip color={"primary"} disabled label={"غير مدفوع"} />
            </TableCell>
            <TableCell>{tender.tenderdata?.period} يوم</TableCell>
            <TableCell>{tender.tenderdata?.department?.name}</TableCell>
            <TableCell>
              {generateTenderApprovalStatusChip(tender.eng_employee_status)}
            </TableCell>
            <TableCell>-</TableCell>
            <TableCell>
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
    </MuiTableBody>
  );
}

export default TableBody;
