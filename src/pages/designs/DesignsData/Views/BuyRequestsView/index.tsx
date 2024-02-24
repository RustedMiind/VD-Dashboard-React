import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  Button,
  IconButton,
  Paper,
  Stack,
  Box,
} from "@mui/material";

import { useEffect, useState } from "react";

// icons
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { formatDate } from "../../../../../methods";
import { DB_Boolean, Design } from "../../../../../types";
import axios from "axios";
import { Api } from "../../../../../constants";
import StatusChip from "../../../../../components/StatusChip";
import CenteredPagination from "../../../../../components/CenteredPagination";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { LaravelPagination } from "../../../../../types/LaravelPagination";
import { NavLink } from "react-router-dom";
import LoadingTable from "../../../../../components/LoadingTable";
import { useSnackbar } from "notistack";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import SearchBar from "../../SearchBar";

function BuyRequestsView() {
  const [search, setSearch] = useState("");
  const [loadingStatus, setLoadingStatus] = useState<
    "loading" | "error" | "none"
  >("loading");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);

  const getBuyRequests = () => {};

  return (
    <>
      <SearchBar
        search={search}
        setSearch={setSearch}
        handleSearch={getBuyRequests}
      />
      <Stack>
        <Typography variant="h5" fontWeight={700} mb={2}>
          مشاريع التصميم
        </Typography>
        <Paper sx={{ p: 4 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box></Box>
            <Button variant="contained" startIcon={<PrintOutlinedIcon />}>
              طباعة التقرير
            </Button>
          </Stack>
          {loadingStatus === "loading" && <LoadingTable cols={5} rows={10} />}
          {loadingStatus === "none" && (
            <TableContainer sx={{ minHeight: 300 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>اسم التصميم</TableCell>
                    <TableCell>نوع المبني</TableCell>
                    <TableCell>عدد الافكار</TableCell>
                    <TableCell>السعر</TableCell>
                    <TableCell>السعر بعد الخصم</TableCell>
                    <TableCell>التطبيق</TableCell>
                    <TableCell>الموقع</TableCell>
                    <TableCell>الاعدادات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={"design.id"}>
                    <TableCell>{"design.name_ar"}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>{"design.engImageIdea"}</TableCell>
                    <TableCell>{"design.price_before"}</TableCell>
                    <TableCell>{"design.price_after"}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        component={NavLink}
                        to={`./edit/${"design.id"}`}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                      <IconButton size="small">
                        <KeyboardArrowLeftIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* {props.designReports.length === 0 && (
        <Typography variant="h5" textAlign="center" p={2} py={4}>
        لم يتم ايجاد اي من الطلبات المطلوبة
        </Typography>
      )} */}
            </TableContainer>
          )}
        </Paper>
        <CenteredPagination
          page={page}
          onChange={(e, page) => {
            setPage(page);
          }}
          siblingCount={2}
          boundaryCount={1}
          count={totalPages}
        />
      </Stack>
    </>
  );
}

export default BuyRequestsView;
