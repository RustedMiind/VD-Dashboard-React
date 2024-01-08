import {
  DialogActions,
  DialogContentText,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { GridCloseIcon } from "@mui/x-data-grid";
import RequiredSymbol from "../../../../../../components/RequiredSymbol";
import UploadFileInput from "../../../../../../components/UploadFileInput";
import axios from "axios";
import { Api } from "../../../../../../constants";
import { objectToFormData } from "../../../../../../methods";
import { TenderContext } from "../../../TenderCondext";
import { TenderFile } from "../../../../../../types/Tenders/TenderFile";
import { useSnackbar } from "notistack";
import { joinObjectValues } from "../../../../../../methods/joinObjectValues";
import { FormStatus } from "../../../../../../types/FormStatus";

export default function SetDialog({ open, onClose, fileToEdit }: TypeProps) {
  const [form, setForm] = useState<FormType>({ description: "", name: "" });
  const { getTenderData, tenderId } = useContext(TenderContext);
  const [error, setError] = useState<undefined | React.ReactNode>(undefined);
  const snackbar = useSnackbar();
  const [formStatus, setFormStatus] = useState<FormStatus>("none");
  const inputProps = {
    loading: formStatus === "loading",
    disabled: formStatus === "loading" || formStatus === "disabled",
  };
  const handleClose = formStatus === "loading" ? () => {} : onClose;
  function updateForm(partial: Partial<FormType>) {
    setForm({ ...form, ...partial });
  }
  useEffect(() => {
    if (fileToEdit) {
      setForm({
        description: fileToEdit.discription || "",
        name: fileToEdit.name,
      });
    } else {
      setForm({ description: "", name: "" });
    }
  }, [fileToEdit?.id, !!fileToEdit, open]);
  function handleSubmit(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault();
    setFormStatus("loading");
    axios
      .post(
        Api(`employee/tender/file${fileToEdit ? "/" + fileToEdit.id : ""}`),
        objectToFormData({
          "tender id": tenderId,
          discription: form.description,
          name: form.name,
          image: form.file,
        })
      )
      .then((result) => {
        getTenderData && getTenderData();
        onClose();
        snackbar.enqueueSnackbar(
          fileToEdit ? "تم تعديل بيانات المرفق" : "تم حفظ بيانات المرفق"
        );
        setError(undefined);
      })
      .catch((err) => {
        snackbar.enqueueSnackbar(
          fileToEdit
            ? "تعذر في تعديل بيانات المرفق"
            : "تعذر في حفظ بيانات المرفق",
          {
            variant: "error",
          }
        );
        setError(joinObjectValues(err.response?.data?.data));
      })
      .finally(() => {
        setFormStatus("none");
      });
  }

  return (
    <>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        component="form"
        onSubmit={handleSubmit}
      >
        <IconButton
          aria-label="delete"
          size="small"
          sx={{
            position: "absolute",
            right: 20,
            mt: 3,
            border: "solid 1px ",
            borderRadius: "8px",
          }}
          {...inputProps}
          color="primary"
          onClick={handleClose}
        >
          <GridCloseIcon fontSize="inherit" />
        </IconButton>
        <DialogTitle textAlign={"center"} fontWeight={600}>
          {typeof fileToEdit === "object" ? "تعديل المرفق" : "اضافة مرفق"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText color={"error.main"}>{error}</DialogContentText>
          <Grid container>
            <Grid p={1} item md={6}>
              <Typography>
                اسم المرفق
                <RequiredSymbol />
              </Typography>
              <TextField
                size="small"
                fullWidth
                placeholder="اسم المرفق "
                value={form.name}
                onChange={(e) => {
                  updateForm({ name: e.target.value });
                }}
                {...inputProps}
              />
            </Grid>
            <Grid p={1} item md={6}>
              <Typography>
                وصف المرفق <RequiredSymbol />
              </Typography>
              <TextField
                placeholder="وصف المرفق"
                fullWidth
                size="small"
                value={form.description}
                onChange={(e) => {
                  updateForm({ description: e.target.value });
                }}
                {...inputProps}
              />
            </Grid>
            {!fileToEdit && (
              <Grid p={1} item md={12}>
                <Typography>ارفاق ملف </Typography>

                <UploadFileInput
                  size="sm"
                  subTitle=""
                  value={form.file}
                  setValue={(file) => {
                    updateForm({ file });
                  }}
                />
              </Grid>
            )}
          </Grid>
          {formStatus === "loading" && form.file && <LinearProgress />}
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <LoadingButton {...inputProps} variant="contained" type="submit">
            اضافة
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

type TypeProps = {
  open: boolean;
  onClose: () => void;
  fileToEdit?: TenderFile;
};

type FormType = {
  name: string;
  description: string;
  file?: File;
};
