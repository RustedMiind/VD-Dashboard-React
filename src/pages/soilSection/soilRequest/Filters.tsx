import { Box, Button, Grid, GridProps, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useContext, useState } from "react";
import dayjs from "dayjs";
import { TableContext } from "./TableContext";
function GridItem({ children }: GridProps) {
  return (
    <Grid item xs={12} sm={6} lg={3} xl={3}>
      {children}
    </Grid>
  );
}
function GridItem2({ children }: GridProps) {
  return (
    <Grid item xs={12} sm={6} lg={3} xl={2}>
      {children}
    </Grid>
  );
}
function SoilFilters() {
  const { setSoilRequest } = useContext(TableContext);
  const [dataToSearch, setDataToSearch] = useState<TypeDataToSearch>({
    name_client: "",
    name_license: "",
    code: "",
    dateOrder: "",
  });
  function updateDataToSearch(partial: Partial<TypeDataToSearch>) {
    setDataToSearch({
      ...dataToSearch,
      ...partial,
    });
  }
  function searchToRequest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSoilRequest && setSoilRequest(dataToSearch);
  }

  return (
    <Box onSubmit={searchToRequest} component="form" pb={7}>
      <Grid container spacing={2}>
        <GridItem>
          <TextField
            value={dataToSearch.name_client}
            onChange={(e) => {
              updateDataToSearch({ name_client: e.target.value });
            }}
            fullWidth
            label="اسم العميل"
            size="small"
          />
        </GridItem>
        <GridItem>
          <TextField
            value={dataToSearch.code}
            onChange={(e) => {
              updateDataToSearch({ code: e.target.value });
            }}
            fullWidth
            label="رقم الخدمة"
            size="small"
          />
        </GridItem>
        <GridItem2>
          <TextField
            value={dataToSearch.name_license}
            onChange={(e) => {
              updateDataToSearch({ name_license: e.target.value });
            }}
            fullWidth
            label="اسم الخدمة"
            size="small"
          />
        </GridItem2>
        <GridItem2>
          <DatePicker
            value={dayjs(dataToSearch.dateOrder)}
            onChange={(date) => {
              updateDataToSearch({ dateOrder: date?.format() });
            }}
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
            label={"تاريخ الطلب"}
          />
        </GridItem2>
        <GridItem2>
          <Button type="submit" variant="contained" fullWidth>
            بحث
          </Button>
        </GridItem2>
      </Grid>
    </Box>
  );
}

export default SoilFilters;

type TypeDataToSearch = {
  name_client?: string;
  name_license?: string;
  code?: string;
  dateOrder?: string;
};
