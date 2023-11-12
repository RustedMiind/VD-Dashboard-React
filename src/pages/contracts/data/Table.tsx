import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Chip,
  Checkbox,
  Stack,
} from "@mui/material";
import { EmployeeRequest } from "../../../types";
import { requestTypes } from "./RequestTypes";
import SettingsIcon from '@mui/icons-material/Settings';
import { formatDate } from "../../../methods";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const bgTable = "#F3F5F7";

const handleClick = () => {
  console.info('You clicked the Chip.');
};

const handleDelete = () => {
  console.info('You clicked the delete icon.');
};
function generateChip(value: number): JSX.Element {
  let chip: JSX.Element = (
    <Chip
      onClick={() => { }}
      sx={{ color: '#CB1818', backgroundColor: "#EED4D4", border: 'solid 1px', borderRadius: '7px' }} variant="outlined"
      label="منتهي"
    />
  );

  switch (value) {
    // case -1:
    //   chip = <Chip color="primary" label="تحت المراجعة" />
    //   break;
    case 0:
      chip = <Chip color="error" label="مرفوض" />;
      break;
    case 1:
      chip = <Chip sx={{ color: '#18CB5F', backgroundColor: "#D4EEDE", border: 'solid 1px', borderRadius: '7px' }} label="جاري العمل" />;
      break;

    default:
      break;
  }

  return chip;
}

function EmployeesRequestsTable(props: PropsType) {
  return (
    <Stack sx={{ backgroundColor: bgTable }}>
      <TableContainer sx={{ height: 500 }}>
        <Table aria-label="simple table" stickyHeader>
          <TableHead >
            <TableRow>
              <TableCell sx={{ backgroundColor: bgTable }} ><Checkbox /></TableCell>
              <TableCell sx={{ backgroundColor: bgTable }}>رقم العقد</TableCell>
              <TableCell sx={{ backgroundColor: bgTable }}>نوع العقد</TableCell>
              <TableCell sx={{ backgroundColor: bgTable }}>اسم العميل</TableCell>
              <TableCell sx={{ backgroundColor: bgTable, textAlign: "center" }} >تليفون العميل</TableCell>
              <TableCell sx={{ backgroundColor: bgTable }}>مدة العقد</TableCell>
              <TableCell sx={{ backgroundColor: bgTable }}>تاريخ انتهاء العقد</TableCell>
              <TableCell sx={{ backgroundColor: bgTable }} >المهندس المسؤول</TableCell>
              <TableCell sx={{ backgroundColor: bgTable }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.requests.map((request, index) => {
              const requsetType = requestTypes.find((x) =>
                request.requestable_type
                  .toLowerCase()
                  .includes(x.prefix.toLowerCase())
              )?.name;
              return (
                <TableRow key={request.id}>
                  <TableCell>
                    {/* {request.id} */}
                    <Checkbox {...label} onClick={() => {
                      let _selectedData = [...props.selectedData]
                      const index = props.selectedData.findIndex(selDat => selDat === request.id);
                      if (index != -1) {
                        _selectedData.splice(index, 1)

                      }
                      else _selectedData.push(request.id)
                      props.setSelectedData(_selectedData)
                    }} checked={props.selectedData.includes(request.id)} />

                  </TableCell>

                  <TableCell>1234568</TableCell>
                  <TableCell>+966 543 23456 53</TableCell>
                  <TableCell>youremail@domain.com</TableCell>
                  <TableCell sx={{ textAlign: "center" }} >{requsetType}</TableCell>
                  <TableCell>10</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{formatDate(request.created_at)}</TableCell>
                  <TableCell>احمد محمود</TableCell>
                  <TableCell><SettingsIcon /></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>

  );
}

type PropsType = {
  requests: EmployeeRequest[];
  selectedData: number[];
  setSelectedData: React.Dispatch<React.SetStateAction<number[]>>
};

export default EmployeesRequestsTable;
