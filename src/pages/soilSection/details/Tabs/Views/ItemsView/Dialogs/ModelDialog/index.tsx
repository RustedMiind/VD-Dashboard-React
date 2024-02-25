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
import { useContext } from "react";
import { useSnackbar } from "notistack";
import { Api } from "../../../../../../../../constants";
import { SoilDataContext } from "../../../../..";

const ModelDialog = ({ open, onClose, id }: PropsType) => {
  const { enqueueSnackbar } = useSnackbar();
  const { setItems } = useContext(SoilDataContext);
  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (id) {
      axios
        .post(Api(`employee/client/order/add-step/${id}`))
        .then((res) => {
          enqueueSnackbar("تم اتخاذ الاجراء بنجاح");
          onClose();
          setItems && setItems();
        })
        .catch((err) => {
          enqueueSnackbar("تعذر في اتخاذ الاجراء" || "", {
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
                <Select size="small" label="حالة  الطلب">
                  <MenuItem value={19}>مرفوض</MenuItem>
                  <MenuItem value={18}>مقبول</MenuItem>
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
              multiline
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

export default ModelDialog;
type PropsType = {
  open: boolean;
  onClose: () => void;
  id?: number;
};
