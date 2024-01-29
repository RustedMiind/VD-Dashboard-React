import { Stack } from "@mui/material";
import UploadImage from "../../../../components/UploadImage";
import UploadMultipleImages from "../../../../components/UploadMultipleImages";
import { useState } from "react";
import { ImageListType } from "react-images-uploading";
import AddLabelToEl from "../../../../components/AddLabelToEl";

const AddTitleToEl = (props: { children?: React.ReactNode; title: string }) => (
  <AddLabelToEl
    label={props.title}
    {...props}
    labelTypographyProps={{ component: undefined, variant: "h6" }}
  />
);

function FormImagesSection() {
  const [images, setImages] = useState<ImageListType>([]);
  return (
    <Stack spacing={2}>
      <AddTitleToEl title="ارفاق صورة رئيسية">
        <UploadImage images={images} setImages={setImages} />
      </AddTitleToEl>

      <AddTitleToEl title="ارفاق صور فرعية">
        <UploadMultipleImages images={images} setImages={setImages} />
      </AddTitleToEl>

      <AddTitleToEl title="ارفاق الكتيب">
        <UploadImage images={images} setImages={setImages} />
      </AddTitleToEl>

      <AddTitleToEl title="تفاصيل المخطط الهندسي">
        <UploadMultipleImages images={images} setImages={setImages} />
      </AddTitleToEl>

      <AddTitleToEl title="ارفاق فكرة مخطط هندسي">
        <UploadImage images={images} setImages={setImages} />
      </AddTitleToEl>
    </Stack>
  );
}

export default FormImagesSection;
