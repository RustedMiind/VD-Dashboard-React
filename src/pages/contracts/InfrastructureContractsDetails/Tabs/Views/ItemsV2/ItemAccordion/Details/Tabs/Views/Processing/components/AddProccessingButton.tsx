import { Button, Stack } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

export default function AddProccessingButton(props: propsType) {
  return (
    <Stack
      width="100%"
      justifyContent={"end"}
      alignItems={"end"}
      flexDirection={"row"}
    >
      <Button
        variant="contained"
        sx={{ width: "150px", marginY: 2 }}
        startIcon={<AddBoxOutlinedIcon />}
        onClick={() => props.handleClick()}
      >
        انشاء معاملة
      </Button>
    </Stack>
  );
}

type propsType = {
  handleClick: () => void;
};
