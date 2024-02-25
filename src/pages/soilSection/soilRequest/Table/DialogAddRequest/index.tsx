import {
  Box,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import SelectWithFilter from "../../../../../components/SelectWithFilter";
import { useEffect, useState } from "react";
import axios from "axios";
import { Client } from "../../../../../types/Clients";
import { Api } from "../../../../../constants";
const brokers = [
  {
    name: "test",
    id: 1,
  },
];
export default function DialogAddRequest({ open, closeDialog }: PropsType) {
  const [requests, setRequests] = useState<Client[]>([]);
  useEffect(() => {
    axios
      .get<{ data: Client[] }>(Api("employee/client"))
      .then(({ data }) => {
        setRequests(data.data);
        console.log(data.data);
      })
      .catch((err) => {});
  }, []);
  return (
    <Dialog
      maxWidth={"sm"}
      fullWidth
      component={"form"}
      open={open}
      onClose={closeDialog}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: "800" }}>
        اختر نوع الطلب
      </DialogTitle>
      <DialogContent>
        <Box>
          <Typography>اختر نوع الطلب</Typography>
        </Box>
        <RadioGroup name="use-radio-group" value={""}>
          <Box sx={{ mb: 1 }}>
            <FormControlLabel
              control={
                <Radio
                //   disabled={!!clientEdit}
                //   checked={formData.type === "individual"}
                //   onChange={changeTypeHandler("individual")}
                />
              }
              label="طلب التربة"
            />
            <FormControlLabel
              control={
                <Radio
                //   disabled={!!clientEdit}
                //   checked={formData.type === "company"}
                //   onChange={changeTypeHandler("company")}
                />
              }
              label="طلب الخرسانة"
            />
          </Box>
        </RadioGroup>
        <Grid container spacing={4} sx={{ alignItems: "end" }}>
          <Grid item md={8}>
            <Stack>
              <Typography component="label">اسم العميل</Typography>
              <SelectWithFilter
                size="small"
                select
                value={""}
                onChange={(e) => {}}
                options={requests.map((client) => ({
                  label: client.name,
                  value: client.id,
                }))}
              ></SelectWithFilter>
              {/* <Typography variant="body2" color="error">
                test
              </Typography> */}
            </Stack>
          </Grid>
          <Grid item md={4}>
            <Button fullWidth variant="contained" href="../clients/add">
              اضافة عميل
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" href="soil/addrequest">
          بدء الطلب
        </Button>
      </DialogActions>
    </Dialog>
  );
}

type PropsType = {
  open: boolean;
  closeDialog: () => void;
};
