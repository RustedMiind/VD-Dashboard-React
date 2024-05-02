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
import { NavLink } from "react-router-dom";
import ClientData from "../../../../clients/data";

export default function DialogAddRequest({ open, closeDialog }: PropsType) {
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | undefined>(
    undefined
  );
  useEffect(() => {
    axios
      .get<{ data: Client[] }>(Api("employee/client"))
      .then(({ data }) => {
        setAllClients(data.data);
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
        <RadioGroup name="use-radio-group">
          <Box sx={{ mb: 1 }}>
            <FormControlLabel
              value="x"
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
              value="y"
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
                value={selectedClient?.id || -1}
                onChange={(e) => {
                  setSelectedClient(
                    allClients.find(
                      (client) =>
                        client.id === (e.target.value as unknown as number)
                    )
                  );
                }}
                options={allClients.map((client) => ({
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
            <Button
              fullWidth
              variant="contained"
              component={NavLink}
              to="/react/clients/add"
            >
              اضافة عميل
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          disabled={!selectedClient}
          component={NavLink}
          to={`addrequest/${selectedClient?.id}`}
        >
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
