import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function SelectCustom(props: SelectPropsType) {
  return (
    <FormControl fullWidth size={props.size}>
      <InputLabel size={props.size}>{props.label}</InputLabel>
      <Select label={props.label} size={props.size}>
        {props.options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
type SelectPropsType = {
  label: string;
  size: "small" | undefined;
  currentOption?: number | string;
  options: { value: number | string; name: string }[];
};

export default SelectCustom;
