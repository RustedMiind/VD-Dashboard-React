import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import RowComponent from "./RowComponent";
import { useContext, useState } from "react";
import { TenderDataContext } from "../../..";
import BuyDialog from "./TakeActionDialogs/BuyDialog";

const Th = (props: TableCellProps) => <TableCell {...props} />;

function ItemsView() {
  const { tender } = useContext(TenderDataContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  if (typeof tender === "object")
    return (
      <>
        <BuyDialog
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
          }}
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <Th>البند</Th>
                <Th>حالة البند</Th>
                <Th>المهندس المسؤول</Th>
                <Th>تاريخ الانتهاء</Th>
                <Th>تاريخ الانتهاء الفعلي</Th>
                <Th>
                  عرض الملف
                  <Button
                    onClick={() => {
                      setDialogOpen(!dialogOpen);
                    }}
                  >
                    شراء
                  </Button>
                </Th>
              </TableRow>
            </TableHead>
            <TableBody>
              <RowComponent
                {...{
                  name: "الموافقة",
                  managerName: tender.tender_tasks?.eng_employee?.name,
                  endDate: tender.tender_tasks?.end_dete_accept,
                  accualEndDate: tender.eng_employee_date,
                  open() {},
                  status: tender.eng_employee_status,
                }}
              />
              <RowComponent
                {...{
                  name: "شراء المنافسة",
                  managerName:
                    tender.tender_tasks?.eng_employee_buy_tender?.name,
                  endDate: tender.tender_tasks?.dete_buy_tender,
                  accualEndDate: tender.file_finacial_date,
                  open() {},
                  status: tender.buy_status,
                }}
              />
              <RowComponent
                {...{
                  name: "العرض الفني",
                  managerName:
                    tender.tender_tasks?.eng_employee_technical?.name,
                  endDate: tender.tender_tasks?.end_dete_technical,
                  accualEndDate: tender.technical_date,
                  open() {},
                  status: tender.technical_status,
                }}
              />
              <RowComponent
                {...{
                  name: "العرض المالي",
                  managerName:
                    tender.tender_tasks?.eng_employee_file_finacial?.name,
                  endDate: tender.tender_tasks?.dete_file_finacial,
                  accualEndDate: tender.file_finacial_date,
                  open() {},
                  status: tender.file_finacial_status,
                }}
              />
              <RowComponent
                {...{
                  name: "الملف المدمج",
                  managerName:
                    tender.tender_tasks?.eng_employee_file_finacial?.name,
                  endDate: tender.tender_tasks?.end_dete_trace,
                  accualEndDate: tender.trace_date,
                  open() {},
                  status: tender.file_finacial_status,
                }}
              />
              <RowComponent
                {...{
                  name: "تقديم المنافسة",
                  managerName:
                    tender.tender_tasks?.eng_employee_apply_tender?.name,
                  endDate: tender.tender_tasks?.dete_apply_tender,
                  accualEndDate: tender.apply_date,
                  open() {},
                  status: tender.apply_status,
                }}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  else return <></>;
}

export default ItemsView;
