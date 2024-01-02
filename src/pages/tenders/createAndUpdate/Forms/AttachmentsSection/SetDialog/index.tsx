import { DialogActions, IconButton, Typography } from "@mui/material";
import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import React, { FormEvent, useContext, useEffect, useState } from "react";
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

export default function SetDialog({ open, onClose, fileToEdit }: TypeProps) {
  const [form, setForm] = useState<FormType>({ description: "", name: "" });
  const { getTenderData } = useContext(TenderContext);
  function updateForm(partial: Partial<FormType>) {
    setForm({ ...form, ...partial });
  }
  useEffect(() => {
    if (fileToEdit) {
      setForm({
        description: fileToEdit.description || "",
        name: fileToEdit.name,
      });
    } else {
      setForm({ description: "", name: "" });
    }
  }, [fileToEdit?.id, !!fileToEdit]);
  function handleSubmit(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault();
    axios
      .post(
        Api(`employee/tender/file${fileToEdit ? "/" + fileToEdit.id : ""}`),
        objectToFormData({
          "tender id": 1,
          description: form.description,
          name: form.name,
          image: form.file,
        })
      )
      .then((result) => {
        getTenderData && getTenderData();
        onClose();
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Dialog
        fullWidth
        open={open}
        onClose={onClose}
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
          color="primary"
          onClick={onClose}
        >
          <GridCloseIcon fontSize="inherit" />
        </IconButton>
        <DialogTitle textAlign={"center"} fontWeight={600}>
          {fileToEdit ? "تعديل المرفق" : "اضافة مرفق"}
        </DialogTitle>
        <DialogContent>
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
              />
            </Grid>
            <Grid p={1} item md={6}>
              <Typography>وصف المرفق</Typography>
              <TextField
                placeholder="وصف المرفق"
                fullWidth
                size="small"
                value={form.description}
                onChange={(e) => {
                  updateForm({ description: e.target.value });
                }}
              />
            </Grid>
            {!fileToEdit && (
              <Grid p={1} item md={12}>
                <Typography>ارفاق ملف</Typography>

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
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <LoadingButton
            // loading={sendState === "loading"}
            variant="contained"
            type="submit"
          >
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
