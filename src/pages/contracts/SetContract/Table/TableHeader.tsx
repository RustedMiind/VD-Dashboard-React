import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useContext } from "react";
import { ContractContext } from "../../Context/Store";
import { ContractsContext } from "../../Context/ContractsContext";

export default function TableHeader({ value }: PropType) {
  const { contracts } = useContext(ContractsContext);
  let selectedIdsContext = useContext(ContractContext);

  const selectAllHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    let values: number[] | undefined =
      typeof contracts === "object"
        ? contracts?.data?.map((contract) => {
            return contract.id;
          })
        : [];
    if (checked) selectedIdsContext?.setSelectedIds(values || []);
    else selectedIdsContext?.setSelectedIds([]);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          {typeof contracts === "object" && (
            <Checkbox
              checked={
                selectedIdsContext?.selectedIds?.length ===
                contracts?.data?.length
              }
              onChange={selectAllHandler}
            />
          )}
        </TableCell>
        <TableCell>رقم العقد</TableCell>
        <TableCell sx={{ width: 0.12 }}>
          {value === 0 ? "نوع العقد" : "تاريخ الورود"}
          <IconButton aria-label="SwapVertIcon" color="primary">
            <SwapVertIcon />
          </IconButton>
        </TableCell>
        <TableCell>{value === 0 ? "اسم العميل " : "النوع"}</TableCell>
        <TableCell>{value === 0 ? "الفرع" : "المالك"}</TableCell>
        <TableCell>{value === 0 ? " تليفون العميل " : "الفرع"}</TableCell>
        <TableCell>{value === 0 ? "مدة العقد" : "اسم الادارة"}</TableCell>
        <TableCell>{value === 0 ? "تاريخ انتهاء العقد" : "الحالة"}</TableCell>
        <TableCell>
          {value === 0 ? "المهندس المسؤول" : "الحالة السابقة"}
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
export type PropType = {
  value?: number;
};
