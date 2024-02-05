import {
  Box,
  Grid,
  GridProps,
  LinearProgress,
  LinearProgressProps,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import AddLabelToEl from "../../../components/AddLabelToEl";
import MainFormSection from "./FormSections/main";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import { useEffect, useMemo, useState } from "react";
import { ImageListType } from "react-images-uploading";
import FormImagesSection from "./FormSections/images";
import UtilitiesSection from "./FormSections/Utilities";
import DesignFile from "./FormSections/DesignFile";
import { FileBondState } from "../../../types/FileBondState";
import { FilePondInitialFile } from "filepond";
import { Dayjs } from "dayjs";
import axios from "axios";
import { Api } from "../../../constants";
import { serialize } from "object-to-formdata";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { Design } from "../../../types";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export function InputGridItem({
  label,
  children,
  ...props
}: GridProps & { label: string }) {
  return (
    <GridItem sx={{ pr: 1 }}>
      <AddLabelToEl label={label}>{children}</AddLabelToEl>
    </GridItem>
  );
}

export function GridItem(props: GridProps) {
  return <Grid item lg={6} {...props} />;
}

export function InputsGridContainer({ ...props }: GridProps) {
  return <Grid container {...props} rowSpacing={2} />;
}

export function TextInput({
  register,
  ...props
}: TextFieldProps & { register?: () => TextFieldProps }) {
  return (
    <TextField
      size="small"
      {...(register ? register() : {})}
      fullWidth
      {...props}
    />
  );
}

export function GridItemTextInputWithLabel({
  label,
  register,
  ...props
}: TextFieldProps & { label: string; register?: () => TextFieldProps }) {
  return (
    <InputGridItem label={label}>
      <TextInput fullWidth register={register} placeholder={label} {...props} />
    </InputGridItem>
  );
}

export function GridItemDateInputWithLabel({
  label,
  ...props
}: DatePickerProps<Dayjs> & { label: string }) {
  return (
    <InputGridItem label={label}>
      <DatePicker
        slotProps={{
          textField: {
            size: "small",
          },
        }}
        {...props}
      />
    </InputGridItem>
  );
}

function CreateOrUpdateDesign() {
  const { register, handleSubmit, resetField, control, reset } =
    useForm<CreateFormType>();
  const { enqueueSnackbar } = useSnackbar();
  const [progress, setProgress] = useState<number | undefined>(undefined);

  const [mainImage, setMainImage] = useState<ImageListType>([]);

  const [subImages, setSubImages] = useState<ImageListType>([]);

  const [booklet, setBooklet] = useState<FileBondState>([]);

  const [engineeringChart, setEngineeringChart] = useState<FileBondState>([]);

  const [idea, setIdea] = useState<FileBondState>([]);

  const { designId } = useParams();

  const mode: "edit" | "create" = useMemo(
    () => (!!designId ? "edit" : "create"),
    [designId]
  );

  const [design, setDesign] = useState<Design | undefined>(undefined);

  useEffect(() => {
    if (designId) getDesignData(designId);
  }, [designId]);

  async function getDesignData(id: string | number) {
    try {
      const { data } = await axios.get<{ design: Design }>(
        Api(`client/design/${id}`),
        { headers: { from: "website" } }
      );
      setDesign(data.design);
      if (data.design.id) setDesignData(data.design);
    } catch (error) {
      setDesign(undefined);
      enqueueSnackbar("فشل في تحميل بيانات التصميم", { variant: "error" });
    }
  }
  function setDesignData(design: Design) {
    reset({
      name_ar: design.name_ar,
      name_en: design.name_en,
      desc_ar: design.desc_ar,
      desc_en: design.desc_en,
      price_before: design.price_before?.toString(),
      price_after: design.price_after?.toString(),
      desc_date_from: design.desc_date_from,
      desc_date_to: design.desc_date_to,
      area: design.area?.toString(),
      floors_num: design.floors_num?.toString(),
      bed_rooms_num: design.bed_rooms_num?.toString(),
      width_floor: design.width_floor?.toString(),
      height_floor: design.height_floor?.toString(),
      width_front_street: design.width_front_street?.toString(),
      bathroom_num: design.bathroom_num?.toString(),
      engineering_name: design.engineering_name,
      main_bedroom: design.main_bedroom?.toString(),
      living_room: design.living_room?.toString(),
      dinner_room: design.dinner_room?.toString(),
      status_design: design.status_design,
      status_web: !!design.status_web,
      status_mob: !!design.status_mob,
      kitchen: design.kitchen?.toString(),
    });
  }

  const formSubmit = handleSubmit((data) => {
    console.log(data);
    const dto = {
      ...data,
      main_image: mainImage[0]?.file,
      sub_image: subImages.map((f) => f.file).filter((f) => f instanceof File),
      booklet: booklet.filter((f) => f instanceof File).find(() => true),
      eng_image: engineeringChart.filter((f) => f instanceof File),
      idea_eng_image: idea.filter((f) => f instanceof File).find(() => true),
      utilities: utilities
        .map((u) => ({
          file: u.files.find((f) => f instanceof File),
          type: u.option,
        }))
        .filter((u) => u.file instanceof File),
      attachments: utilities
        .map((u) => ({
          file: u.files.find((f) => f instanceof File),
          type: u.option,
        }))
        .filter((u) => u.file instanceof File),
    };
    console.log(dto);
    console.log(
      Api(`client/design${design?.id ? "/" + design.id?.toString() : ""}`)
    );
    axios
      .post(
        Api(`client/design${design?.id ? "/" + design.id?.toString() : ""}`),
        serialize(dto),
        {
          headers: {
            from: "website",
          },
          onUploadProgress: (data) => {
            //Set the progress value to show the progress bar
            if (data.total)
              setProgress(Math.round((100 * data.loaded) / data.total));
          },
        }
      )
      .then(({ data }) => {
        enqueueSnackbar("تم الحفظ بنجاح");
      })
      .finally(() => {
        setProgress(undefined);
      })
      .catch((err) => {
        enqueueSnackbar(
          err.response.data.message || err.response.data.msg || "تعذر في الحفظ",
          { variant: "error" }
        );
      });
  });
  const [designFiles, setDesignFiles] = useState<DesignFileType[]>([
    designFileInitial,
  ]);
  const setDesignFile = (
    updatedDesignFile: Partial<DesignFileType>,
    index: number
  ) => {
    setDesignFiles((designFile) => {
      const updatedUtilities: DesignFileType[] = [];
      designFile.forEach((designFile, i) => {
        if (index === i) {
          updatedUtilities.push({
            ...designFile,
            ...updatedDesignFile,
          });
        } else {
          updatedUtilities.push(designFile);
        }
        console.log(updatedUtilities);
      });
      console.log("updatedUtilities ", updatedUtilities);
      return updatedUtilities;
    });
  };
  const [utilities, setUtilities] = useState<Utility[]>([utilityInitial]);
  const setUtility = (updatedUtility: Partial<Utility>, index: number) => {
    setUtilities((utilities) => {
      const updatedUtilities: Utility[] = [];
      utilities.forEach((utility, i) => {
        if (index === i) {
          updatedUtilities.push({
            ...utility,
            ...updatedUtility,
          });
        } else {
          updatedUtilities.push(utility);
        }
        console.log(updatedUtilities);
      });
      console.log("updatedUtilities ", updatedUtilities);
      return updatedUtilities;
    });
  };

  const registerFn = (key: CreateFormKeys) => () => register(key);

  return (
    <Box component={"form"} onSubmit={formSubmit}>
      <Grid container spacing={2}>
        <Grid item lg={8}>
          <Stack spacing={4}>
            <MainFormSection
              resetField={resetField}
              registerFn={registerFn}
              control={control}
            />
            <UtilitiesSection
              {...{
                setUtilities,
                setUtility,
                utilities,
                register,
                registerFn,
                designToEdit: design,
                setDesignToEdit: setDesign,
                control,
              }}
            />
            <DesignFile
              {...{
                designFiles,
                registerFn,
                setDesignFile,
                setDesignFiles,
                designToEdit: design,
                setDesignToEdit: setDesign,
              }}
            />
          </Stack>
          <Grid item xs={12}>
            <Stack width={1}>
              {typeof progress === "number" && (
                <LinearProgressWithLabel
                  sx={{
                    height: 10,
                    borderRadius: 10,
                  }}
                  color={"info"}
                  variant="buffer"
                  value={progress}
                />
              )}
            </Stack>
            <LoadingButton
              loading={typeof progress === "number"}
              type="submit"
              variant="contained"
              fullWidth
            >
              الحفظ
            </LoadingButton>
          </Grid>
          {/* Form Inputs */}
        </Grid>
        <Grid item lg={4}>
          {/* Form Files */}
          <FormImagesSection
            {...{
              idea,
              setIdea,
              mainImage,
              setMainImage,
              setSubImages,
              subImages,
              booklet,
              setBooklet,
              engineeringChart,
              setEngineeringChart,
              designToEdit: design,
              setDesignToEdit: setDesign,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export type CreateFormType = {
  name_ar: string;
  name_en: string;
  desc_ar: string;
  desc_en: string;
  has_descount?: string;
  price_before?: string;
  price_after: string;
  desc_date_from: string;
  desc_date_to: string;
  area: string;
  floors_num: string;
  bed_rooms_num: string;
  width_floor: string;
  height_floor: string;
  width_front_street: string;
  bathroom_num: string;
  engineering_name: string;
  main_bedroom: string;
  living_room: string;
  dinner_room: string;
  status_design: string;
  status_web: boolean;
  status_mob: boolean;
  kitchen: string;
  booklet?: File;
};

// declare types
export type Utility = {
  files: (string | FilePondInitialFile | Blob)[];
  option: string;
};

export const utilityInitial: Utility = { option: "", files: [] };

export type CreateFormKeys = keyof CreateFormType;

export const designFileInitial: DesignFileType = {
  option: "",
  files: [],
  name: "",
};

export type DesignFileType = {
  files: (string | FilePondInitialFile | Blob)[];
  option: string;
  name: string;
};
export default CreateOrUpdateDesign;
