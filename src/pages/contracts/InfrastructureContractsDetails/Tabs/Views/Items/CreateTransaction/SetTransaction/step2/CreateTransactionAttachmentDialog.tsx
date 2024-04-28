import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress, Grid, MenuItem, Select } from "@mui/material";

import axios from "axios";
import { useSnackbar } from "notistack";
import { Api } from "../../../../../../../../../constants";
import { useForm } from "react-hook-form";
import AddLabelToEl from "../../../../../../../../../components/AddLabelToEl";
import CustomFilePond from "../../../../../../../../../components/CustomFilepond";
import { useContext, useEffect, useState } from "react";
import { FileBondState } from "../../../../../../../../../types/FileBondState";
import { serialize } from "object-to-formdata";
import { CreateTransactionContext } from "../../../context/CreateTransactionContext";
import { getUseData } from "../../../../../../../../../methods/getUseData";
import { DbOptionType } from "../../../../../../../../../types/other/DbOptionType";
import {
  TansactionAttachmentType,
  TransactionType,
} from "../../../../../../../../../types/Contracts/ContractTransactionAttachment";

export type CreateTransactionFormType = {
  description: string;
  type: number;
  file: File;
};

function CreateTransactionAttachmentFileDialog(props: PropsType) {
  // Declare component State and variables
  const { enqueueSnackbar } = useSnackbar();
  const transactionCxtData = useContext(CreateTransactionContext);
  const [file, setFile] = useState<FileBondState>([]);
  const [loading, setLoading] = useState(false);
  const { register, reset, handleSubmit } = useForm<CreateTransactionFormType>(
    {}
  );
  const [attatchmentFileTypes, setAttatchmentFileTypes] = useState<
    DbOptionType[]
  >([]);

  // fetch data for attatchmentFileTypes
  useEffect(() => {
    SetAttatchmentFileTypesArray();
  }, []);

  const SetAttatchmentFileTypesArray = async () => {
    let useData = await getUseData();
    if (useData.attachments_types)
      setAttatchmentFileTypes(useData.attachments_types);
  };

  const handleCreateAttatcmentTransaction = handleSubmit((data) => {
    let bodyData = {
      description: data.description,
      contract_attachment_type_id: data.type,
      image: file[0],
    };
    console.log("bodyData", bodyData);
    setLoading(true);
    axios
      .post(
        Api(
          `employee/contract/items/processing/store-attachment-type/${transactionCxtData.transactionId}`
        ),
        serialize(bodyData)
      )
      .then(() => {
        enqueueSnackbar("تم الحفظ بنجاح");
        reset({ description: "" });

        setFile([]);
        transactionCxtData.refresh();
        props.handleClose();
        // transactionCxtData.setTransactionId(-1);
      })
      .catch((err) => {
        console.log("Error", err);
        enqueueSnackbar(err?.response?.data?.message ?? "تعذر في الحفظ", {
          variant: "error",
        });
      })
      .finally(() => {
        setLoading(false);
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
                  disabled={loading}
                >
                  {attatchmentFileTypes.map((option) => (
                    <MenuItem key={`${option.id}`} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </AddLabelToEl>
            </Grid>
            <Grid item xs={6} paddingX={1.5}>
              <AddLabelToEl label={"وصف المرفق"}>
                <TextField
                  required
                  {...register("description")}
                  size="small"
                  color="primary"
                  disabled={loading}
                />
              </AddLabelToEl>
            </Grid>
            <Grid item xs={6} paddingX={1.5}>
              <AddLabelToEl label={"ملف المرفق"}>
                <CustomFilePond
                  allowMultiple={false}
                  files={file}
                  disabled={loading}
                  onupdatefiles={(fileItems) => {
                    setFile(fileItems.map((fileItem) => fileItem.file));
                  }}
                />
              </AddLabelToEl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" type="submit" disabled={loading}>
            اضافة{" "}
            {loading && <CircularProgress size={"small"} color="inherit" />}
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
