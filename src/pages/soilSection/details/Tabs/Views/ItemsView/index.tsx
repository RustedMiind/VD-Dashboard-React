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
function ItemsView() {
  const { items } = useContext(SoilDataContext);
  return (
    <>
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
            items.map((item) => (
              <TableBody>
                <TableCell>{item?.form?.name}</TableCell>
                <TableCell>{formatDate(item?.updated_at)}</TableCell>
                <TableCell>
                  {generateChip(item?.order_steps_form?.status)}
                </TableCell>
                <TableCell>
                  <LimitTypography>{item?.employees?.name}</LimitTypography>
                </TableCell>
                <TableCell>{formatDate(item?.updated_at)}</TableCell>
                <TableCell>
                  <IconButton component={"a"} target="_blank" href="aaaa">
                    <ArticleOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableBody>
            ))}
        </Table>
      </TableContainer>
    </>
  );
}

export default ItemsView;
