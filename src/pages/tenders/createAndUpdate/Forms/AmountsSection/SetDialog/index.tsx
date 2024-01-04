import {
  DialogActions,
  DialogContentText,
  IconButton,
  Typography,
} from "@mui/material";
import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { GridCloseIcon } from "@mui/x-data-grid";
import RequiredSymbol from "../../../../../../components/RequiredSymbol";
import { TenderAmount } from "../../../../../../types/Tenders/TenderAmount";
import { TenderContext } from "../../../TenderCondext";
import { Api } from "../../../../../../constants";
import axios from "axios";
import { isStringAllNumbers } from "../../../../../../methods";
import { useSnackbar } from "notistack";
import { AxiosErrorType } from "../../../../../../types/Axios";
import { LaravelValidationError } from "../../../../../../types/LaravelValidationError";
import { joinObjectValues } from "../../../../../../methods/joinObjectValues";
import { FormStatus } from "../../../../../../types/FormStatus";

export default function SetDialog({ open, setOpen, tenderAmount }: TypeProps) {
  const tenderContext = useContext(TenderContext);
  const [error, setError] = useState<undefined | React.ReactNode>(undefined);
  const snackbar = useSnackbar();
  const [formStatus, setFormStatus] = useState<FormStatus>("none");
  const inputProps = {
    loading: formStatus === "loading",
    disabled: formStatus === "loading" || formStatus === "disabled",
  };

  useEffect(() => {
    setError(undefined);
    if (tenderAmount) {
      updateAmountData({
        amount: tenderAmount.amount,
        aria: tenderAmount.aria,
        discription: tenderAmount?.discription,
        name: tenderAmount.name,
        priod: tenderAmount.priod,
      });
    } else {
      setAmountData(intialAmountData);
    }
  }, [tenderAmount?.id, !!tenderAmount, open]);
  const intialAmountData = {
    name: "",
    amount: "",
    aria: "",
    priod: "",
    discription: "",
  };
  const [amountData, setAmountData] =
    useState<TypeAmountData>(intialAmountData);
  function updateAmountData(partial: Partial<TypeAmountData>) {
    setAmountData({
      ...amountData,
      ...partial,
    });
  }
  function handleSubmit(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault();
    setFormStatus("loading");
    axios
      .post(
        Api(
          `employee/tender/amount${tenderAmount ? "/" + tenderAmount.id : ""}`
        ),
        { ...amountData, tender_id: `${tenderContext?.tenderId}` }
      )
      .then((res) => {
        snackbar.enqueueSnackbar(
          tenderAmount ? "تم تعديل بيانات البند" : "تم حفظ بيانات البند"
        );
        setError(undefined);
        console.log(res);
        tenderContext.getTenderData && tenderContext.getTenderData();
        setOpen(false);
      })
      .catch((err: AxiosErrorType<LaravelValidationError<unknown>>) => {
        snackbar.enqueueSnackbar(
          tenderAmount
            ? "تعذر في تعديل بيانات المنافسة"
            : "تعذر في حفظ بيانات المنافسة",
          {
            variant: "error",
          }
        );
        setError(joinObjectValues(err.response?.data?.data));
        console.log(err);
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
        onClose={() => setOpen(false)}
        component="form"
        onSubmit={handleSubmit}
      >
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            right: 20,
            mt: 3,
            border: "solid 1px ",
            borderRadius: "8px",
          }}
          color="primary"
          onClick={() => setOpen(false)}
        >
          <GridCloseIcon fontSize="inherit" />
        </IconButton>
        <DialogTitle textAlign={"center"} fontWeight={600}>
          {tenderAmount ? "تعديل البند" : "اضافة البند"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText color={"error.main"}>{error}</DialogContentText>
          <Grid container>
            <Grid p={1} item md={6}>
              <Typography>
                اسم البند
                <RequiredSymbol />
              </Typography>
              <TextField
                value={amountData.name}
                onChange={(e) => {
                  updateAmountData({ name: e.target.value });
                }}
                size="small"
                fullWidth
                placeholder="اسم البند "
                {...inputProps}
              />
            </Grid>
            <Grid p={1} item md={6}>
              <Typography>
                العدد
                <RequiredSymbol />
              </Typography>
              <TextField
                value={amountData.amount}
                onChange={(e) => {
                  isStringAllNumbers(e.target.value) &&
                    updateAmountData({ amount: e.target.value });
                }}
                placeholder="العدد"
                fullWidth
                size="small"
                {...inputProps}
              />
            </Grid>
            <Grid p={1} item md={6}>
              <Typography> المساحة</Typography>
              <TextField
                value={amountData.aria}
                onChange={(e) => {
                  isStringAllNumbers(e.target.value) &&
                    updateAmountData({ aria: e.target.value });
                }}
                fullWidth
                size="small"
                placeholder="المساحة"
                {...inputProps}
              />
            </Grid>
            <Grid p={1} item md={6}>
              <Typography>
                وصف البند
                <RequiredSymbol />
              </Typography>
              <TextField
                value={amountData.discription}
                onChange={(e) => {
                  updateAmountData({ discription: e.target.value });
                }}
                fullWidth
                size="small"
                placeholder="وصف البند"
                {...inputProps}
              />
            </Grid>
            <Grid p={1} item md={6}>
              <Typography>
                المدة
                <RequiredSymbol />
              </Typography>
              <TextField
                value={amountData.priod}
                onChange={(e) => {
                  isStringAllNumbers(e.target.value) &&
                    updateAmountData({ priod: e.target.value });
                }}
                fullWidth
                size="small"
                placeholder="المدة"
                {...inputProps}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <LoadingButton {...inputProps} variant="contained" type="submit">
            {tenderAmount ? "تعديل" : "اضافة"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

type TypeProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tenderAmount?: TenderAmount;
};

type TypeAmountData = {
  tender_id?: string;
  name: string;
  amount: string;
  aria: string;
  priod: string;
  discription: string;
};
