import { Button, Stack } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

export default function AddProccessingButton(props: propsType) {
  return (
    <Stack
      width="100%"
      justifyContent={"end"}
      alignItems={"end"}
      flexDirection={"row"}
      mb={2}
    >
      <Button
        variant="contained"
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
