import { Chip } from "@mui/material";

function ChipBox(props: propsType) {
  return (
    <>
      <Chip
        sx={{
          color: props.color,
          background: props.backGround,
          border: "2px solid ",
          borderRadius: "10px",
          ml: 2,
          my: 2,
          px: 3,
        }}
        label={props.lable}
        variant="filled"
      />
      <Chip
        sx={{
          color: props.color,
          background: props.backGround,
          border: "2px solid ",
          borderRadius: "10px",
          mx: 1,
          my: 2,
        }}
        label={props.number}
        variant="filled"
      />
    </>
  );
}

export default ChipBox;
type propsType = {
  color: string;
  lable: string;
  number: number;
  backGround: string;
};
