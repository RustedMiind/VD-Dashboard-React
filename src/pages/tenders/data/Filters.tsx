import { Box, Button, Grid, GridProps, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useContext, useState } from "react";
import { TableContext } from "./TableContext";
import dayjs from "dayjs";

function GridItem({ children }: GridProps) {
  return (
    <Grid item xs={12} sm={6} lg={4} xl={2}>
      {children}
    </Grid>
  );
}

function TendersFilters() {
  const { setTenderTableData } = useContext(TableContext);
  const [dataToSearch, setDataToSearch] = useState<TypeDataToSearch>({
    organization_name: "",
    organization_number: "",
    name: "",
    strat_date: "",
    end_date: "",
  });
  function updateDataToSearch(partial: Partial<TypeDataToSearch>) {
    setDataToSearch({
      ...dataToSearch,
      ...partial,
    });
  }
  function searchTender(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTenderTableData && setTenderTableData(dataToSearch);
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
            value={dataToSearch.organization_number}
            onChange={(e) => {
              updateDataToSearch({ organization_number: e.target.value });
            }}
            fullWidth
            label="رقم الجهة"
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
          <Button variant="contained" type="submit" fullWidth>
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
};
