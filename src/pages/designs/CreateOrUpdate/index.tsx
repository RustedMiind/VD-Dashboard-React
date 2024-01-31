import {
  Box,
  Button,
  Grid,
  GridProps,
  Stack,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useForm } from "react-hook-form";
import AddLabelToEl from "../../../components/AddLabelToEl";
import MainFormSection from "./FormSections/main";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { ImageListType } from "react-images-uploading";
import FormImagesSection from "./FormSections/images";
import UtilitiesSection from "./FormSections/Utilities";
import DesignFile from "./FormSections/DesignFile";
import { FileBondState } from "../../../types/FileBondState";
import { FilePondInitialFile } from "filepond";
import { Dayjs } from "dayjs";

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
  const { register, handleSubmit, resetField } = useForm<CreateFormType>();

  const [mainImage, setMainImage] = useState<ImageListType>([]);

  const [subImages, setSubImages] = useState<ImageListType>([]);

  const [booklet, setBooklet] = useState<FileBondState>([]);

  const [engineeringChart, setEngineeringChart] = useState<FileBondState>([]);

  const [idea, setIdea] = useState<FileBondState>([]);

  const [discountStart, setDiscountStart] = useState<string | null>("");
  const [discountEnd, setDiscountEnd] = useState<string | null>("");
  const formSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const [utilities, setUtilities] = useState<Utility[]>([utilityInitial]);
  const setUtility = (updatedUtility: Utility, index: number) => {
    setUtilities((utilities) => {
      const updatedUtilities: Utility[] = [];
      utilities.forEach((utility, i) => {
        if (index === i) {
          updatedUtilities.push(updatedUtility);
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
              discountStart={discountStart}
              setDiscountStart={setDiscountStart}
              discountEnd={discountEnd}
              setDiscountEnd={setDiscountEnd}
            />
            <DesignFile registerFn={registerFn} />
            <UtilitiesSection
              {...{
                setUtilities,
                setUtility,
                utilities,
                registerFn,
              }}
            />
          </Stack>
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
            }}
          />
        </Grid>
        <Button type="submit">Submit</Button>
      </Grid>
    </Box>
  );
}

export type CreateFormType = {
  name_ar: string;
  name_en: string;
  desc_ar: string;
  desc_en: string;
  has_descount: string;
  price_before: string;
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
  "idea-eng-image": File;
  "main-image"?: File;
  "sub-image"?: File[];
  "eng-image"?: File[];
  booklet?: File;
};

// declare types
export type Utility = {
  files: (string | FilePondInitialFile | Blob)[];
  option: string;
};

export const utilityInitial: Utility = { option: "", files: [] };

export type CreateFormKeys = keyof CreateFormType;

export default CreateOrUpdateDesign;
