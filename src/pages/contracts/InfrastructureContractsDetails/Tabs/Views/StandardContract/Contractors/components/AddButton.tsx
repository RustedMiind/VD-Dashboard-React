import { Button, Stack } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useNavigate, useParams } from "react-router-dom";

export default function AddButton() {
  // TODO::declare and define component state and variables
  const navigator = useNavigate();
  const { id } = useParams(); //contract id

  // TODO::declare and define component helper methods
  const handleClick = () => {
    navigator(`/react/contracts/createStandardContractor`);
  };

  // TODO::return component ui.
  return (
    <Stack justifyContent={"start"} alignItems={"end"} width="100%" my={2}>
      <Button
        onClick={handleClick}
        startIcon={<AddBoxOutlinedIcon />}
        variant="contained"
      >
        اضافة مقاول
      </Button>
    </Stack>
  );
}
