import {
  TableContainer,
  Table,
  Stack,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import TableHeader from "./TableHeader";
import { useContext } from "react";
import { ContractContext } from "../../Context/Store";
import { ContractsContext } from "../../Context/ContractsContext";
import ManageContractsTable from "./ManageContractsTable";
import ContractsDataTable from "./ContractsDataTable";

function ContractsTable(props: PropsType) {
  const selectedIdsContext = useContext(ContractContext);
  const { contracts, limit, setLimit } = useContext(ContractsContext);
  const toView = typeof contracts === "object" ? contracts?.data : undefined;

  function CheckboxHandler(id: number) {
    return function (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
      const idIndex = selectedIdsContext?.selectedIds?.findIndex(
        (itemId) => itemId === id
      );
      const idFound = typeof idIndex === "number" && idIndex >= 0;

      if (checked) {
        selectedIdsContext?.selectedIds &&
          selectedIdsContext?.setSelectedIds([
            ...selectedIdsContext?.selectedIds,
            id,
          ]);
      } else if (
        selectedIdsContext?.selectedIds &&
        idFound &&
        typeof idIndex === "number"
      ) {
        const instance = [...selectedIdsContext?.selectedIds];
        instance.splice(idIndex, 1);
        selectedIdsContext?.setSelectedIds(instance);
      }
    };
  }

  console.log(toView);

  return (
    <Stack>
      <TableContainer>
        <Table>
          <TableHeader value={props.value} />

          {props.value === 0 ? (
            <ContractsDataTable CheckboxHandler={CheckboxHandler}/>
          ) : (
            <ManageContractsTable secondTabValue={props.secondTabValue} CheckboxHandler={CheckboxHandler}   />
          )}
        </Table>
      </TableContainer>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ position: "absolute", top: "100%", pb: 3 }}
      >
        <Typography> عدد العرض في الصفحة</Typography>
        <TextField
          size="small"
          value={limit}
          select
          onChange={(e) => {
            setLimit && setLimit(parseInt(e.target.value) || -1);
          }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={250}>250</MenuItem>
          <MenuItem value={500}>500</MenuItem>
          <MenuItem value={1000}>1000</MenuItem>
          <MenuItem value={10000}>10000</MenuItem>
          <MenuItem value={-1}>عرض الكل</MenuItem>
        </TextField>
      </Stack>
    </Stack>
  );
}

type PropsType = {
  value?: number;
  secondTabValue?: 0|1;
};

export default ContractsTable;
