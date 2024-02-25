import {
  Checkbox,
  IconButton,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { WorkOrderType } from "../../../../types/electricity/WorkOrderType";
import { useNavigate } from "react-router-dom";
import { work_instruction } from "../../../../types/electricity/work_instruction";

const DataTableOfWorkOrders = ({
  selectedItems,
  setSelectedItems,
  items,
}: DataTableProps) => {
  const navigator = useNavigate();
  // TODO::define helpers functions
  const isSelected = (id: number) => {
    return selectedItems.indexOf(id) !== -1;
  };

  return (
    <>
      <TableContainer sx={{ marginTop: "0.5rem" }}>
        <Table>
          {/* Table Headers */}
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={items?.length === selectedItems?.length}
                  onChange={(e, checked) => {
                    if (checked) {
                      let arr: number[] = [];
                      if (items?.length) {
                        arr = items.map((ele) => ele.id);
                      }
                      setSelectedItems([...arr]);
                    } else {
                      setSelectedItems([]);
                    }
                  }}
                />
              </TableCell>
              <TableCell>الرقم المرجعي</TableCell>
              <TableCell>نوع أمر العمل</TableCell>
              <TableCell>التكلفة التقديرية</TableCell>
              <TableCell>المقاول</TableCell>
              <TableCell>التكلفة الفعلية</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          {/* Table body */}
          <TableBody>
            {items?.length &&
              items.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Checkbox
                        checked={isSelected(item.id)}
                        onChange={(e, checked) => {
                          if (checked) {
                            let arr = selectedItems;
                            arr.push(item.id);
                            setSelectedItems([...arr]);
                            console.log(items?.length, selectedItems?.length);
                          } else {
                            setSelectedItems([
                              ...selectedItems.filter((id) => id != item.id),
                            ]);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>{item.reference_number}</TableCell>
                    <TableCell>{item.type_work_instruction?.name}</TableCell>
                    <TableCell>{item.expected_cost}</TableCell>
                    <TableCell>{item.contractor?.name}</TableCell>
                    <TableCell>{item.real_cost}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          navigator(`show/${item.id}`, { state: item });
                        }}
                      >
                        <RemoveRedEyeOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        p={2}
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          position: "absolute",
          left: "250px",
        }}
      >
        <Typography> عدد العرض في الصفحة</Typography>
        <TextField defaultValue={25} size="small" select>
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
    </>
  );
};

type DataTableProps = {
  items: work_instruction[];
  selectedItems: number[];
  setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>;
};

export default DataTableOfWorkOrders;
