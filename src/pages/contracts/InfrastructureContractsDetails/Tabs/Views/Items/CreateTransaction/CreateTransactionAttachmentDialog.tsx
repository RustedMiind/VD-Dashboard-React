import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, MenuItem, Select } from "@mui/material";

import axios from "axios";
import { useSnackbar } from "notistack";
import { Api } from "../../../../../../../constants";
import { useForm } from "react-hook-form";
import AddLabelToEl from "../../../../../../../components/AddLabelToEl";
import CustomFilePond from "../../../../../../../components/CustomFilepond";
import { useContext, useState } from "react";
import { FileBondState } from "../../../../../../../types/FileBondState";
import { serialize } from "object-to-formdata";
import { CreateTransactionContext } from "../context/CreateTransactionContext";

export type CreateTransactionFormType = {
  description: string;
  type: number;
  file: File;
};
const attatchmentFileTypes = [
  { id: "1", value: 1, label: "type 1" },
  { id: "2", value: 2, label: "type 2" },
];
function CreateTransactionAttachmentFileDialog(props: PropsType) {
  // Declare component State and variables
  const { enqueueSnackbar } = useSnackbar();
  const transactionCxtData = useContext(CreateTransactionContext);
  const [file, setFile] = useState<FileBondState>([]);
  const { register, reset, handleSubmit } = useForm<CreateTransactionFormType>(
    {}
  );

  const handleCreateAttatcmentTransaction = handleSubmit((data) => {
    let bodyData = {
      description: data.description,
      contract_attachment_type_id: data.type,
      image: file,
    };

    axios
      .post(
        Api(
          `employee/contract/items/processing/store-attachment-type/${transactionCxtData.transactionId}`
        ),
        serialize(bodyData)
      )
      .then(() => {
        enqueueSnackbar("تم الحفظ بنجاح");
      })
      .catch((err) => {
        enqueueSnackbar("تعذر في الحفظ", { variant: "error" });
      });
  });

  return (
    <>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={props.open}
        onClose={props.handleClose}
        component={"form"}
        onSubmit={handleCreateAttatcmentTransaction}
      >
        <DialogTitle>اضافة مرفق جديدة</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={6} paddingX={1.5}>
              <AddLabelToEl label={"نوع المرفق"}>
                <Select
                  required
                  {...register("type")}
                  color="primary"
                  size={"small"}
                >
                  {attatchmentFileTypes.map((option) => (
                    <MenuItem key={`${option.value}`} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </AddLabelToEl>
            </Grid>
            <Grid item xs={6} paddingX={1.5}>
              <AddLabelToEl label={"وصف المرفق"}>
                <TextField
                  type="text"
                  required
                  size="small"
                  {...register("description")}
                />
              </AddLabelToEl>
            </Grid>
            <Grid item xs={6} paddingX={1.5}>
              <AddLabelToEl label={"ملف المرفق"}>
                <CustomFilePond
                  allowMultiple={false}
                  files={file}
                  onupdatefiles={(fileItems) => {
                    setFile(fileItems.map((fileItem) => fileItem.file));
                  }}
                />
              </AddLabelToEl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" type="submit">
            اضافة
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

type PropsType = {
  open: boolean;
  handleClose: () => void;
};

export default CreateTransactionAttachmentFileDialog;
