import { Grid, SxProps, TextField, Typography } from "@mui/material";

function DataInputLike(props: PropsType) {
  const defaultSx: SxProps = {
    ".MuiInputBase-root": {
      pointerEvents: "none",
      borderColor: "primary.light",
      borderStyle: "solid",
      borderWidth: 1,
      ".MuiOutlinedInput-notchedOutline": {
        border: "none !important",
        outline: "none !important",
      },
    },
  };

  return (
    <Grid item md={props.cols || 6} p={1} px={2}>
      <Typography variant="body1" fontWeight={700} gutterBottom>
        {props.title}
      </Typography>
      <TextField
        value={props.value}
        // disabled
        fullWidth
        // focused={true}
        size="small"
        sx={defaultSx}
        multiline={props.multiLine}
        inputProps={{
          ...(props.multiLine ? { sx: { minHeight: 70 } } : { sx: {} }),
        }}
      />
    </Grid>
  );
}

type PropsType = {
  cols?: number;
  title?: string;
  value?: string | number | null;
  multiLine?: boolean;
};

export default DataInputLike;
