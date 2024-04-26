import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import {
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { ContractItemContext } from "../../../../../ItemContext";
import { OpenCreateProcessingContext } from "../../../../../../CreateNewProcessingDialog/CreateProcessingContextProvider";
import { ContractSubItem } from "../../../../../../../../../../../../types/Contracts/ContractItems";
import { CreateProcessingReplyContext } from "../../../../../../ReplyExistingProcessing/CreateProcessingReplyContext";

enum Operation {
  CREATE = "create",
  REPLY = "reply",
}

function ChooseProcessingToReplyTo({ onClose, open, subItem }: PropsType) {
  const { openCreateDialog, OnSubmitSucess } = useContext(
    CreateProcessingReplyContext
  );
  const [processingId, setProcessingId] = useState<number | null>(null);
  const { fetchItemDetails } = useContext(ContractItemContext);

  const handleConfirm = () => {
    if (processingId) {
      openCreateDialog(processingId);
      OnSubmitSucess(() => {
        fetchItemDetails?.({ optimized: false, soft: true });
      });
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: "center" }} fontWeight={800}>
        انشاء المعاملة
      </DialogTitle>
      <DialogContent>
        <Stack alignItems={"center"}>
          <TextField
            select
            value={processingId}
            onChange={(e) => {
              setProcessingId(e.target.value as unknown as number);
            }}
          >
            {subItem.processing?.map((processing) => (
              <MenuItem value={processing.id} key={processing.id}>
                {processing.id}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          الغاء
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          disabled={!processingId}
        >
          التالي
        </Button>
      </DialogActions>
    </Dialog>
  );
}

type PropsType = {
  open: boolean;
  onClose: () => void;
  subItem: ContractSubItem;
};

export default ChooseProcessingToReplyTo;
