import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useContext } from "react";
import { ControlPanelContext } from "../controlPanelContext";
import LoadingTable from "../../../../components/LoadingTable";
import NotFound from "../../../../components/NotFound";
import { NavLink } from "react-router-dom";
import StatusOrDropdown from "./StatusOrDropdown";
import { TenderEntityStatus } from "../../../../types/Tenders/Status.enum";
import axios from "axios";
import { Api } from "../../../../constants";
import { useSnackbar } from "notistack";
import { AxiosErrorType } from "../../../../types/Axios";
import { LaravelValidationError } from "../../../../types/LaravelValidationError";

export default function OngoingTable() {
  const { tenderControlData, setTenderControlData, isManager } =
    useContext(ControlPanelContext);
  const { enqueueSnackbar } = useSnackbar();
  function changeTenderStatus(id: string | number) {
    return function (status: TenderEntityStatus) {
      axios
        .post(Api(`employee/tender/form/change-directorate-for-tender/${id}`), {
          status,
        })
        .then(() => {
          setTenderControlData && setTenderControlData();
          enqueueSnackbar("تم حفظ حالة الترسية بنجاح");
          console.log(setTenderControlData);
        })
        .catch((err: AxiosErrorType<LaravelValidationError<unknown>>) => {
          enqueueSnackbar(
            err.response?.data?.message ||
              err.response?.data?.msg ||
              "تعذر في تغيير حالة الترسية",
            { variant: "error" }
          );
        });
    };
  }

  if (Array.isArray(tenderControlData?.ongoing))
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "150px" }}>
              الرقم المرجعي للمنافسة
            </TableCell>
            <TableCell>اسم المنافسة</TableCell>
            <TableCell>حالة الترسية</TableCell>
            <TableCell>عرض</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tenderControlData?.ongoing.map((tender) => (
            <TableRow key={tender.id}>
              <TableCell>
                <Typography
                  component={NavLink}
                  to={`../${tender.id}`}
                  variant="body2"
                  color={"primary.main"}
                  fontWeight={700}
                >
                  {tender.tenderdata?.code_reference}
                </Typography>
              </TableCell>
              <TableCell>{tender.tenderdata?.name}</TableCell>
              <TableCell>
                <StatusOrDropdown
                  current={tender.directorate_status}
                  setCurrent={
                    isManager || !!tender.eng
                      ? changeTenderStatus(tender.id)
                      : undefined
                  }
                />
              </TableCell>
              <TableCell>
                <IconButton
                  size="small"
                  component={NavLink}
                  to={`../${tender.id}`}
                >
                  <VisibilityOutlinedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  else if (tenderControlData?.ongoing === "loading")
    return <LoadingTable rows={5} cols={4} />;
  else if (tenderControlData?.ongoing === "empty")
    return <NotFound title="لا يوجد منافسات الجارية" />;
  else return <></>;
}
