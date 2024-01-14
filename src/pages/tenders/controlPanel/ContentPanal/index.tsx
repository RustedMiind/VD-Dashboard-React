import { Button, Grid, GridProps, Stack, TextField } from "@mui/material";
import PaperButtonLikeTitle from "../../../../components/PaperButtonLikeTitle";
import { ControlPanelContext } from "../controlPanelContext";
import { useContext, useState } from "react";
import OngoingTable from "../ongoingTable";
import IncomingTable from "../incomingTable";

const PAPER_HEIGHT = 500;

function GridItem({ children }: GridProps) {
  return (
    <Grid item xs={12} lg={5}>
      {children}
    </Grid>
  );
}

function ContentPanal() {
  const { setTenderControlData, tenderControlData } =
    useContext(ControlPanelContext);
  const [dataToSearch, setDataToSearch] = useState<TypeDataToSearch>({
    code_reference: "",
    organization_name: "",
  });

  function updateDataToSearch(partial: Partial<TypeDataToSearch>) {
    setDataToSearch({
      ...dataToSearch,
      ...partial,
    });
  }
  function searchTender(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTenderControlData && setTenderControlData(dataToSearch);
  }

  return (
    <Stack onSubmit={searchTender} component="form">
      <Grid container spacing={2}>
        <GridItem>
          <TextField
            type="text"
            value={dataToSearch.code_reference}
            onChange={(e) => {
              updateDataToSearch({ code_reference: e.target.value });
            }}
            label="الرقم المرجعي للمنافسة"
            size="small"
            fullWidth
          />
        </GridItem>
        <GridItem>
          <TextField
            value={dataToSearch.organization_name}
            onChange={(e) => {
              updateDataToSearch({ organization_name: e.target.value });
            }}
            label="الجهة الحكومية"
            size="small"
            fullWidth
          />
        </GridItem>
        <Grid item xs={12} lg={2}>
          <Button type="submit" variant="contained" fullWidth>
            بحث
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={2}>
        <Grid item xl={6} xs={12}>
          <PaperButtonLikeTitle
            fixedHeight={PAPER_HEIGHT}
            title="المنافسات الواردة"
          >
            <IncomingTable />
          </PaperButtonLikeTitle>
        </Grid>
        <Grid item xl={6} xs={12}>
          <PaperButtonLikeTitle
            fixedHeight={PAPER_HEIGHT}
            title="المنافسات الجارية"
          >
            <OngoingTable />
          </PaperButtonLikeTitle>
        </Grid>
      </Grid>
    </Stack>
  );
}
type TypeDataToSearch = {
  code_reference?: string;
  organization_name?: string;
};

export default ContentPanal;