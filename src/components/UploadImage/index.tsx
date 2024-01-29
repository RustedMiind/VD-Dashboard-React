import { Box, Button, IconButton, Paper, styled } from "@mui/material";
import React from "react";
import UploadIcon from "@mui/icons-material/Upload";

import ImageUploading, { ImageListType } from "react-images-uploading";

export const RoundedImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: 8,
});

function UploadImage({ images, setImages, boxSide = 125 * 2 + 32 }: PropsType) {
  const onChange = (imageList: ImageListType) => {
    setImages(imageList.slice(0, 1));
  };

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      dataURLKey="data_url"
    >
      {(data) => (
        <Paper
          sx={{
            width: boxSide,
            height: boxSide,
            position: "relative",
            overflow: "hidden",
            p: 2,
          }}
          elevation={2}
        >
          <Button
            sx={{ width: 1, height: 1, zIndex: 10 }}
            onClick={
              images.length ? () => data.onImageUpdate(0) : data.onImageUpload
            }
            {...data.dragProps}
          >
            <IconButton color="primary">
              <UploadIcon fontSize="large" />
            </IconButton>
          </Button>
          {images.map((image) => (
            <Box
              sx={{
                width: 1,
                height: 1,
                p: 2,
                left: 0,
                top: 0,
                position: "absolute",
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              <RoundedImage src={image["data_url"]} alt="" />
            </Box>
          ))}
        </Paper>
      )}
    </ImageUploading>
  );
}

type PropsType = {
  images: ImageListType;
  setImages: React.Dispatch<React.SetStateAction<ImageListType>>;
  boxSide?: number;
};

export default UploadImage;
