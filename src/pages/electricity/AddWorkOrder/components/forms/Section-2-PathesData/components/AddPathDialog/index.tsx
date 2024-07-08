import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from "@mui/material";
import {
  Branch,
  Broker,
  ContractType,
  EmployeeType,
  Management,
} from "../../../../../../../../types";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DialogTitle } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { Api } from "../../../../../../../../constants";
import AddLabelToEl from "../../../../../../../../components/AddLabelToEl";
import { Client } from "../../../../../../../../types/Clients";
import { DbOptionType } from "../../../../../../../../types/other/DbOptionType";

export default function AddPathDialog(props: PropsType) {
  // TODO::declare and define component state and variables here.
  let { open, setOpen } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { handleSubmit, control, register, reset } = useForm();
  const [contractUse, setContractUse] = useState<undefined | ContractUse>(
    undefined
  );

  // TODO::declare and define component helper methods here.
  useEffect(() => {
    getUse();
  }, []);

  // on submit function
  const onSubmit = handleSubmit(async (data) => {});

  // use function
  function getUse(): Promise<ContractUse> {
    return new Promise((ressolve, reject) => {
      axios
        .get<ContractUse>(Api(`employee/contract/use`))
        .then((res) => {
          setContractUse(res.data);
          ressolve(res.data);
        })
        .catch((err) => {
          setContractUse(undefined);
          reject(err);
        });
    });
  }

  // * return component UI.
  return (
    <>
      <Dialog
        fullWidth
        open={open}
        onClose={() => setOpen(!open)}
        component="form"
        onSubmit={onSubmit}
        maxWidth={"sm"}
      >
        {/* close dialog */}
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
          onClick={() => setOpen(!open)}
        >
          <GridCloseIcon fontSize="inherit" />
        </IconButton>

        <DialogTitle textAlign={"center"} fontWeight={600}>
          مسار العمل
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            {/* نقطة البداية */}
            <Grid item xs={6}>
              <AddLabelToEl label={"نقطة البداية"} >
                <TextField size="small" />
              </AddLabelToEl>
            </Grid>
            {/* نقطة النهاية */}
            <Grid item xs={6}>
              <AddLabelToEl label={"نقطة النهاية"} >
                <TextField size="small" />
              </AddLabelToEl>
            </Grid>
            {/* المحافظة */}
            <Grid item xs={6}>
              <AddLabelToEl label={"المحافظة"} >
                <TextField size="small" />
              </AddLabelToEl>
            </Grid>
            {/* المدينة */}
            <Grid item xs={6}>
              <AddLabelToEl label={"المدينة"} >
                <TextField size="small" />
              </AddLabelToEl>
            </Grid>
            {/* الامانة */}
            <Grid item xs={6}>
              <AddLabelToEl label={"الامانة"} >
                <TextField size="small" />
              </AddLabelToEl>
            </Grid>
            {/* البلدية */}
            <Grid item xs={6}>
              <AddLabelToEl label={"البلدية"} >
                <TextField size="small" />
              </AddLabelToEl>
            </Grid>
            {/* الحي */}
            <Grid item xs={6}>
              <AddLabelToEl label={"الحي"} >
                <TextField size="small" />
              </AddLabelToEl>
            </Grid>
            {/* داخل النطاق العمراني */}
            <Grid item xs={6}>
              <AddLabelToEl label={"داخل النطاق العمراني"} >
                <TextField size="small" />
              </AddLabelToEl>
            </Grid>
            {/* مسار شارد */}
            <Grid item xs={6}>
              <AddLabelToEl label={"مسار شارد"} >
                <TextField size="small" />
              </AddLabelToEl>
            </Grid>
            {/* عرض المسار بالمتر */}
            <Grid item xs={6}>
              <AddLabelToEl label={"عرض المسار بالمتر"} >
                <TextField size="small" />
              </AddLabelToEl>
            </Grid>
            {/* طول المسار بالمتر */}
            <Grid item xs={6}>
              <AddLabelToEl label={"طول المسار بالمتر"} >
                <TextField size="small" />
              </AddLabelToEl>
            </Grid>
            {/* الامتداد داخل الشوارع وداخل حدود المخططات */}
            <Grid item xs={6}>
              <AddLabelToEl
                label={"الامتداد داخل الشوارع وداخل حدود المخططات"}
                
              >
                <TextField size="small" />
              </AddLabelToEl>
            </Grid>
            {/* عمق المسار بالمتر */}
            <Grid item xs={6}>
              <AddLabelToEl label={"عمق المسار بالمتر"} >
                <TextField size="small" />
              </AddLabelToEl>
            </Grid>
            {/* رقم امر العمل */}
            <Grid item xs={6}>
              <AddLabelToEl label={"رقم امر العمل"} >
                <TextField size="small" />
              </AddLabelToEl>
            </Grid>
            {/* موقع المسار بالنسبة لخط منتصف الشارع */}
            <Grid item xs={12}>
              <AddLabelToEl
                label={"موقع المسار بالنسبة لخط منتصف الشارع"}
                
              >
                <TextField size="small" />
              </AddLabelToEl>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <LoadingButton variant="contained" type="submit">
            {false ? "تعديل" : "حفظ"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

type PropsType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ContractUse = {
  branches?: Branch[];
  brokers?: Broker[];
  client?: Client[];
  contractType?: ContractType[];
  employees?: EmployeeType[];
  management?: Management[];
  attachments_types?: DbOptionType[];
};
