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
import React from "react";
import { ImageListType } from "react-images-uploading";
import FormImagesSection from "./FormSections/images";
import UtilitiesSection from "./FormSections/Utilities";
import DesignFile from "./FormSections/DesignFile";

export function InputGridItem({
  label,
  children,
  ...props
}: GridProps & { label: string }) {
  return (
    <GridItem sx={{ px: 1 }}>
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

export function TextInput({ ...props }: TextFieldProps) {
  return <TextField size="small" fullWidth {...props} />;
}

export function GridItemTextInputWithLabel({
  ...props
}: TextFieldProps & { label: string }) {
  return (
    <InputGridItem label={props.label}>
      <TextInput fullWidth placeholder={props.label} {...props} />
    </InputGridItem>
  );
}

export function GridItemDateInputWithLabel({
  label,
  ...props
}: DatePickerProps<string> & { label: string }) {
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
  const { register, handleSubmit, reset } = useForm<CreateFormType>();

  const [mainImage, setMainImage] = React.useState<ImageListType>([]);

  const [subImages, setSubImages] = React.useState<ImageListType>([]);

  const formSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Box component={"form"} onSubmit={formSubmit}>
      <Grid container spacing={2}>
        <Grid item lg={8}>
          <Stack spacing={4}>
            <TextInput {...register("area")} />
            {/* <MainFormSection registerFn={register} /> */}
            <DesignFile registerFn={register} />
            <UtilitiesSection registerFn={register} />
          </Stack>
          {/* Form Inputs */}
        </Grid>
        <Grid item lg={4}>
          {/* Form Files */}
          <FormImagesSection
            {...{ mainImage, setMainImage, setSubImages, subImages }}
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
  "idea_eng-image": string;
  "main-image"?: File;
  "sub-image"?: File;
  booklet?: File;
  "eng-image"?: File;
};

export default CreateOrUpdateDesign;
