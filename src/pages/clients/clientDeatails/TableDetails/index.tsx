import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Checkbox,
  Stack,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Typography,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import TableHeader from "./TableHeader";
import { ClientDetailsType } from "../../../../types/Clients";
import StatusChip from "../../../../components/StatusChip";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import EmptyPlaceholder from "../../../../components/EmptyPlaceholder";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function TableDetails({
  ClientData,
  setToSearch,
  setLimit,
  limit,
  search,
  getContractsData,
}: PropsType) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  function checkOneHandler(id: number) {
    return (e: unknown, checked: boolean) => {
      if (checked) {
        // Add the selected item to the array if checked is true
        setSelectedItems([...selectedItems, id]);
      } else {
        // Remove the selected item from the array if checked is false
        setSelectedItems(selectedItems.filter((item) => item !== id));
      }
    };
  }

  const navigate = useNavigate();

  return (
    <Stack>
      <TableHeader
        selectedItems={selectedItems}
        getContractsData={getContractsData}
        search={search}
        contractsCounts={{
          end: ClientData?.contract_end || 0,
          late: ClientData?.contract_late || 0,
          stopped: ClientData?.contract_stop || 0,
          work: ClientData?.contract_work || 0,
        }}
        setToSearch={setToSearch}
      />
      {/* Table */}
      <>
        <Paper>
          <TableContainer sx={{ position: "relative" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>رقم العقد</TableCell>
                  <TableCell>
                    الحالة
                    <IconButton color="primary">
                      <SwapVertIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>نسبة الانجاز</TableCell>
                  <TableCell>موقع المشروع</TableCell>
                  <TableCell>الفرع</TableCell>
                  <TableCell>الوقت المتبقي</TableCell>
                  <TableCell>المهندس</TableCell>
                  <TableCell>الملف</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ClientData?.data?.map((item) => {
                  return (
                    <>
                      <TableRow>
                        <TableCell>
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onChange={checkOneHandler(item.id)}
                          />
                        </TableCell>
                        <TableCell>{item.code}</TableCell>
                        <TableCell>
                          {((): React.ReactNode => {
                            switch (item.status_id) {
                              case 0:
                                return (
                                  <StatusChip
                                    color="primary"
                                    disabled
                                    label="منتهي"
                                  />
                                );
                              case 2:
                                return (
                                  <StatusChip color="success" label="ساري" />
                                );
                              case 1:
                                return (
                                  <StatusChip color="warning" label="متأخر" />
                                );
                              default:
                                <>-</>;
                            }
                          })()}
                        </TableCell>
                        <TableCell>{`${item.completion_rate}%`}</TableCell>
                        <TableCell>
                          {
                            item?.soil_order?.soil_location_map?.soil_location
                              ?.location_name
                          }
                        </TableCell>
                        <TableCell>{item.branch?.name}</TableCell>
                        <TableCell>{item.remaining_time || 0} يوم</TableCell>
                        <TableCell>{item.employee?.name}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => {
                              navigate(`/react/contracts/${item.id}/edit`);
                            }}
                            color="primary"
                          >
                            <FolderCopyOutlinedIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
            {!ClientData?.data?.length && search === "" && (
              <EmptyPlaceholder label="ﻻ يوجد عقود, لم يتم البدء في عمل تعاقدات" />
            )}
          </TableContainer>
        </Paper>
        <Stack direction="row" justifyContent={"space-between"}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography> عدد العرض في الصفحة</Typography>
            <TextField
              onChange={(e) => {
                setLimit(e.target.value);
              }}
              size="small"
              select
              value={limit}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={250}>250</MenuItem>
              <MenuItem value={500}>500</MenuItem>
              <MenuItem value={1000}>1000</MenuItem>
              <MenuItem value={10000}>10000</MenuItem>
              <MenuItem value={"-1"}>عرض الكل</MenuItem>
            </TextField>
          </Stack>
          <Stack p={2}>
            <Typography
              sx={{
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => {
                setLimit("-1");
              }}
            >
              عرض الكل
            </Typography>
          </Stack>
        </Stack>
      </>
    </Stack>
  );
}
type PropsType = {
  ClientData?: ClientDetailsType;
  limit: string;
  search: string;
  setLimit: React.Dispatch<React.SetStateAction<string>>;
  setToSearch: React.Dispatch<React.SetStateAction<string>>;

  getContractsData: () => void;
};
export default TableDetails;
