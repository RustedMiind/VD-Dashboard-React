import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import AddLabelToEl from "../../../../../../../../../../../../components/AddLabelToEl";
import { useContext, useState } from "react";
import CustomFilePond from "../../../../../../../../../../../../components/CustomFilepond";
import { FileBondState } from "../../../../../../../../../../../../types/FileBondState";
import { useSnackbar } from "notistack";
import axios from "axios";
import { Api } from "../../../../../../../../../../../../constants";
import { serialize } from "object-to-formdata";
import { ContractItemContext } from "../../../../../ItemContext";

export default function AddAttachmentDialog(props: PropsType) {
  // TODO::declare and define component variables and state
  const [requiredValidError, setRequiredValidError] = useState(false);
  const { fetchItemDetails } = useContext(ContractItemContext);
  const [file, setFile] = useState<FileBondState>([]);
  const { enqueueSnackbar } = useSnackbar();

  // TODO::declare and define methods
  const handleSave = () => {
    if (file.length == 0) {
      setRequiredValidError(true);
      return;
    }
    setRequiredValidError(false);
    console.log("AddSubItemAttachment handlesave", file);
    axios
      .post(
        Api(
          `employee/contract/items/store-attachment-sub-item/${props.subItemId}`
        ),
        serialize({
          images: file,
        })
      )
      .then((res) => {
        fetchItemDetails?.({ optimized: false, soft: true });
        enqueueSnackbar("تم اضافة المرفق بنجاح");
        props.onClose();
      })
      .catch((err) => {
        enqueueSnackbar("تعذر حفظ المرفق", {
          variant: "error",
        });
      });
  };

  // TODO::return out component view
  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: "center" }} fontWeight={800}>
        أضافة مرفق للبند الفرعي
      </DialogTitle>
      <DialogContent>
        <Stack alignItems={"center"}>
          <AddLabelToEl label={""}>
            <CustomFilePond
              files={file}
              onupdatefiles={(fileItems) => {
                setFile(fileItems.map((fileItem) => fileItem.file));
              }}
            />
            {requiredValidError && (
              <Typography variant="body2" color="error">
                برجاء ارفاق الملف اولا قبل الحفظ
              </Typography>
            )}
          </AddLabelToEl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          رجوع
        </Button>
        <Button variant="contained" onClick={handleSave}>
          حفظ
        </Button>
      </DialogActions>
    </Dialog>
  );
}

type PropsType = {
  open: boolean;
  onClose: () => void;
  subItemId: number;
};
