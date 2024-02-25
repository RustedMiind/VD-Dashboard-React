import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  GridProps,
  MenuItem,
  TextField,
  TextFieldProps,
  TypographyProps,
} from "@mui/material";
import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { IconButton } from "@mui/material";
import { Map } from "./Leaflet/Map";
import AddLabelToEl from "../../../../../components/AddLabelToEl";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { Api } from "../../../../../constants";
import { useEffect, useState } from "react";
import { LocationFormOptionsType } from "./Types";
import { LoadingButton } from "@mui/lab";

const GridItem = ({
  children,
  label,
  ...props
}: GridProps & { label: string }) => {
  return (
    <Grid item xs={6} {...props}>
      <AddLabelToEl label={label} required>
        {children}
      </AddLabelToEl>
    </Grid>
  );
};

const requiredErrorMessage = "مطلوب";
const defineErrorObject = {
  invalid_type_error: requiredErrorMessage,
  required_error: requiredErrorMessage,
} as const;

const ErrorText = (props: TypographyProps) => (
  <Typography color="error" variant="body2" {...props} />
);

const GridContainer = (props: GridProps) => (
  <Grid container spacing={2} {...props} />
);

const locationFormSchema: ZodType<LocationForm> = z.object({
  soilAreaId: z.number(defineErrorObject),
  soilFloorId: z.number(defineErrorObject),
  order_type_id: z.number(defineErrorObject),
});
type LocationForm = {
  soilAreaId: number;
  soilFloorId: number;
  order_type_id: number;
};

const calculationFormSchema: ZodType<CalculationForm> = z.object({
  bodies: z.number(defineErrorObject),
  depth: z.number(defineErrorObject),
  price: z.number(defineErrorObject),
});
type CalculationForm = {
  bodies: number;
  depth: number;
  price: number;
};
export default function AddRequest() {
  const [options, setOptions] = useState<LocationFormOptionsType | undefined>(
    undefined
  );
  const getOptions = () => {
    return new Promise((ressolve, reject) => {
      axios
        .get<LocationFormOptionsType>(Api("employee/soil/order/use"))
        .then(({ data }) => {
          setOptions(data);
          ressolve(data);
        })
        .catch((err: AxiosError<LocationFormOptionsType>) => {
          if (err.response?.status === HttpStatusCode.BadRequest) {
            setOptions(err.response.data);
            ressolve(err.response.data);
          } else {
            reject();
          }
        });
    });
  };
  useEffect(() => {
    getOptions();
  }, []);
  const [isLocationFormDone, setIsLocationFormDone] = useState(false);
  const [isCustomCalculationConfirmed, setIsCustomCalculationConfirmed] =
    useState(false);
  const [isManualInputs, setIsManualInputs] = useState(false);
  const locationForm = useForm<LocationForm>({
    resolver: zodResolver(locationFormSchema),
    disabled: isLocationFormDone,
  });
  const LocationFormSubmit = locationForm.handleSubmit((data) => {
    return new Promise((ressolve, reject) => {
      axios
        .get<{
          number_bodies?: number;
          depth?: number;
          price: 0;
          total_price: 0;
        }>(Api("employee/soil/order/calculate"), {
          params: {
            ...data,
            map_price: 300,
          },
        })
        .then(({ data }) => {
          ressolve(data);
          calculationForm.reset({
            bodies: data.number_bodies,
            depth: data.depth,
            price: data.price,
          });
          setIsLocationFormDone(true);
        })
        .catch(reject);
    });
  });
  const LocationFormInputCommonProps =
    // :TextFieldProps
    {
      disabled: locationForm.formState.disabled,
    } as const;

  const calculationForm = useForm<CalculationForm>({
    resolver: zodResolver(calculationFormSchema),
    disabled: !isManualInputs || !isLocationFormDone,
  });

  const calculationFormSubmit = calculationForm.handleSubmit((data) => {
    return new Promise((ressolve, reject) => {
      axios
        .get(Api("employee/soil/order/calculate"), {
          params: {
            ...data,
            map_price: 300,
          },
        })
        .then(({ data }) => {
          ressolve(data);
          calculationForm.reset({
            bodies: data,
          });
        })
        .catch(reject);
    });
  });
  const getCustomCalculation = calculationForm.handleSubmit((data) => {
    return new Promise((ressolve, reject) => {
      axios
        .get<{
          success: boolean;
          msg: string;
          price: number;
          total_price: number;
        }>(Api("employee/soil/order/calculate_price"), {
          params: {
            bodies: data.bodies,
            map_price: data.price,
            depth: data.depth,
          },
        })
        .then(({ data }) => {
          ressolve(data);
          calculationForm.resetField("price", { defaultValue: data.price });
        })
        .catch(reject);
    });
  });
  const calculationFormInputCommonProps =
    // :TextFieldProps
    {
      disabled: calculationForm.formState.disabled,
    } as const;

  return (
    <>
      <Backdrop open={!options} sx={{ zIndex: 10000 }}>
        <CircularProgress sx={{ zIndex: 10001 }} color="secondary" />
      </Backdrop>
      <Stack>
        <Typography>الخدمه</Typography>
        <Typography sx={{ mb: 4, fontSize: "30px", fontWeight: 600 }}>
          خدمة الرخص
        </Typography>
        <GridContainer component="form" onSubmit={LocationFormSubmit}>
          <GridItem label="نوع التقرير">
            <TextField
              select
              fullWidth
              size="small"
              {...locationForm.register("order_type_id", {
                valueAsNumber: true,
              })}
              {...LocationFormInputCommonProps}
              placeholder="نوع التقرير"
            >
              {options?.type_order?.map((type) => (
                <MenuItem value={type.id} key={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </TextField>
            <ErrorText>
              {locationForm.formState.errors.order_type_id?.message}
            </ErrorText>
          </GridItem>
          <GridItem label="مساحة الموقع">
            <TextField
              fullWidth
              size="small"
              placeholder="مساحة الموقع"
              {...locationForm.register("soilAreaId", { valueAsNumber: true })}
              {...LocationFormInputCommonProps}
              type="number"
              select
            >
              {options?.soilArea?.map((area) => (
                <MenuItem value={area.id} key={area.id}>
                  {area.number}
                </MenuItem>
              ))}
            </TextField>
            <ErrorText>
              {locationForm.formState.errors.soilAreaId?.message}
            </ErrorText>
          </GridItem>
          <GridItem label="عدد الادوار">
            <TextField
              fullWidth
              size="small"
              {...locationForm.register("soilFloorId", {
                valueAsNumber: true,
              })}
              type="number"
              placeholder="عدد الادوار"
              {...LocationFormInputCommonProps}
              select
            >
              {options?.soilFloor?.map((floor) => (
                <MenuItem value={floor.id} key={floor.id}>
                  {floor.depth}
                </MenuItem>
              ))}
            </TextField>
            <ErrorText>
              {locationForm.formState.errors.soilFloorId?.message}
            </ErrorText>
          </GridItem>
          <GridItem label="الموقع">
            <TextField
              InputProps={{
                endAdornment: (
                  <IconButton {...LocationFormInputCommonProps}>
                    <AddLocationIcon />
                  </IconButton>
                ),
              }}
              fullWidth
              size="small"
              {...LocationFormInputCommonProps}
              placeholder="الموقع"
            />
          </GridItem>
          <Grid item xs={6} my={2}>
            <LoadingButton
              fullWidth
              variant="contained"
              type="submit"
              color="secondary"
              loading={locationForm.formState.isSubmitting}
              {...LocationFormInputCommonProps}
            >
              حساب عدد الجسات
            </LoadingButton>
          </Grid>
        </GridContainer>
        <GridContainer
          sx={{ display: isLocationFormDone ? undefined : "none" }}
        >
          <GridItem label="عدد الجسات">
            <TextField
              fullWidth
              size="small"
              placeholder="عدد الجسات"
              type="number"
              {...calculationForm.register("bodies", {
                valueAsNumber: true,
                ...calculationFormInputCommonProps,
              })}
            />
          </GridItem>
          <GridItem label="عمق الجسات">
            <TextField
              fullWidth
              size="small"
              placeholder="عمق الجسات"
              type="number"
              {...calculationForm.register("depth", {
                valueAsNumber: true,
                ...calculationFormInputCommonProps,
              })}
            />
          </GridItem>
          <GridItem label="الاجمالي المطلوب">
            <TextField
              fullWidth
              size="small"
              placeholder="الاجمالي المطلوب"
              type="number"
              {...calculationForm.register("price", {
                valueAsNumber: true,
                ...calculationFormInputCommonProps,
              })}
            />
          </GridItem>
          <GridItem label="طريقة الدفع">
            <TextField
              fullWidth
              size="small"
              placeholder="طريقة الدفع"
              {...calculationFormInputCommonProps}
            />
          </GridItem>
          {/* <Grid item xs={6} /> */}
          {isManualInputs ? (
            <Grid item xs={6} my={2}>
              <LoadingButton
                fullWidth
                variant="contained"
                onClick={getCustomCalculation}
                color="secondary"
                loading={locationForm.formState.isSubmitting}
              >
                حساب التكلفة
              </LoadingButton>
            </Grid>
          ) : (
            <Grid item xs={6} my={2}>
              <LoadingButton
                fullWidth
                variant="contained"
                onClick={() => {
                  setIsManualInputs(true);
                  calculationForm.reset();
                }}
                color="secondary"
                loading={locationForm.formState.isSubmitting}
              >
                ادخال يدوي
              </LoadingButton>
            </Grid>
          )}
        </GridContainer>
        <Map />
      </Stack>
    </>
  );
}
