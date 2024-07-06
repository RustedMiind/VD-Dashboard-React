import { Button, Stack } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

export default function AddButton(props: PropsType) {
  return (
    <Stack width={"100%"} justifyContent={"start"} alignItems={"end"} my={3}>
      <Button
        variant="contained"
        startIcon={<AddBoxOutlinedIcon />}
        onClick={() => props.setOpen(true)}
      >
        اضافة عامل
      </Button>
    </Stack>
  );
}

type PropsType = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
