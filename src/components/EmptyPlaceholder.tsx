import { Paper, Stack, Typography, Button } from "@mui/material";
import EmptyFile from "../assets/images/branch-empty.png";
import AddIcon from "@mui/icons-material/Add";

function EmptyPlaceholder(props: PropsType) {
  return (
    <Stack component={Paper} px={2} py={4} spacing={3} alignItems="center">
      <img src={EmptyFile} alt="empty-file" width={250} />
      <Typography variant="h4" color="text.disabled" textAlign="center">
        {props.label}
      </Typography>
      <Button
        variant="contained"
        sx={{ bgcolor: "text.disabled" }}
        size="large"
        startIcon={<AddIcon />}
      >
        انشاء عقد جديد
      </Button>
    </Stack>
  );
}

type PropsType = {
  label?: string;
};

export default EmptyPlaceholder;
