import axios from "axios";
import { Announcement } from "../../../../types/Announcement";
import { Api } from "../../../../constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Grid,
  GridProps,
  Paper,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import AddLabelToEl from "../../../../components/AddLabelToEl";
import CustomFilePond from "../../../../components/CustomFilepond";
import { Controller, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { z } from "zod";
import dayjs, { Dayjs } from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackbar } from "notistack";
import { serialize } from "object-to-formdata";
import { useNavigate } from "react-router-dom";

export interface GetAnnouncementByIdRoot {
  announcement?: Announcement;
  message: string;
  status: boolean;
}

const GridItem = (props: GridProps) => <Grid item xs={12} lg={6} {...props} />;

const ErrorMessage = (props: TypographyProps) => (
  <Typography variant="body2" color="error" {...props} />
);

const TextFieldCommonProps: TextFieldProps = {
  size: "small",
  fullWidth: true,
};

export async function getAnnouncementById(
  id: number | string
): Promise<Announcement> {
  const announcement = (
    await axios.get<GetAnnouncementByIdRoot>(
      Api("employee/client/announcement/" + id)
    )
  ).data.announcement;
  if (announcement) return announcement;
  else throw new Error();
}

const FormTypeSchema = z.object({
  title: z.string().min(4),
  body: z.string().min(4),
  duration: z.string().optional(),
  date: z.string(), // Assuming date is a string in "YYYY-MM-DD" format
  image: z.instanceof(File).optional(), // Assuming 'image' is a file object
});

export type FormType = z.infer<typeof FormTypeSchema>;

function SetAnnouncement() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormType>({ resolver: zodResolver(FormTypeSchema) });

  const [announcement, setAnnouncement] = useState<Announcement | undefined>(
    undefined
  );
  let formType: "edit" | "create" = "create";
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  if (id) formType = "edit";
  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post(
        Api(
          formType === "create"
            ? "employee/client/announcement/store"
            : `employee/client/announcement/${id}`
        ),
        serialize(data)
      );
      enqueueSnackbar("تم الحفظ بنجاح");
      navigate("/react/announcements");
    } catch (err) {
      enqueueSnackbar("تعذر في حفظ بيانات الاعلان", { variant: "error" });
    }
  });

  useEffect(() => {
    if (id) {
      getAnnouncementById(id).then(setAnnouncement);
    }
  }, [id]);

  useEffect(() => {
    if (announcement) {
      reset({
        body: announcement.body,
        date: announcement.date,
        title: announcement.title,
        duration: announcement.duration?.toString(),
      });
    }
  }, [announcement?.id]);

  return (
    <Grid container component="form" onSubmit={onSubmit} spacing={4}>
      <Grid item lg={7} md={9} xs={12}>
        <Grid container spacing={2}>
          <GridItem>
            <AddLabelToEl label="عنوان الاعلان">
              <TextField
                {...register("title")}
                placeholder="عنوان الاعلان"
                {...TextFieldCommonProps}
              />
            </AddLabelToEl>
            <ErrorMessage> {errors.title?.message} </ErrorMessage>
          </GridItem>
          <GridItem>
            <AddLabelToEl label="تاريخ الاعلان">
              <Controller
                name="date"
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
            <ErrorMessage> {errors.date?.message} </ErrorMessage>
          </GridItem>
          <GridItem>
            <AddLabelToEl label="وصف الاعلان">
              <TextField
                {...register("body")}
                multiline
                placeholder="وصف الاعلان"
                {...TextFieldCommonProps}
              />
            </AddLabelToEl>
            <ErrorMessage> {errors.body?.message} </ErrorMessage>
          </GridItem>
          <GridItem>
            <AddLabelToEl label="يتكرر الاعلان كل">
              <TextField
                {...register("duration")}
                type="number"
                InputProps={{ endAdornment: "يوم" }}
                multiline
                placeholder="فارغة في حالة عدم تكرار الاعلان"
                {...TextFieldCommonProps}
              />
            </AddLabelToEl>
            <ErrorMessage> {errors.duration?.message} </ErrorMessage>
          </GridItem>
          <GridItem>
            <AddLabelToEl label="صورة الاعلان">
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
            <ErrorMessage> {errors.image?.message} </ErrorMessage>
          </GridItem>

          <LoadingButton
            fullWidth
            variant="contained"
            loading={isSubmitting}
            type="submit"
          >
            الحفظ
          </LoadingButton>
        </Grid>
      </Grid>
      {announcement && (
        <Grid item lg={5} md={9} xs={12}>
          <Typography variant="h6" fontWeight={700}>
            الصورة الحالية
          </Typography>
          <Paper
            component="img"
            src={announcement.first_gallery_media?.original_url}
            sx={{ width: 1 }}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default SetAnnouncement;
