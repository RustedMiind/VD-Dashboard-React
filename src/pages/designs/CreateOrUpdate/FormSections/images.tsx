import { Stack } from "@mui/material";
import UploadImage from "../../../../components/UploadImage";
import UploadMultipleImages from "../../../../components/UploadMultipleImages";
import { useState } from "react";
import { ImageListType } from "react-images-uploading";
import AddLabelToEl from "../../../../components/AddLabelToEl";
import { FilePond } from "react-filepond";
import { FilePondInitialFile } from "filepond";
import CustomFilePond from "../../../../components/CustomFilepond";

const AddTitleToEl = (props: { children?: React.ReactNode; title: string }) => (
  <AddLabelToEl
    label={props.title}
    {...props}
    labelTypographyProps={{ component: undefined, variant: "h6" }}
  />
);

function FormImagesSection(props: PropsType) {
  const [files, setFiles] = useState<(string | FilePondInitialFile | Blob)[]>(
    []
  );
  const [bookFiles, setBookFiles] = useState<
    (string | FilePondInitialFile | Blob)[]
  >([]);
  const [ideaFiles, setIdeaFiles] = useState<
    (string | FilePondInitialFile | Blob)[]
  >([]);
  console.log(files);
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
          files={bookFiles}
          onupdatefiles={(fileItems) => {
            setBookFiles(fileItems.map((fileItem) => fileItem.file));
          }}
        />
      </AddTitleToEl>

      <AddTitleToEl title="تفاصيل المخطط الهندسي">
        <CustomFilePond
          files={files}
          onupdatefiles={(fileItems) => {
            setFiles(fileItems.map((fileItem) => fileItem.file));
          }}
          allowMultiple
        />
      </AddTitleToEl>

      <AddTitleToEl title="ارفاق فكرة مخطط هندسي">
        <CustomFilePond
          files={ideaFiles}
          onupdatefiles={(fileItems) => {
            setIdeaFiles(fileItems.map((fileItem) => fileItem.file));
          }}
          allowMultiple
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
};

export default FormImagesSection;
