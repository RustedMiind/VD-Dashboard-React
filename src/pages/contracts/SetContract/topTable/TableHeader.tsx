import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useContext, useEffect, useState } from "react";
import { ContractContext } from "../../Context/Store";
import { ContractsContext } from "../../Context/ContractsContext";

export default function TableHeader({ value }: PropType) {
  const { contracts } = useContext(ContractsContext);
  let selectedIdsContext = useContext(ContractContext);
  // const [selectedItems, setSelectedItems] = useState<number[] | undefined>([]);
  // const chekedArray: number[] | undefined = selectedItems;
  // useEffect(() => {
  //   selectedIds?.setIndex(chekedArray);
  // }, [selectedItems]);

  const selectAllHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    let values: number[] | undefined = contracts?.data?.map((contract) => {
      return contract.id;
    });
    // setSelectedItems(values)
    if (checked) selectedIdsContext?.setSelectedIds(values || []);
    else selectedIdsContext?.setSelectedIds([]);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Checkbox
            checked={
              selectedIdsContext?.selectedIds?.length ===
              contracts?.data?.length
            }
            onChange={selectAllHandler}
          />
        </TableCell>
        <TableCell>رقم العقد</TableCell>
        <TableCell sx={{ width: 0.12 }}>
          {value === 0 ? "نوع العقد" : "تاريخ الورود"}
          <IconButton
            aria-label="SwapVertIcon"
            color="primary"
            // onClick={() => }
          >
            <SwapVertIcon />
          </IconButton>
        </TableCell>
        <TableCell>{value === 0 ? "اسم العميل " : "النوع"}</TableCell>
        <TableCell>{value === 0 ? "الفرع" : "المالك"}</TableCell>
        <TableCell>{value === 0 ? " تليفون العميل " : "الفرع"}</TableCell>
        <TableCell>{value === 0 ? "مدة العقد" : "اسم الاداره"}</TableCell>
        <TableCell>{value === 0 ? "تاريخ انتهاء العقد" : "الحاله"}</TableCell>
        <TableCell>
          {value === 0 ? "المهندس المسؤول" : "الحاله السابقه"}
        </TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
}
export type PropType = {
  value?: number;
};
