import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { serialize } from "object-to-formdata";
import { useSnackbar } from "notistack";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/material";
import { Api } from "../../../../../../../constants";
import AddLabelToEl from "../../../../../../../components/AddLabelToEl";
import CustomFilePond from "../../../../../../../components/CustomFilepond";
import {
  Branch,
  Broker,
  ContractType,
  EmployeeType,
  Management,
} from "../../../../../../../types";
import { Client } from "../../../../../../../types/Clients";
import { DbOptionType } from "../../../../../../../types/other/DbOptionType";

function SetDialog(props: PropsType) {
  // TODO::declare and define component state and variables here.
  let { open, setOpen } = props;
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });
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
          اضافة مرفق
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            {/* name */}
            <Grid item xs={6}>
              <AddLabelToEl label={"اسم المرفق"} required>
                <TextField size="small" {...register("name")} />
              </AddLabelToEl>
              <Typography variant="body2" color={"error.main"}>
                {errors.name?.message}
              </Typography>
            </Grid>
            {/* code */}
            <Grid item xs={6}>
              <AddLabelToEl label={"رقم المرفق"} required>
                <TextField size="small" {...register("code")} />
              </AddLabelToEl>
              <Typography variant="body2" color={"error.main"}>
                {errors.code?.message}
              </Typography>
            </Grid>
            {/* type */}
            <Grid item xs={6}>
              <AddLabelToEl label={"نوع المرفق"} {...register("type")}>
                <Select {...register("type")} size={"small"}>
                  {contractUse?.attachments_types?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </AddLabelToEl>
              <Typography variant="body2" color={"error.main"}>
                {errors.type?.message}
              </Typography>
            </Grid>
            {/* attachments files */}
            <Grid item xs={6}>
              <AddLabelToEl label={"ارفاق ملف"}>
                {false && (
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    my={2}
                    p={1}
                  >
                    <Typography
                      component={"a"}
                      href={""}
                      target="_blank"
                      variant="body1"
                      fontSize={14}
                    >
                      عرض الملف
                    </Typography>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                )}
                <Controller
                  name="card_image"
                  control={control}
                  render={({ field }) => (
                    <CustomFilePond
                      {...field}
                      onupdatefiles={(files) => {
                        field.onChange(files.map((file) => file.file)?.[0]);
                      }}
                      allowMultiple={false}
                      maxFiles={1}
                    />
                  )}
                />
              </AddLabelToEl>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <LoadingButton variant="contained" type="submit" fullWidth>
            {false ? "تعديل" : "اضافة"}
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

const formSchema = z.object({
  name: z.string().min(1, { message: "اسم المرفق مطلوب" }),
  code: z.string().min(1, { message: "رقم المرفق مطلوب" }),
  type: z.number().optional(),
  card_image: z.instanceof(File).optional(),
});
type FormType = z.infer<typeof formSchema>;

export type ContractUse = {
  branches?: Branch[];
  brokers?: Broker[];
  client?: Client[];
  contractType?: ContractType[];
  employees?: EmployeeType[];
  management?: Management[];
  attachments_types?: DbOptionType[];
};
export default SetDialog;
