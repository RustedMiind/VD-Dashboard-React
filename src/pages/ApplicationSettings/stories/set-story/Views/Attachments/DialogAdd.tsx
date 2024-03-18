import Button from "@mui/material/Button";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, GridProps, MenuItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AddLabelToEl from "../../../../../../components/AddLabelToEl";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { Api } from "../../../../../../constants";
import { useEffect, useState } from "react";
import { Mobile_Services, Story } from "../../../../../../types/Stories";
import { useSnackbar } from "notistack";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import CustomFilePond from "../../../../../../components/CustomFilepond";
import { objectToFormData } from "../../../../../../methods";
import { serialize } from "object-to-formdata";

const GridItem = (props: GridProps) => <Grid item xs={12} lg={6} {...props} />;
type FormFields = {
  end_date: string;
  service_id: string;
  image: File;
};
const TextFieldCommonProps: TextFieldProps = {
  size: "small",
  fullWidth: true,
};
export default function DialogAdd({
  open,
  handleClose,
  story,
  seedStory,
}: PropsType) {
  const { register, reset, handleSubmit, control } = useForm<FormFields>({});
  const [type, setType] = useState<"add" | "edit">("add");
  // const [editData, setEditData] = useState<CardDataType | null>(null);
  const snackbar = useSnackbar();
  const [mobileServices, setmobileServices] = useState<
    Mobile_Services[] | null
  >(null);

  useEffect(() => {
    axios
      .get<{ mobile_services: Mobile_Services[] }>(
        Api(`employee/client/mobile-services`)
      )
      .then((res) => {
        setmobileServices(res.data.mobile_services);
      })
      .catch((err) => {});
  }, []);
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await axios.post(
        Api(type === "add" ? "employee/client/services-banners/store" : ``),
        serialize(
          {
            category_service_id: story?.id,
            data: [
              {
                end_date: data.end_date,
                service_id: data.service_id,
                image: data.image,
              },
            ],
          },
          { indices: true }
        )
      );
      snackbar.enqueueSnackbar("تم حفظ ");
      seedStory();
      handleClose();
    } catch (err) {
      snackbar.enqueueSnackbar(" تعذر في حفظ  ", {
        variant: "error",
      });
    }
  };
  return (
    <>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={open}
        onClose={handleClose}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <DialogTitle>اضافة مرفق جديد</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <GridItem>
              <AddLabelToEl label="الخدمة" required>
                <Controller
                  name="service_id"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...register("service_id")}
                      select
                      placeholder="الخدمة"
                      size="small"
                    >
                      {mobileServices?.map((service) => (
                        <MenuItem key={service.id} value={service.id}>
                          {service.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </AddLabelToEl>
            </GridItem>
            <GridItem>
              <AddLabelToEl label="تاريخ الاعلان">
                <Controller
                  name="end_date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      value={field.value ? dayjs(field.value) : null}
                      slotProps={{ textField: TextFieldCommonProps }}
                      onChange={(newValue) => {
                        field.onChange(
                          newValue ? newValue.format("YYYY-MM-DD") : ""
                        );
                      }}
                    />
                  )}
                />
              </AddLabelToEl>
            </GridItem>
            <GridItem>
              <AddLabelToEl label="صورة">
                <Controller
                  name="image"
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
            </GridItem>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>الغاء</Button>
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
type PropsType = {
  open: boolean;
  handleClose: () => void;
  story?: Story;
  seedStory: () => void;
};
