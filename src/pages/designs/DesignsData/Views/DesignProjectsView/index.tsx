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

function generateActiveChip(status?: DB_Boolean) {
  if (status) {
    return <StatusChip label={"نشط"} color="success" />;
  } else return <StatusChip label={"غير نشط"} color="error" />;
}

function DesignProjectsView() {
  const [designProjects, setDesignProjects] = useState<undefined | Design[]>(
    undefined
  );

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);

  function getDesignProjectsData() {
    axios
      .get<{ designs: Design[] }>(Api("client/design"), {
        // params: { page },
        headers: { from: "website" },
      })
      .then(({ data }) => {
        setDesignProjects(data.designs);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(getDesignProjectsData, [page]);

  return (
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
          <Button
            variant="contained"
            component={NavLink}
            to="./create"
            startIcon={<AddCircleOutlineIcon />}
          >
            اضافة مشروع
          </Button>
          <Button variant="contained" startIcon={<PrintOutlinedIcon />}>
            طباعة التقرير
          </Button>
        </Stack>
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
              {designProjects?.map((design, index) => {
                return (
                  <TableRow key={design.id}>
                    <TableCell>{design.name}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>{design.engImageIdea?.length}</TableCell>
                    <TableCell>{design.price_before}</TableCell>
                    <TableCell>{design.price_after}</TableCell>
                    <TableCell>
                      {generateActiveChip(design.status_mob)}
                    </TableCell>
                    <TableCell>
                      {generateActiveChip(design.status_mob)}
                    </TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                      <IconButton size="small">
                        <SendOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {/* {props.designReports.length === 0 && (
          <Typography variant="h5" textAlign="center" p={2} py={4}>
          لم يتم ايجاد اي من الطلبات المطلوبة
          </Typography>
        )} */}
        </TableContainer>
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
  );
}
export default DesignProjectsView;
