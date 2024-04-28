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
import ChooseProcessingToReplyTo from "./SelectProcessingDialog";

enum Operation {
  CREATE = "create",
  REPLY = "reply",
}

function ChooseCreateDialog({ onClose, open, subItem }: PropsType) {
  const [type, setType] = useState<Operation>(Operation.CREATE);
  const { fetchItemDetails } = useContext(ContractItemContext);
  const [openSelect, setOpenSelect] = useState(false);
  const { openCreateDialog, OnSubmitSucess } = useContext(
    OpenCreateProcessingContext
  );
  const handleConfirm = () => {
    switch (type) {
      case Operation.CREATE:
        onClose();
        openCreateDialog(subItem.id);
        OnSubmitSucess(() => {
          fetchItemDetails?.({ optimized: false, soft: true });
        });
        break;
      case Operation.REPLY:
        onClose();
        setOpenSelect(true);
    }
  };

  return (
    <>
      <ChooseProcessingToReplyTo
        onClose={() => setOpenSelect(false)}
        open={openSelect}
        subItem={subItem}
      />
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: "center" }} fontWeight={800}>
          الرد علي المعاملة
        </DialogTitle>
        <DialogContent>
          <Stack alignItems={"center"}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) => setType(e.target.value as Operation)}
              value={type}
            >
              <FormControlLabel
                value={Operation.CREATE}
                control={<Radio />}
                label="جديد"
              />
              <FormControlLabel
                value={Operation.REPLY}
                control={<Radio />}
                label="رد على المعاملة"
              />
            </RadioGroup>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            الغاء
          </Button>
          <Button variant="contained" onClick={handleConfirm}>
            التالي
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

type PropsType = {
  open: boolean;
  onClose: () => void;
  subItem: ContractSubItem;
};

export default ChooseCreateDialog;
