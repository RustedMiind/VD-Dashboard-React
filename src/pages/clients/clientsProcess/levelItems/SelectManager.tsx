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
  formDisabled,
  employee_id,
  disabled,
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
                value={department_id || 0}
                disabled={formDisabled || employee_id !== 0}
                onChange={(e) => {
                  setDepartmentId(e.target.value as number);
                }}
              >
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
  formDisabled: boolean;
  employee_id: number;
  disabled: boolean;
  departments: [
    {
      id: number;
      name: string;
    }
  ];
};

export default SelectManager;
