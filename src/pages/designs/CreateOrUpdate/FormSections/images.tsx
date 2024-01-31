import { Stack } from "@mui/material";
import UploadImage from "../../../../components/UploadImage";
import UploadMultipleImages from "../../../../components/UploadMultipleImages";
import { useState } from "react";
import { ImageListType } from "react-images-uploading";
import AddLabelToEl from "../../../../components/AddLabelToEl";
import { FilePond } from "react-filepond";
import { FilePondInitialFile } from "filepond";
import CustomFilePond from "../../../../components/CustomFilepond";
import { FileBondState } from "../../../../types/FileBondState";

const AddTitleToEl = (props: { children?: React.ReactNode; title: string }) => (
  <AddLabelToEl
    label={props.title}
    {...props}
    labelTypographyProps={{ component: undefined, variant: "h6" }}
  />
);

function FormImagesSection(props: PropsType) {
  return (
    <Stack spacing={2}>
      <AddTitleToEl title="ارفاق صورة رئيسية">
        <UploadImage images={props.mainImage} setImages={props.setMainImage} />
      </AddTitleToEl>

      <AddTitleToEl title="ارفاق صور فرعية">
        <UploadMultipleImages
          images={props.subImages}
          setImages={props.setSubImages}
        />
      </AddTitleToEl>

      <AddTitleToEl title="ارفاق الكتيب">
        <CustomFilePond
          files={props.booklet}
          onupdatefiles={(fileItems) => {
            props.setBooklet(fileItems.map((fileItem) => fileItem.file));
          }}
        />
      </AddTitleToEl>

      <AddTitleToEl title="تفاصيل المخطط الهندسي">
        <CustomFilePond
          files={props.engineeringChart}
          onupdatefiles={(fileItems) => {
            props.setEngineeringChart(
              fileItems.map((fileItem) => fileItem.file)
            );
          }}
          allowMultiple
        />
      </AddTitleToEl>

      <AddTitleToEl title="ارفاق فكرة مخطط هندسي">
        <CustomFilePond
          files={props.idea}
          onupdatefiles={(fileItems) => {
            props.setIdea(fileItems.map((fileItem) => fileItem.file));
          }}
        />
      </AddTitleToEl>
    </Stack>
  );
}

type PropsType = {
  mainImage: ImageListType;
  setMainImage: (images: ImageListType) => void;
  subImages: ImageListType;
  setSubImages: (images: ImageListType) => void;
  booklet: FileBondState;
  setBooklet: React.Dispatch<React.SetStateAction<FileBondState>>;
  engineeringChart: FileBondState;
  setEngineeringChart: React.Dispatch<React.SetStateAction<FileBondState>>;
  idea: FileBondState;
  setIdea: React.Dispatch<React.SetStateAction<FileBondState>>;
};

export default FormImagesSection;
