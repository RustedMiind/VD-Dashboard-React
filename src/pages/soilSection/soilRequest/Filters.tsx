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
import dayjs from "dayjs";

enum TenderStatus {
  DONE = "done",
  DRAFT = "draft",
}

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

  return (
    <Box onSubmit={() => {}} component="form" pb={7}>
      <Grid container spacing={2}>
        <GridItem>
          <TextField
            value={dataToSearch.organization_name}
            onChange={(e) => {
              updateDataToSearch({ organization_name: e.target.value });
            }}
            fullWidth
            label="اسم العميل"
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
            label="رقم الخدمة"
            size="small"
          />
        </GridItem>
        <GridItem2>
          <TextField
            value={dataToSearch.name}
            onChange={(e) => {
              updateDataToSearch({ name: e.target.value });
            }}
            fullWidth
            label="اسم الخدمة"
            size="small"
          />
        </GridItem2>
        <GridItem2>
          <DatePicker
            value={dayjs(dataToSearch.strat_date)}
            onChange={(date) => {
              updateDataToSearch({ strat_date: date?.format() });
            }}
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
            label={"تاريخ الطلب"}
          />
        </GridItem2>
        <GridItem2>
          <Button variant="contained" fullWidth>
            بحث
          </Button>
        </GridItem2>
      </Grid>
    </Box>
  );
}

export default SoilFilters;

type TypeDataToSearch = {
  name?: string;
  organization_name?: string;
  organization_number?: string;
  strat_date?: string;
  end_date?: string;
  status?: TenderStatus;
};
