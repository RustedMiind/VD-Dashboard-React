import { Stack, Typography, TextField } from "@mui/material";
function TextInput(props: PropsType) {
  return (
    <>
      <Stack>
        <Typography sx={{ ml: 2 }} component="label">
          {props.title}
        </Typography>
        <TextField
          // defaultValue={props.defaultValue}
          id="outlined-phone-input"
          type="text"
          required
          size="small"
          placeholder={props.title}
          onChange={props.onDataChange}
        />
      </Stack>
    </>
  );
}

type PropsType = {
  title: string;
  // defaultValue?: string | undefined | number;
  onDataChange?: (
    change: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export default TextInput;
