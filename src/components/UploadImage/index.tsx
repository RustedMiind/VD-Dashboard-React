import { Box, Button, Paper } from "@mui/material";
import React from "react";
import UploadIcon from "@mui/icons-material/Upload";

import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";

function UploadImage() {
  const [image, setImage] = React.useState<ImageType>();

  const onChange = (image: ImageType, addUpdateIndex: number[] | undefined) => {
    // data for submit
    console.log(image, addUpdateIndex);
    setImage(image);
  };

  return (
    <ImageUploading value={image ? [image] : []} onChange={onChange}>
      {(data) => (
        <Paper sx={{ width: 1, height: 1 }}>
          <Button
            // sx={{ width: 1, height: 1 }}
            onClick={data.onImageUpload}
          >
            <UploadIcon />
          </Button>
          {data.imageList.map((image) => (
            <img src={image.dataURL} />
          ))}
        </Paper>
      )}
    </ImageUploading>
  );
}

export default UploadImage;
