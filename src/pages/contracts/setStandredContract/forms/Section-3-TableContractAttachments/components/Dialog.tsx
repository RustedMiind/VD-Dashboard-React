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
import AddLabelToEl from "../../../../../../components/AddLabelToEl";
import { Controller, useForm } from "react-hook-form";
import CustomFilePond from "../../../../../../components/CustomFilepond";
import axios from "axios";
import { Api } from "../../../../../../constants";
import { serialize } from "object-to-formdata";
import { useSnackbar } from "notistack";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DbOptionType } from "../../../../../../types/other/DbOptionType";
import { useContext, useEffect, useState } from "react";
import {
  Branch,
  Broker,
  Contract,
  ContractType,
  EmployeeType,
  Management,
} from "../../../../../../types";
import { Client } from "../../../../../../types/Clients";
import { StandredContractContext } from "../../../context/StandredContractContext";
import { ContractAttachment } from "../../../../../../types/Contracts/ContractAttachment";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/material";

function SetDialog(props: PropsType) {
  // TODO::declare and define component state and variables here.
  const { contract } = useContext(StandredContractContext);
  let { open, setOpen, getContract, EditedContractAttachment } = props;
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
  const isEdit = EditedContractAttachment ? true : false;

  
  // TODO::declare and define component helper methods here.
  useEffect(() => {
    getUse();
  }, []);

  useEffect(() => {
    if (isEdit) {
      reset({
        name: EditedContractAttachment?.name,
        code: EditedContractAttachment?.code,
        type: EditedContractAttachment?.type
          ? +EditedContractAttachment.type
          : undefined,
      });
    }
  }, [open]);

  // on submit function
  const onSubmit = handleSubmit(async (data) => {
    try {
      const additionalData = {
        ...data,
        contract_id: contract?.id, // Replace someId with the actual id you want to send
      };
      let url = isEdit
        ? `employee/contract/lever/${EditedContractAttachment?.id}`
        : `employee/contract/lever/store`;

      if (isEdit)
        await axios.post(
          Api(url),
          serialize(additionalData, {
            indices: true,
            booleansAsIntegers: true,
          }),
          {
            params: {
              _method: "PATCH",
            },
          }
        );
      else
        await axios.post(
          Api(url),
          serialize(additionalData, { indices: true, booleansAsIntegers: true })
        );

      enqueueSnackbar(isEdit ? "تم التعديل بنجاح" : "تم الحفظ  بنجاح");
      setOpen(!open);
      getContract();
      reset({
        code: "",
        name: "",
      });
    } catch (err) {
      enqueueSnackbar("تعذر في الحفظ", { variant: "error" });
    }
  });

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
                <Select
                  {...register("type")}
                  defaultValue={isEdit ? EditedContractAttachment?.type : ""}
                  size={"small"}
                >
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
                {isEdit && (
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    my={2}
                    p={1}
                  >
                    <Typography
                      component={"a"}
                      href={EditedContractAttachment?.card_path}
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
            {isEdit ? "تعديل" : "اضافة"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

type PropsType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getContract: () => void;
  EditedContractAttachment?: undefined | ContractAttachment;
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
