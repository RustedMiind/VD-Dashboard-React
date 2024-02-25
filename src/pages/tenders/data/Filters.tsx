import {
  Box,
  Button,
  Grid,
  GridProps,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useContext, useState } from "react";
import { TableContext } from "./TableContext";
import dayjs from "dayjs";

enum TenderStatus {
  DONE = "done",
  DRAFT = "draft",
}

function GridItem({ children }: GridProps) {
  return (
    <Grid item xs={12} sm={6} lg={3} xl={12 / 7}>
      {children}
    </Grid>
  );
}

function TendersFilters() {
  const { setTenderTableData } = useContext(TableContext);
  const [searchChanged, setSearchChanged] = useState(false);
  const [dataToSearch, setDataToSearch] = useState<TypeDataToSearch>({
    status: TenderStatus.DONE,
    end_date: "",
    strat_date: "",
  });
  function updateDataToSearch(partial: Partial<TypeDataToSearch>) {
    searchChanged || setSearchChanged(true);
    setDataToSearch({
      ...dataToSearch,
      ...partial,
    });
  }
  function searchTender(e: React.FormEvent<HTMLFormElement>) {
    setSearchChanged(false);
    e.preventDefault();
    setTenderTableData &&
      setTenderTableData({
        ...dataToSearch,
        draft: +(dataToSearch.status === TenderStatus.DRAFT),
      });
  }
  return (
    <Box onSubmit={searchTender} component="form" pb={7}>
      <Grid container spacing={2}>
        <GridItem>
          <TextField
            value={dataToSearch.organization_name}
            onChange={(e) => {
              updateDataToSearch({ organization_name: e.target.value });
            }}
            fullWidth
            label="اسم جهة المنافسة"
            size="small"
          />
        </GridItem>
        <GridItem>
          <TextField
            value={dataToSearch.reference_number}
            onChange={(e) => {
              updateDataToSearch({ reference_number: e.target.value });
            }}
            fullWidth
            label="الرقم المرجعي"
            size="small"
          />
        </GridItem>
        <GridItem>
          <TextField
            value={dataToSearch.name}
            onChange={(e) => {
              updateDataToSearch({ name: e.target.value });
            }}
            fullWidth
            label="اسم المنافسة"
            size="small"
          />
        </GridItem>
        <GridItem>
          <DatePicker
            value={dayjs(dataToSearch.strat_date)}
            onChange={(date) => {
              updateDataToSearch({ strat_date: date?.format() });
            }}
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
            label={"تاريخ التقديم"}
          />
        </GridItem>
        <GridItem>
          <DatePicker
            value={dayjs(dataToSearch.end_date)}
            onChange={(date) => {
              updateDataToSearch({ end_date: date?.format() });
            }}
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
            label={"تاريخ الانتهاء"}
          />
        </GridItem>

        <GridItem>
          <ToggleButtonGroup
            size="small"
            color="primary"
            exclusive
            fullWidth
            value={dataToSearch.status}
            onChange={(e, status: TenderStatus) => {
              updateDataToSearch({ status });
            }}
          >
            <ToggleButton color="primary" value={TenderStatus.DONE}>
              المكتملة
            </ToggleButton>
            <ToggleButton color="error" value={TenderStatus.DRAFT}>
              المسودة
            </ToggleButton>
          </ToggleButtonGroup>
        </GridItem>
        <GridItem>
          <Button
            variant="contained"
            disableElevation={false}
            type="submit"
            fullWidth
            disabled={!searchChanged}
          >
            بحث
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default TendersFilters;

type TypeDataToSearch = {
  name?: string;
  organization_name?: string;
  organization_number?: string;
  strat_date?: string;
  end_date?: string;
  status?: TenderStatus;
  reference_number?: string;
};
