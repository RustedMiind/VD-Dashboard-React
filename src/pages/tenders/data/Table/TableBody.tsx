import {
  IconButton,
  TableBody as MuiTableBody,
  TableCell,
  TableRow,
  Checkbox,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { generateUndefinedArray } from "../../../../methods";
import { useContext } from "react";
import { TableContext } from "../TableContext";
import LimitTypography from "../../../../components/LimitTypograpgy";
import StatusChip from "../../../../components/StatusChip";

const arr = generateUndefinedArray(30);

function TableBody() {
  const { tenderTableData, setTenderId, tenderId } = useContext(TableContext);
  function CheckboxHandler(e: React.ChangeEvent<HTMLInputElement>) {
    let isSelect = e.target.checked;
    let value = parseInt(e.target.value);
    if (isSelect) {
      setTenderId && tenderId && setTenderId([...tenderId, value]);
    } else {
      setTenderId &&
        setTenderId((prevData) => {
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
                checked={tenderId?.includes(tender.id)}
                value={tender.id}
                onChange={CheckboxHandler}
              />
            </TableCell>
            <TableCell>{tender.tenderdata?.code_reference}</TableCell>
            <TableCell>{tender.tenderdata?.code_tender}</TableCell>
            <TableCell>{tender.tenderdata?.organization?.name}</TableCell>
            <TableCell>
              <LimitTypography>{tender.tenderdata?.name}</LimitTypography>
            </TableCell>
            <TableCell>{tender.tenderdata?.end_date}</TableCell>
            <TableCell>{tender.tenderdata?.strat_date}</TableCell>
            <TableCell>
              <StatusChip color={"primary"} disabled label={"غير مدفوع"} />
            </TableCell>
            <TableCell>{tender.tenderdata?.period} يوم</TableCell>
            <TableCell>{tender.tenderdata?.department_id}</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
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
