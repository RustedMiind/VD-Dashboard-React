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
import AddLabelToEl from "../../../../../components/AddLabelToEl";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { Api } from "../../../../../constants";
import { useEffect, useState } from "react";
import { LocationFormOptionsType, StoreFormBody } from "./Types";
import { LoadingButton } from "@mui/lab";
import { MapType } from "../../../../../types/Soil";
import { MapComponent } from "./Leaflet/Map";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { FileBondState } from "../../../../../types/FileBondState";
import { FilePond } from "react-filepond";
import CustomFilePond from "../../../../../components/CustomFilepond";
import { serialize } from "object-to-formdata";
import DailogMap from "./DailogMap";

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
  total_price: z.number(defineErrorObject),
});
type CalculationForm = {
  bodies: number;
  depth: number;
  price: number;
  total_price: number;
};
export default function AddRequest() {
  const { id } = useParams();
  const [options, setOptions] = useState<LocationFormOptionsType | undefined>(
    undefined
  );
  const [images, setImages] = useState<FileBondState>([]);
  const navigate = useNavigate();
  const [currentMap, setCurrentMap] = useState<MapType | undefined>(undefined);
  const [calculationPriceData, setCalculationPriceData] = useState<
    CalculationForm | undefined
  >(undefined);
  const [locationFormData, setLocationFormData] = useState<
    LocationForm | undefined
  >(undefined);
  const [selectedPin, setSelectedPin] = useState<[number, number] | null>(null);
  const [openMap, setOpenMap] = useState<boolean>(false);
  function handleCloseMap() {
    setOpenMap(!openMap);
  }
  const getOptions = () => {
    return new Promise((ressolve, reject) => {
      setLocationState("unknown");
      setCurrentMap(undefined);
      axios
        .get<LocationFormOptionsType>(Api("employee/soil/order/use"), {
          params: {
            lat: selectedPin?.[0],
            long: selectedPin?.[1],
          },
        })
        .then(({ data }) => {
          setOptions(data);
          ressolve(data);
          setCurrentMap(data.map?.[0]);
          setLocationState("inside");
        })
        .catch((err: AxiosError<LocationFormOptionsType>) => {
          if (err.response?.status === HttpStatusCode.BadRequest) {
            setOptions(err.response.data);
            setLocationState("outside");
            ressolve(err.response.data);
          } else {
            reject();
          }
        });
    });
  };
  const [locationState, setLocationState] = useState<
    "unknown" | "inside" | "outside"
  >("unknown");
  useEffect(() => {
    getOptions();
  }, [selectedPin?.[0], selectedPin?.[1]]);
  const { enqueueSnackbar } = useSnackbar();
  const [isLocationFormDone, setIsLocationFormDone] = useState(false);
  const [isCustomCalculationConfirmed, setIsCustomCalculationConfirmed] =
    useState(false);
  const [isManualInputs, setIsManualInputs] = useState(false);
  const locationForm = useForm<LocationForm>({
    resolver: zodResolver(locationFormSchema),
    disabled: isLocationFormDone,
  });

  const LocationFormSubmit = locationForm.handleSubmit((formData) => {
    return new Promise((ressolve, reject) => {
      axios
        .get<{
          number_bodies?: number;
          depth?: number;
          price: number;
          total_price: number;
        }>(Api("employee/soil/order/calculate"), {
          params: {
            ...formData,
            map_price: currentMap?.price,
          },
        })
        .then(({ data }) => {
          ressolve(data);
          calculationForm.reset({
            bodies: data.number_bodies,
            depth: data.depth,
            price: data.price,
            total_price: data.total_price,
          });
          setLocationFormData(formData);

          setCalculationPriceData({
            bodies: data.number_bodies || 0,
            depth: data.depth || 0,
            price: data.price,
            total_price: data.total_price,
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
    // resolver: zodResolver(calculationFormSchema),
    disabled: !isManualInputs || !isLocationFormDone,
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
            map_price: currentMap?.price,
            depth: data.depth,
          },
        })
        .then(({ data }) => {
          setIsCustomCalculationConfirmed(true);
          setCalculationPriceData({
            price: data.price,
            total_price: data.total_price,
            bodies: calculationPriceData?.bodies || 0,
            depth: calculationPriceData?.depth || 0,
          });
          // calculationForm.resetField("price", data.price);
          // calculationForm.resetField("total_price", {
          //   defaultValue: data.total_price,
          // });
          calculationForm.reset({
            price: data.price,
            total_price: data.total_price,
          });
          ressolve(data);
        })
        .catch(reject);
    });
  });
  const calculationFormInputCommonProps =
    // :TextFieldProps
    {
      disabled: calculationForm.formState.disabled,
    } as const;
  const handleStore = () => {
    console.log("locationFormData?.soilFloorId", locationFormData?.soilFloorId);
    const body = {
      area_id: currentMap?.soil_location_id,
      client_id: id,
      depth: calculationForm.getValues("depth") ?? calculationPriceData?.depth,
      floor_id: locationFormData?.soilFloorId,
      lat: selectedPin?.[0],
      long: selectedPin?.[1],
      license_id: 1,
      map: currentMap?.id,
      number_bodies:
        calculationForm.getValues("bodies") ?? calculationPriceData?.bodies,
      number_floor: options?.soilFloor?.find(
        (floor) => floor.id == locationFormData?.soilFloorId
      )?.number_floors,
      order_type_id: locationFormData?.order_type_id,
      payment: "cash",
      price: calculationForm.getValues("price") ?? calculationPriceData?.price,
      total_price:
        calculationForm.getValues("total_price") ??
        calculationPriceData?.total_price,
      image: images.filter((file) => file instanceof File),
    };
    console.log("body object", body);
    axios
      .post(Api("employee/soil/order/store"), serialize(body))
      .then(() => {
        enqueueSnackbar("تم الطلب بنجاح");
        navigate("/react/services/soil");
      })
      .catch((err) => {
        enqueueSnackbar(
          err.response?.data?.msg ||
            err.response?.data?.message ||
            "تعذر في تسجيل الطلب",
          { variant: "error" }
        );
      });
  };
  console.log(currentMap);
  console.log(calculationForm?.formState?.errors);
  console.log(
    "isLocationFormDone",
    isLocationFormDone,
    "isCustomCalculationConfirmed",
    isCustomCalculationConfirmed,
    "isManualInputs",
    isManualInputs
  );

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
                  {area.area_from} - {area.area_to}
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
                  {floor.number_floors}
                </MenuItem>
              ))}
            </TextField>
            <ErrorText>
              {locationForm.formState.errors.soilFloorId?.message}
            </ErrorText>
          </GridItem>
          <GridItem label="الموقع">
            <TextField
              value={selectedPin?.join(" | ")}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleCloseMap}
                    {...LocationFormInputCommonProps}
                  >
                    <AddLocationIcon />
                  </IconButton>
                ),
              }}
              fullWidth
              size="small"
              {...LocationFormInputCommonProps}
              disabled
              placeholder="الموقع"
            />

            {!!(locationState === "inside" && selectedPin) && (
              <ErrorText color="success">الموقع داخل المساحة المغطاة</ErrorText>
            )}

            {locationState === "outside" && (
              <ErrorText>الموقع خارج المساحة المغطاة</ErrorText>
            )}
          </GridItem>
          {!isLocationFormDone && (
            <DailogMap
              openMap={openMap}
              handleCloseMap={handleCloseMap}
              setSelectedPin={setSelectedPin}
              selectedPin={selectedPin}
            />
          )}
          <Grid item xs={6} my={2}>
            <LoadingButton
              fullWidth
              variant="contained"
              type="submit"
              color="secondary"
              loading={locationForm.formState.isSubmitting}
              disabled={
                LocationFormInputCommonProps.disabled ||
                locationState !== "inside"
              }
            >
              حساب عدد الجسات
            </LoadingButton>
          </Grid>

          <Grid item xs={6} my={2}>
            <CustomFilePond
              files={images}
              maxFiles={5}
              allowMultiple
              onupdatefiles={(fileItems) => {
                setImages(fileItems.map((fileItem) => fileItem.file));
              }}
            />
          </Grid>
        </GridContainer>
        <GridContainer
          sx={{ display: isLocationFormDone ? undefined : "none" }}
          component={"form"}
          onSubmit={getCustomCalculation}
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
          <GridItem label="الاجمالي">
            <TextField
              fullWidth
              size="small"
              placeholder="الاجمالي"
              type="number"
              {...calculationForm.register("price", {
                valueAsNumber: true,
                ...calculationFormInputCommonProps,
                disabled: true,
              })}
            />
          </GridItem>
          <GridItem label="الاجمالي المطلوب">
            <TextField
              fullWidth
              size="small"
              placeholder="الاجمالي المطلوب"
              type="number"
              {...calculationForm.register("total_price", {
                valueAsNumber: true,
                ...calculationFormInputCommonProps,
              })}
              disabled={
                !isLocationFormDone ||
                (!isCustomCalculationConfirmed && isManualInputs)
              }
            />
          </GridItem>
          <GridItem label="طريقة الدفع">
            <TextField
              fullWidth
              size="small"
              placeholder="طريقة الدفع"
              {...calculationFormInputCommonProps}
              disabled
              value={"نقدي"}
            />
          </GridItem>
          <Grid item xs={6} />

          {isManualInputs ? (
            <Grid item xs={6} my={2}>
              <LoadingButton
                fullWidth
                variant="contained"
                type="submit"
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
                type="button"
                onClick={() => {
                  setTimeout(() => {
                    setIsManualInputs(true);
                  }, 300);
                }}
                color="secondary"
                loading={locationForm.formState.isSubmitting}
              >
                ادخال يدوي
              </LoadingButton>
            </Grid>
          )}
        </GridContainer>
        <Button
          disabled={
            !isLocationFormDone ||
            (!isCustomCalculationConfirmed && isManualInputs)
          }
          variant="contained"
          size="large"
          onClick={handleStore}
        >
          تأكيد الطلب
        </Button>
      </Stack>
    </>
  );
}
