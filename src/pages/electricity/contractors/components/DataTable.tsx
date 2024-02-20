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
import PrintIcon from "@mui/icons-material/Print";
import { useContext, useEffect } from "react";
import { ContractorsContext } from "../context";
import { Contractor } from "../../../../types/Contractors/Contractor";

const DataTable = ({
  setSelectedItems,
  selectedItems,
  contractors,
  set_selectedContractorToEdit
}: DataTableProps) => {
  const {
    state,
    isSelected,
    toggleContractor,
    selectAllContractors,
    unselectAllContractors,
    isAllSelected,
    setContractors,
  } = useContext(ContractorsContext);
  const { status } = state;

  useEffect(() => {
    if (contractors?.length) setContractors(contractors);
  }, [contractors]);
  
  useEffect(()=>{
    if(selectedItems.length == 1){
      set_selectedContractorToEdit(contractors?.filter(ele=>ele.id == selectedItems[0])[0]);
    }else{
      set_selectedContractorToEdit(undefined);
    }
  },[selectedItems])

  return (
    <>
      <TableContainer>
        <Table>
          {/* Table Headers */}
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  defaultChecked={isAllSelected()}
                  onChange={(e, checked) => {
                    console.log("chicked", checked, state);
                    if(checked){
                      let arr:number[] = []
                      if(contractors?.length){
                        arr = contractors.map(ele=>ele.id)
                      }
                      setSelectedItems([
                        ...arr
                      ]);
                    }else{
                      setSelectedItems([]);
                    }
                    return checked
                      ? selectAllContractors()
                      : unselectAllContractors();
                  }}
                />
              </TableCell>
              <TableCell>اسم المقاول</TableCell>
              <TableCell>رقم الجوال</TableCell>
              <TableCell>البريد الالكتروني</TableCell>
              <TableCell>المقاول </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          {/* Table body */}
          {status === "none" && contractors && (
            <TableBody>
              {contractors.map((contractor) => (
                <TableRow key={contractor.id}>
                  <TableCell>
                    <Checkbox
                      checked={isSelected(contractor.id)}
                      onChange={(e, checked) => {
                        toggleContractor(contractor.id, checked);
                        if (checked) {
                          setSelectedItems([...selectedItems, contractor.id]);
                        } else {
                          setSelectedItems([
                            ...selectedItems.filter(
                              (id) => id != contractor.id
                            ),
                          ]);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{contractor.name}</TableCell>
                  <TableCell>{contractor.phone}</TableCell>
                  <TableCell>{contractor.email}</TableCell>
                  <TableCell>
                    <IconButton>
                      <PrintIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
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
  contractors: Contractor[] | undefined;
  setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>;
  selectedItems: number[];
  set_selectedContractorToEdit:React.Dispatch<React.SetStateAction<Contractor | undefined>>;
};

export default DataTable;
