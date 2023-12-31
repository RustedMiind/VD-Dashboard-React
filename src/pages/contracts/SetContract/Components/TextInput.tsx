import { Stack, Typography, TextField } from "@mui/material";
function TextInput(props: PropsType) {
  return (
    <>
      <Stack>
        <Typography sx={{ ml: 2 }} component="label">
          {props.title}
        </Typography>
        <TextField
          id="outlined-phone-input"
          type={props.type}
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
  onDataChange?: (
    change: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type: string;
};

export default TextInput;
