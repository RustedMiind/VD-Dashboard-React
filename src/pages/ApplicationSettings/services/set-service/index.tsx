import {
  Box,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  GridProps,
  Paper,
  Stack,
  Switch,
  TextField,
  TextFieldProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import {
  MobileService,
  mobileServiceSchema,
} from "../../../../types/MobileServices";
import axios from "axios";
import { Api } from "../../../../constants";
import { LoadingButton } from "@mui/lab";
import { z } from "zod";
import dayjs, { Dayjs } from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackbar } from "notistack";
import { serialize } from "object-to-formdata";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import AddLabelToEl from "../../../../components/AddLabelToEl";
import CustomFilePond from "../../../../components/CustomFilepond";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { FilePond } from "react-filepond";
import { FileBondState } from "../../../../types/FileBondState";

export interface GetServiceByIdRoot {
  service: unknown;
  message: string;
  status: boolean;
}

const GridItem = (props: GridProps) => <Grid item xs={12} lg={6} {...props} />;

const ErrorMessage = (props: TypographyProps) => (
  <Typography variant="body2" color="error" {...props} />
);

const InputContainer = ({
  label,
  children,
  error,
}: {
  label: string;
  error?: string;
  children?: React.ReactNode;
}) => (
  <GridItem>
    <AddLabelToEl label={label}>
      {children}
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </AddLabelToEl>
  </GridItem>
);

const textFieldProps: (label?: string) => Partial<TextFieldProps> = (
  label
) => ({
  fullWidth: true,
  size: "small",
  // label,
  placeholder: label,
});
export async function getMobileServiceById(
  id: number | string
): Promise<MobileService> {
  const resService = (
    await axios.get<GetServiceByIdRoot>(
      Api("employee/client/mobile-services/" + id)
    )
  ).data.service;
  const service = mobileServiceSchema.parse(resService);
  if (service) return service;
  else throw new Error();
}

const formSchema = z.object({
  name: z.string(),
  features: z.string().optional(),
  description: z.string().optional(),
  specifications: z.string().optional(),
  mobile_service_id: z.number().optional(),
  banners: z.array(z.instanceof(File)).optional(), // Assuming File is a type representing uploaded files
  image: z.instanceof(File).optional(), // Assuming File is a type representing uploaded files
  is_responsible_service: z.boolean(),
});

type FormType = z.infer<typeof formSchema>;

function SetMobileServicePage() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({ resolver: zodResolver(formSchema) });
  const snackbar = useSnackbar();
  let formType: "edit" | "create" = "create";
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  if (id) formType = "edit";
  const [service, setService] = useState<MobileService | undefined>(undefined);
  const [images, setImages] = useState<FileBondState>([]);

  useEffect(() => {
    if (id) {
      getMobileServiceById(id).then(setService).catch(console.log);
    }
  }, [id]);

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      await axios.post(
        Api("employee/client/mobile-services/store"),
        serialize(data, { indices: true, booleansAsIntegers: true })
      );
      enqueueSnackbar("تم حفظ ");
    } catch (err) {
      enqueueSnackbar(" تعذر في حفظ  ", {
        variant: "error",
      });
    }
  };

  return (
    <Stack>
      <Container
        maxWidth={"lg"}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={1} columnSpacing={2}>
          <InputContainer label="اسم الخدمة">
            <TextField
              {...textFieldProps("اسم الخدمة")}
              {...register("name")}
            />
          </InputContainer>

          <InputContainer label="مميزات الخدمة">
            <TextField
              {...textFieldProps("مميزات الخدمة")}
              multiline
              {...register("features")}
            />
          </InputContainer>

          <InputContainer label="وصف الخدمة">
            <TextField
              {...textFieldProps("وصف الخدمة")}
              multiline
              {...register("description")}
            />
          </InputContainer>

          <InputContainer label="تفاصيل الخدمة">
            <TextField
              {...textFieldProps("تفاصيل الخدمة")}
              multiline
              {...register("specifications")}
            />
          </InputContainer>
          <InputContainer label="ارفاق صورة">
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
                />
              )}
            />
          </InputContainer>
          <InputContainer label="ارفاق البانرات">
            <Controller
              name="banners"
              control={control}
              render={({ field }) => (
                <CustomFilePond
                  {...field}
                  onupdatefiles={(files) => {
                    field.onChange(files.map((file) => file.file));
                  }}
                  allowMultiple={true}
                />
              )}
            />
          </InputContainer>
          <GridItem>
            <Controller
              control={control}
              name="is_responsible_service"
              render={({ field }) => (
                <FormControlLabel
                  label="هل خدمة أم"
                  {...field}
                  control={<Switch />}
                />
              )}
            />
          </GridItem>
        </Grid>
        <LoadingButton type="submit" fullWidth>
          حفظ
        </LoadingButton>
      </Container>
    </Stack>
  );
}

export default SetMobileServicePage;
