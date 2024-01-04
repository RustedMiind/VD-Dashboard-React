import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableContainer,
  TextField,
} from "@mui/material";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { useContext, useState } from "react";
import { TableContext } from "../TableContext";
import LoadingTable from "../../../../components/LoadingTable";
import NotFound from "../../../../components/NotFound";
import { Typography } from "@mui/material";
import TenderNotFound from "./TendersNotFound";
import CreateDialog from "../CreateDialog";

function TendersTable(props: PropsType) {
  const { tenderTableData, limit, setLimit } = useContext(TableContext);

  return (
    <Stack>
      {tenderTableData === "loading" && <LoadingTable rows={5} cols={9} />}
      {tenderTableData === "empty" && (
        <TenderNotFound openCreateDialog={props.openCreateDialog} />
      )}
      {tenderTableData === "error" && (
        <NotFound title="حدث خطأ حاول مرة أخرى" />
      )}
      {typeof tenderTableData === "object" && (
        <>
          <TableContainer
            component={Paper}
            sx={{
              maxWidth: 1,
              overflowX: "scroll",
              maxHeight: 600,
              bgcolor: "Background",
            }}
          >
            <Table padding="normal" sx={{ minWidth: 2200 }} stickyHeader>
              <TableHead />
              <TableBody />
            </Table>
          </TableContainer>
          <Box
            position={"relative"}
            top={"85px"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Stack p={2} direction="row" alignItems="center" spacing={1}>
              <Typography> عدد العرض في الصفحة</Typography>
              <TextField
                size="small"
                value={limit}
                select
                onChange={(e) => {
                  setLimit && setLimit(e.target.value);
                }}
              >
                <MenuItem value={"5"}>5</MenuItem>
                <MenuItem value={"25"}>25</MenuItem>
                <MenuItem value={"100"}>100</MenuItem>
                <MenuItem value={"250"}>250</MenuItem>
                <MenuItem value={"500"}>500</MenuItem>
                <MenuItem value={"1000"}>1000</MenuItem>
                <MenuItem value={"10000"}>10000</MenuItem>
                <MenuItem value={"-1"}>عرض الكل</MenuItem>
              </TextField>
            </Stack>
            <Stack p={2}>
              <Button
                sx={{ textDecoration: "underline" }}
                onClick={() => {
                  setLimit && setLimit("-1");
                }}
              >
                عرض الكل
              </Button>
            </Stack>
          </Box>
        </>
      )}
      {/* Status Dialog */}
    </Stack>
  );
}

type PropsType = {
  openCreateDialog: () => void;
};

export default TendersTable;
