import { MenuItem, TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";

function SelectWithFilter({
  options,
  filterInputProps,
  onFilterEmpty,
  ...props
}: PropsType) {
  const [filter, setFilter] = useState("");
  const filtered = options?.map((option) => ({
    exist: option.label.toLowerCase().includes(filter.toLowerCase()),
    ...option,
  }));
  console.log(filter, filtered?.length, filtered);
  return (
    <TextField
      select
      {...props}
      onChange={(e) => {
        props.onChange?.(e);
        setTimeout(() => setFilter(""), 500);
      }}
    >
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
        <MenuItem
          key={option.value}
          sx={{ display: option.exist ? undefined : "none" }}
          onKeyDown={(e) => e.stopPropagation()}
          value={option.value}
        >
          {option.label}
        </MenuItem>
      ))}
      {filtered?.every((option) => !option.exist) && onFilterEmpty}
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
