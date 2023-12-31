import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";

const SelectManager = ({
  department_id,
  setDepartmentId,
  departments,
  employee_id,
}: PropsType) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        variant="outlined"
        size="large"
        sx={{ width: 200 }}
      >
        اختر اسم القسم
      </Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>اختر اسم القسم</DialogTitle>
        <DialogContent>
          <Box my={3}>
            <FormControl fullWidth size={"small"}>
              <InputLabel size="small">القسم</InputLabel>
              <Select
                label={"القسم"}
                size={"small"}
                value={department_id}
                disabled={employee_id !== 0}
                onChange={(e) => {
                  setDepartmentId(e.target.value as number);
                }}
              >
                <MenuItem value={null as unknown as number}>
                  اختار القسم
                </MenuItem>
                {departments?.map((department) => {
                  return (
                    <MenuItem key={department.id} value={department.id}>
                      {department.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

type PropsType = {
  department_id: number | null;
  setDepartmentId: (value: number) => void;
  employee_id: number;
  departments: [
    {
      id: number;
      name: string;
    }
  ];
};

export default SelectManager;
