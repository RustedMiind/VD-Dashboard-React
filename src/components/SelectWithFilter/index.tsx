import { Box, MenuItem, TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";

function SelectWithFilter({
  options,
  filterInputProps,
  onFilterEmpty,
  ...props
}: PropsType) {
  const [filter, setFilter] = useState("");
  const filtered = options?.filter((option) =>
    option.label.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <TextField select {...props}>
      <TextField
        variant="filled"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        label={"البحث في الخيارات"}
        // size="small"
        fullWidth
        sx={{ mt: -1, mb: 1 }}
        onKeyDown={(e) => e.stopPropagation()}
        {...filterInputProps}
        color="secondary"
      />
      {filtered?.map((option) => (
        <MenuItem onKeyDown={(e) => e.stopPropagation()} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
      {filtered?.length === 0 && onFilterEmpty}
    </TextField>
  );
}

type PropsType = TextFieldProps & {
  options: Option[] | undefined;
  filterInputProps?: TextFieldProps;
  onFilterEmpty?: React.ReactElement;
};
type Option = {
  label: string;
  value: string | number;
};

export default SelectWithFilter;
