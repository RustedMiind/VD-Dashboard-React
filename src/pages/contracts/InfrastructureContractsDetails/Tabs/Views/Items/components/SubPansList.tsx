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
import { ContractSubItemType } from "../../../..";
import { useEffect } from "react";

export default function SubPandsList({
  activePandId,
  contractSubItems,
  setActivePandId,
}: SubPandsListProps) {
  // declare single btn component
  let SingleBtn = ({ id, name }: { id: number; name: string }) => (
    <Button
      size="large"
      startIcon={
        <Fab color={id != activePandId ? "primary" : undefined} size="small">
          <KeyboardBackspaceIcon />
        </Fab>
      }
      sx={{ fontSize: 20 }}
      variant={id == activePandId ? "contained" : undefined}
      fullWidth
      onClick={() => setActivePandId(id)}
    >
      {name}
    </Button>
  );

  // handle set active item id in beginning
  useEffect(() => {
    if (contractSubItems.length) setActivePandId(contractSubItems[0].id);
  }, []);

  return (
    <Stack
      bgcolor={"background.default"}
      height={"fit-content"}
      elevation={2}
      spacing={1}
      component={Paper}
    >
      {contractSubItems.map((subItem, idx) => (
        <SingleBtn key={subItem.id} id={subItem.id} name={subItem.name} />
      ))}
    </Stack>
  );
}

type SubPandsListProps = {
  activePandId: number;
  setActivePandId: React.Dispatch<React.SetStateAction<number>>;
  contractSubItems: ContractSubItemType[];
};
