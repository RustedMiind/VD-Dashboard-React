import { Grid, TextField, Typography } from "@mui/material";

function DataInputLike(props: PropsType) {
  return (
    <Grid item md={props.cols || 6} p={1} px={2}>
      <Typography variant="body1" fontWeight={700} gutterBottom>
        {props.title}
      </Typography>
      <TextField
        value={props.value}
        disabled
        fullWidth
        size="small"
        multiline={props.multiLine}
        inputProps={{ ...(props.multiLine ? { sx: { minHeight: 100 } } : {}) }}
      />
    </Grid>
  );
}

type PropsType = {
  cols?: number;
  title?: string;
  value?: string | number;
  multiLine?: boolean;
};

export default DataInputLike;
