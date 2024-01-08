import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useReducer } from "react";
import { Api } from "../../../../constants";
import { ModelFormInitialState, reducer } from "./reducer";
import { ModelStatusType } from "./ModelTypes";
import { useSnackbar } from "notistack";

const ModelDialog = ({
  open,
  onClose,
  requestId,
  stepId,
  setRequests,
}: PropsType) => {
  const [formData, dispatch] = useReducer(reducer, ModelFormInitialState);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (open && requestId) {
      dispatch({ type: "SET_CLIENT_ID", payload: requestId });
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (formData.client_id) {
      axios
        .post(Api(`employee/client/order/addStep/${stepId}`), formData)
        .then((res) => {
          setRequests();
          enqueueSnackbar("تم اتخاذ الاجراء بنجاح");
          onClose();
        })
        .catch((err) => {
          enqueueSnackbar(err.response.data.message || "", {
            variant: "error",
          });
        });
    } else {
      enqueueSnackbar("يجب تعبئة جميع الحقول", { variant: "error" });
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        component={"form"}
        maxWidth="md"
        fullWidth
        onSubmit={handleSubmit}
      >
        <DialogTitle>نوع الطلب</DialogTitle>
        <DialogContent>
          <Stack direction={"row"} pt={2}>
            <Stack width={0.5} direction="row" alignItems="center" gap={1}>
              <Typography variant="body1" component="label" htmlFor="status">
                حالة الطلب
              </Typography>
              <FormControl sx={{ width: 200 }} size="small">
                <InputLabel id="demo-simple-select-label" size="small">
                  حالة الطلب
                </InputLabel>
                <Select
                  size="small"
                  label="حالة  الطلب"
                  value={formData.status}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_STATUS",
                      payload: e.target.value as ModelStatusType,
                    });
                  }}
                >
                  <MenuItem value={99}>مرفوض</MenuItem>
                  <MenuItem value={100}>مقبول</MenuItem>
                  <MenuItem value={33}>معتمد</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>
          <Stack mt={2}>
            <Typography
              variant="body1"
              component="label"
              display="block"
              gutterBottom
              mb={1}
            >
              الملاحظة
            </Typography>
            <TextField
              id=""
              inputProps={{ style: { minHeight: 100 } }}
              label="الملاحظة"
              multiline
              value={formData.note || ""}
              onChange={(e) => {
                dispatch({
                  type: "SET_NOTE",
                  payload: e.target.value as string,
                });
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button fullWidth variant="contained" type="submit" autoFocus>
            ارسال
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

type PropsType = {
  open: boolean;
  onClose: () => void;
  setRequests: () => void;
  requestId?: number;
  stepId?: number;
};

export default ModelDialog;
