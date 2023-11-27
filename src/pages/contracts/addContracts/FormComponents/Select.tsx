import { TextField, Stack, Typography, MenuItem } from "@mui/material";

function SelectItem(props: PropsType) {
  return (
    <Stack>
      <Typography sx={{ ml: 2 }} component="label">
        {props.title}
      </Typography>
      <TextField
        select
        disabled={props.isDisabled}
        size="small"
        onChange={props.setSelected}
        value={props.selected}
      >
        {props.options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.title}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}

type PropsType = {
  isDisabled?: boolean;
  title?: string;
  options?: OptionType[] | undefined;
  selected?: number | null;
  setSelected?: (
    select: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export default SelectItem;

export type OptionType = { title: string; value: string | number };
