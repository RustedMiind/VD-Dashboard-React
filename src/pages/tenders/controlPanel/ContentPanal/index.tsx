import { Button, Grid, GridProps, Stack, TextField } from "@mui/material";
import PaperButtonLikeTitle from "../../../../components/PaperButtonLikeTitle";
import { ControlPanelContext } from "../controlPanelContext";
import { useContext, useState } from "react";
import OngoingTable from "../ongoingTable";
import IncomingTable from "../incomingTable";
import LoadingTable from "../../../../components/LoadingTable";
import TenderNotFound from "../../data/Table/TendersNotFound";
import NotFound from "../../../../components/NotFound";

function ContentPanal() {
  const { setTenderControlData, tenderControlData } =
    useContext(ControlPanelContext);
  const [dataToSearch, setDataToSearch] = useState<TypeDataToSearch>({
    code_reference: "",
    organization_name: "",
  });
  function GridItem({ children }: GridProps) {
    return (
      <Grid item xs={12} lg={5}>
        {children}
      </Grid>
    );
  }
  function updateDataToSearch(partial: Partial<TypeDataToSearch>) {
    setDataToSearch({
      ...dataToSearch,
      ...partial,
    });
  }
  function searchTender(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(dataToSearch);
    console.log(setTenderControlData);

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
        {tenderControlData === "loading" && <LoadingTable rows={5} cols={6} />}
        {typeof tenderControlData === "object" &&
          tenderControlData.incoming.length === 0 && (
            <Grid item lg={6} xs={12}>
              <NotFound title="لا يوجد منافسات واردة" />
            </Grid>
          )}
        {typeof tenderControlData === "object" &&
          tenderControlData.ongoing.length === 0 && (
            <Grid item lg={6} xs={12}>
              <NotFound title="لا يوجد منافسات جارية" />
            </Grid>
          )}
        {typeof tenderControlData === "object" &&
          tenderControlData.incoming.length > 0 && (
            <Grid item lg={6} xs={12}>
              <PaperButtonLikeTitle title="المنافسات الواردة">
                <IncomingTable />
              </PaperButtonLikeTitle>
            </Grid>
          )}
        {typeof tenderControlData === "object" &&
          tenderControlData.ongoing.length > 0 && (
            <Grid item lg={6} xs={12}>
              <PaperButtonLikeTitle title="المنافسات الجارية">
                <OngoingTable />
              </PaperButtonLikeTitle>
            </Grid>
          )}
      </Grid>
    </Stack>
  );
}
type TypeDataToSearch = {
  code_reference?: string;
  organization_name?: string;
};

export default ContentPanal;
