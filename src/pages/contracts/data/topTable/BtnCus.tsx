import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function BtnCus() {
  return (
    <div>
      <Button
        sx={{
          border: "2px solid ",
          borderRadius: "10px",
          ml: 2,
          my: 2,
          px: 3,
        }}
        variant="outlined"
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
    </div>
  );
}
