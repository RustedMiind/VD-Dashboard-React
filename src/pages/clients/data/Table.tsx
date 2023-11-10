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
  Box,
} from "@mui/material";
import { EmployeeRequest } from "../../../types";
import { requestTypes } from "./RequestTypes";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


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
      sx={{ color: '#CB1818', backgroundColor: "#EED4D4", border: 'solid 1px' }} variant="outlined"
      label="اتخاذ الاجراء"
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
      chip = <Chip sx={{ color: '#18CB5F', backgroundColor: "#D4EEDE", border: 'solid 1px' }} label="جاري العمل" />;
      break;

    default:
      break;
  }

  return chip;
}

function EmployeesRequestsTable(props: PropsType) {
  return (
    <Stack sx={{ backgroundColor: "#F3F5F7" }}>

      <Box
        mt={2}
        ml={2}
        display="flex"
        justifyContent="space-between"
        flexDirection="row"
        flexWrap="wrap"
        alignItems="end"
      >
        <Stack sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "end",
        }}>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            sx={{ mb: 1 }}
          >
            اضافة عميل جديد
          </Button>
          <Button

            variant="contained"
            startIcon={<EditNoteIcon />}
            sx={{ mb: 1, ml: 2 }}
          >
            تعديل بيانات عميل
          </Button>
        </Stack>
        <Chip
          sx={{ mr: 2, mb: 1, color: "red", border: "solid 1px" }}
          label="حذف"
          deleteIcon={<DeleteIcon />}
          onClick={handleClick}
          onDelete={handleDelete}
          variant="outlined"
        />

      </Box>
      <TableContainer sx={{ height: 500 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell ><Checkbox /></TableCell>
              <TableCell>اسم المالك</TableCell>
              <TableCell>رقم التليفون</TableCell>
              <TableCell>البريد الالكتروني</TableCell>
              <TableCell>رقم الهوية</TableCell>
              <TableCell>الفرع</TableCell>
              <TableCell>حالة مشاريع العمل</TableCell>
              <TableCell>اسم الوكيل</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.requests.map((request, index) => {
              const requsetType = requestTypes.find((x) =>
                request.requestable_type
                  .toLowerCase()
                  .includes(x.prefix.toLowerCase())
              )?.name;
              console.log(props.selectedData.includes(request.id),
                'dfgdg', props.selectedData)
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

                  <TableCell sx={{ color: '#F19B02' }}>{request.employee.name}</TableCell>
                  <TableCell>+966 543 23456 53</TableCell>
                  <TableCell>youremail@domain.com</TableCell>
                  <TableCell>{requsetType}</TableCell>
                  <TableCell>الرياض</TableCell>
                  <TableCell>{generateChip(request.requestable_id)}</TableCell>
                  <TableCell>احمد محمود</TableCell>
                  <TableCell>+</TableCell>
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
