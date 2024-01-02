import { DialogActions, IconButton, Typography } from "@mui/material";
import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import React, { FormEvent, useContext, useState } from "react";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { GridCloseIcon } from "@mui/x-data-grid";
import RequiredSymbol from "../../../../../../components/RequiredSymbol";
import UploadFileInput from "../../../../../../components/UploadFileInput";
import axios from "axios";
import { Api } from "../../../../../../constants";
import { objectToFormData } from "../../../../../../methods";
import { TenderContext } from "../../../TenderCondext";

export default function SetDialog({
  open,
  setOpen,
  handleOpenDialog,
}: TypeProps) {
  const [form, setForm] = useState<FormType>({ description: "", name: "" });
  const { getTenderData } = useContext(TenderContext);
  function updateForm(partial: Partial<FormType>) {
    setForm({ ...form, ...partial });
  }

  function handleSubmit(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault();
    axios
      .post(
        Api("employee/tender/file"),
        objectToFormData({
          "tender id": 1,
          description: form.description,
          name: form.name,
          image: form.file,
        })
      )
      .then((result) => {
        setOpen(false);
        getTenderData && getTenderData();
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
        onClose={handleOpenDialog}
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
          onClick={handleOpenDialog}
        >
          <GridCloseIcon fontSize="inherit" />
        </IconButton>
        <DialogTitle textAlign={"center"} fontWeight={600}>
          اضافة بند
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
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenDialog: () => void;
};

type FormType = {
  name: string;
  description: string;
  file?: File;
};
