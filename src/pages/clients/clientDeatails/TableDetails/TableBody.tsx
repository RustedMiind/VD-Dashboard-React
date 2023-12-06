import { Stack } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "رقم العقد", sortable: false, width: 140 },
  { field: "type", headerName: "نوع العقد", width: 130 },
  { field: "status", headerName: "الحالة", width: 130 },
  {
    field: "percentage",
    headerName: "نسبة الإنجاز",
    sortable: false,
    width: 130,
  },
  {
    field: "location",
    headerName: "موقع المشروع",
    sortable: false,
    width: 130,
  },
  {
    field: "branch",
    headerName: "الفرع",
    sortable: false,
    width: 120,
  },
  {
    field: "remainingTime",
    headerName: "الوقت المتبقي",
    sortable: false,
    width: 130,
  },
  {
    field: "engineer",
    headerName: "المهندس",
    sortable: false,
    width: 140,
  },
  {
    field: "file",
    headerName: "الملف",
    sortable: false,
    width: 120,
  },
];

const rows = [
  {
    id: 1,
    type: "Snow",
    status: "Jon",
    percentage: "hom",
    location: "مصر",
    branch: "مصر",
    remainingTime: "month",
    engineer: "begad",
    file: "hok",
  },
  {
    id: 1,
    type: "Snow",
    status: "Jon",
    percentage: "hom",
    location: "مصر",
    branch: "مصر",
    remainingTime: "month",
    engineer: "begad",
    file: "hok",
  },
  {
    id: 1,
    type: "Snow",
    status: "Jon",
    percentage: "hom",
    location: "مصر",
    branch: "مصر",
    remainingTime: "month",
    engineer: "begad",
    file: "hok",
  },
  {
    id: 1,
    type: "Snow",
    status: "Jon",
    percentage: "hom",
    location: "مصر",
    branch: "مصر",
    remainingTime: "month",
    engineer: "begad",
    file: "hok",
  },
  {
    id: 1,
    type: "Snow",
    status: "Jon",
    percentage: "hom",
    location: "مصر",
    branch: "مصر",
    remainingTime: "month",
    engineer: "begad",
    file: "hok",
  },
  {
    id: 1,
    type: "Snow",
    status: "Jon",
    percentage: "hom",
    location: "مصر",
    branch: "مصر",
    remainingTime: "month",
    engineer: "begad",
    file: "hok",
  },
  {
    id: 1,
    type: "Snow",
    status: "Jon",
    percentage: "hom",
    location: "مصر",
    branch: "مصر",
    remainingTime: "month",
    engineer: "begad",
    file: "hok",
  },
  {
    id: 1,
    type: "Snow",
    status: "Jon",
    percentage: "hom",
    location: "مصر",
    branch: "مصر",
    remainingTime: "month",
    engineer: "begad",
    file: "hok",
  },
];

export default function DataTable() {
  return (
    <Stack style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </Stack>
  );
}
