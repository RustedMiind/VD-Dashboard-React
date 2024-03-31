import {
  Box,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  GridProps,
  MenuItem,
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
import ServiceMedia from "./ServiceMedia";

export interface GetServiceByIdRoot {
  mobile_service: unknown;
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
  hidden,
}: {
  label: string;
  error?: string;
  children?: React.ReactNode;
  hidden?: boolean;
}) => (
  <GridItem sx={{ display: hidden ? "none" : undefined }}>
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
  ).data?.mobile_service;
  const service = mobileServiceSchema.parse(resService);
  if (service) return service;
  else throw new Error();
}

const formSchema = z.object({
  name: z.string().min(4).max(16),
  features: z.string().optional(),
  description: z.string().optional(),
  specifications: z.string().optional(),
  mobile_service_id: z
    .number()
    .optional()
    .transform((value) => {
      return value && value > 0 ? value : null;
    }),
  banners: z.array(z.instanceof(File)).optional(), // Assuming File is a type representing uploaded files
  image: z.instanceof(File).optional(), // Assuming File is a type representing uploaded files
  is_responsible_service: z.boolean().default(false),
});

type FormType = z.infer<typeof formSchema>;

function SetMobileServicePage() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({ resolver: zodResolver(formSchema) });
  const { id } = useParams();
  const formType: "edit" | "create" = id ? "edit" : "create";
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [service, setService] = useState<MobileService | undefined>(undefined);
  const [parentServices, setParentServices] = useState<MobileService[]>([]);
  const isParent = watch("is_responsible_service");

  function seedService() {
    if (id) {
      getMobileServiceById(id)
        .then((service) => {
          setService(service);
          reset({
            description: service.description || "",
            features: service.features || "",
            is_responsible_service: !!service.is_responsible_service,
            name: service.name,
            mobile_service_id: service.mobile_service_id
              ? service.mobile_service_id
              : -1,
            specifications: service.specifications || "",
          });
        })
        .catch(console.log);
    }
  }

  useEffect(() => {
    axios
      .get<{ mobile_services: unknown }>(
        Api("employee/client/mobile-services/parents")
      )
      .then(({ data: { mobile_services } }) => {
        try {
          const servicesSchema = z.array(mobileServiceSchema);
          const services = servicesSchema.parse(mobile_services);
          setParentServices(services);
        } catch (error) {
          setParentServices([]);
        }
      });
  }, []);

  useEffect(seedService, [id]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
      await axios.post(
        Api(
          formType === "create"
            ? "employee/client/mobile-services/store"
            : `employee/client/mobile-services/${id}`
        ),
        serialize(data, { indices: true, booleansAsIntegers: true })
      );
      enqueueSnackbar("تم حفظ الخدمة بنجاح");
      navigate("/react/mobile-services");
    } catch (err) {
      const errorSchema = z.object({
        response: z.object({ data: z.object({ message: z.string() }) }),
      });
      const validationError = errorSchema.safeParse(err);
      enqueueSnackbar(
        (validationError.success &&
          validationError.data.response.data.message) ||
          " تعذر في حفظ الخدمة",
        {
          variant: "error",
        }
      );
    }
  });

  return (
    <Stack>
      <Container maxWidth={"lg"} component={"form"} onSubmit={onSubmit}>
        <Grid container spacing={1} columnSpacing={2}>
          <InputContainer label="اسم الخدمة" error={errors.name?.message}>
            <TextField
              {...textFieldProps("اسم الخدمة")}
              {...register("name")}
            />
          </InputContainer>

          <InputContainer
            label="مميزات الخدمة"
            error={errors.features?.message}
            hidden={isParent}
          >
            <TextField
              {...textFieldProps("مميزات الخدمة")}
              multiline
              {...register("features")}
            />
          </InputContainer>

          <InputContainer
            label="وصف الخدمة"
            error={errors.description?.message}
            hidden={isParent}
          >
            <TextField
              {...textFieldProps("وصف الخدمة")}
              multiline
              {...register("description")}
            />
          </InputContainer>

          <InputContainer
            label="تفاصيل الخدمة"
            error={errors.specifications?.message}
            hidden={isParent}
          >
            <TextField
              {...textFieldProps("تفاصيل الخدمة")}
              multiline
              {...register("specifications")}
            />
          </InputContainer>
          <InputContainer label="ارفاق صورة" error={errors.image?.message}>
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
          <InputContainer
            label="ارفاق البانرات"
            error={errors.banners?.message}
            hidden={isParent}
          >
            <Controller
              name="banners"
              control={control}
              render={({ field }) => (
                <CustomFilePond
                  {...field}
                  maxFiles={7 - (service?.pictures?.banners?.length || 0)}
                  onupdatefiles={(files) => {
                    field.onChange(files.map((file) => file.file));
                  }}
                  allowMultiple={true}
                />
              )}
            />
          </InputContainer>

          <InputContainer
            label=""
            error={errors.is_responsible_service?.message}
          >
            <Controller
              control={control}
              name="is_responsible_service"
              render={({ field }) => (
                <FormControlLabel
                  checked={field.value}
                  label="خدمة أم"
                  {...field}
                  control={<Switch />}
                />
              )}
            />
          </InputContainer>
          <InputContainer
            label="اختر الخدمة الام"
            error={errors.is_responsible_service?.message}
            hidden={isParent}
          >
            <Controller
              name="mobile_service_id"
              control={control}
              defaultValue={service?.mobile_service_id || -1} // Set default value
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  placeholder="المقاول"
                  value={field.value} // Ensure value is controlled
                  onChange={(e) => field.onChange(e.target.value)} // Handle onChange event
                  {...textFieldProps()}
                >
                  {[
                    { name: "لم يتم اختيار خدمة ام", id: -1 },
                    ...parentServices,
                  ].map((service) => (
                    <MenuItem key={service.id} value={service.id}>
                      {service.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </InputContainer>
        </Grid>
        <LoadingButton
          sx={{ mt: 2 }}
          loading={isSubmitting}
          type="submit"
          variant="contained"
          fullWidth
        >
          حفظ
        </LoadingButton>
        {service && (
          <Stack mt={4}>
            <ServiceMedia service={service} seedService={seedService} />
          </Stack>
        )}
      </Container>
    </Stack>
  );
}

export default SetMobileServicePage;
