import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import AddLabelToEl from "../../../../../../../components/AddLabelToEl";
import { LoadingButton } from "@mui/lab";
import { TenderDataContext } from "../../../..";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { FetchStatus } from "../../../../../../../types/FetchStatus";
import { FetchStatusEnum } from "../../../../../../../types/FetchStatusEnum";
import { Api } from "../../../../../../../constants";
import axios from "axios";
import { TenderStep } from "../../../../../../../types/Tenders/Status.enum";
import { Media } from "../../../../../../../types";

export default function TenderApproveDialog(
  props: DialogProps & {
    close: () => void;
    userType: TenderStep;
    uploadedFile?: Media[];
    status?: number;
  }
) {
  const [formStatus, setFormStatus] = useState<FetchStatus>(
    FetchStatusEnum.NONE
  );
  const [status, setStatus] = useState("1");
  const [note, setNote] = useState("");
  const { tender, refresh } = useContext(TenderDataContext);
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  function sendData() {
    if (typeof tender === "object") {
      setFormStatus(FetchStatusEnum.LOADING);
      axios
        .post(Api("employee/tender/form/status/" + id), {
          status: status,
          note,
          user_type: props.userType,
        })
        .then((res) => {
          console.log(res);
          props.close();
          enqueueSnackbar("تم اتخاذ الاجراء");
          refresh();
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar("تعذر في اتخاذ الاجراء", { variant: "error" });
        })
        .finally(() => {
          setFormStatus(FetchStatusEnum.NONE);
        });
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setStatus(e.target.value);
  }
  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      {...props}
      component={"form"}
      onSubmit={(e) => {
        e.preventDefault();
        sendData();
      }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: "800" }}>
        الموافقة علي المنافسة
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
          rowGap={2}
        >
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              onChange={handleChange}
              value={status}
            >
              <FormControlLabel value="1" control={<Radio />} label="موافق" />
              <FormControlLabel value="0" control={<Radio />} label="رفض" />
            </RadioGroup>
          </FormControl>
          {status === "0" && (
            <AddLabelToEl label="سبب الرفض">
              <TextField
                placeholder="سبب الرفض"
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
                multiline
                minRows={4}
              />
            </AddLabelToEl>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button>الغاء</Button>
        <LoadingButton
          autoFocus
          loading={formStatus === FetchStatusEnum.LOADING}
          variant="contained"
          type="submit"
        >
          حفظ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
