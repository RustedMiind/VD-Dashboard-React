import { DialogActions, IconButton, Typography } from "@mui/material";
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

export default function SetDialog({
  open,
  setOpen,
  handleOpenDialog,
  tenderAmount,
}: TypeProps) {
  const tenderContext = useContext(TenderContext);
  useEffect(() => {
    if (tenderAmount) {
      updateAmountData({
        amount: tenderAmount.amount,
        aria: tenderAmount.aria,
        discription: "",
        name: tenderAmount.name,
        priod: tenderAmount.priod,
      });
    } else {
      setAmountData(intialAmountData);
    }
  }, [tenderAmount?.id, !!tenderAmount]);
  const intialAmountData = {
    tender_id: `${tenderContext?.tenderId}`,
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
    axios
      .post(
        Api(
          `employee/tender/amount${tenderAmount ? "/" + tenderAmount.id : ""}`
        ),
        amountData
      )
      .then((res) => {
        console.log(res);
        tenderContext.getTenderData && tenderContext.getTenderData();
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
        onClose={() => setOpen(false)}
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
          onClick={() => setOpen(false)}
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
              />
            </Grid>
            <Grid p={1} item md={6}>
              <Typography>العدد</Typography>
              <TextField
                value={amountData.amount}
                onChange={(e) => {
                  updateAmountData({ amount: e.target.value });
                }}
                placeholder="العدد"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid p={1} item md={6}>
              <Typography> المساحة</Typography>
              <TextField
                value={amountData.aria}
                onChange={(e) => {
                  updateAmountData({ aria: e.target.value });
                }}
                fullWidth
                size="small"
                placeholder="المساحة"
              />
            </Grid>
            <Grid p={1} item md={6}>
              <Typography> وصف البند</Typography>
              <TextField
                value={amountData.discription}
                onChange={(e) => {
                  updateAmountData({ discription: e.target.value });
                }}
                fullWidth
                size="small"
                placeholder="وصف البند"
              />
            </Grid>
            <Grid p={1} item md={6}>
              <Typography> المدة</Typography>
              <TextField
                value={amountData.priod}
                onChange={(e) => {
                  updateAmountData({ priod: e.target.value });
                }}
                fullWidth
                size="small"
                placeholder="المدة"
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
