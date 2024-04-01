import {
  Box,
  Button,
  Fab,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export default function SubPandsList({
  activePandId,
  setActivePandId,
}: SubPandsListProps) {
  let SingleBtn = ({ id }: { id: number }) => (
    <Button
      size="large"
      startIcon={
        <Fab color={id != activePandId ? "primary" : undefined}size="small">
          <KeyboardBackspaceIcon />
        </Fab>
      }
      sx={{fontSize:20}}
      variant={id == activePandId ? "contained" : undefined}
      fullWidth
      onClick={() => setActivePandId(id)}
    >
      بند رقم 2
    </Button>
  );

  return (
    <Stack
      bgcolor={"background.default"}
      height={"fit-content"}
      elevation={2}
      spacing={1}
      component={Paper}
    >
      <SingleBtn id={1} />
      <SingleBtn id={2} />
      <SingleBtn id={3} />
    </Stack>
  );
}

type SubPandsListProps = {
  activePandId: number;
  setActivePandId: React.Dispatch<React.SetStateAction<number>>;
};
