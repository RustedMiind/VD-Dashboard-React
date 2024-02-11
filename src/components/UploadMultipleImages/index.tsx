import { Box, Button, Grid, IconButton, Paper, styled } from "@mui/material";
import React from "react";
import UploadIcon from "@mui/icons-material/Upload";

import ImageUploading, { ImageListType } from "react-images-uploading";
import { RoundedImage } from "../UploadImage";

function UploadMultipleImages({ images, setImages, boxSide = 125 }: PropsType) {
  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
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
            width: boxSide * 2 + 32,
            position: "relative",
            overflow: "hidden",
            p: 2,
          }}
          elevation={2}
        >
          <Grid container>
            {images.map((image) => (
              <Grid item xs={6}>
                <Box
                  sx={{
                    width: boxSide,
                    height: boxSide,
                    p: 0.5,
                    left: 0,
                    top: 0,
                    borderRadius: "16px",
                    overflow: "hidden",
                  }}
                >
                  <RoundedImage src={image["data_url"]} alt="to-upload" />
                </Box>
              </Grid>
            ))}
            <Grid item>
              <Paper sx={{ bgcolor: "text.disabled" }}>
                <Button
                  sx={{ width: boxSide, height: boxSide, zIndex: 10 }}
                  onClick={data.onImageUpload}
                  {...data.dragProps}
                >
                  <IconButton>
                    <UploadIcon sx={{ color: "white" }} fontSize="large" />
                  </IconButton>
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      )}
    </ImageUploading>
  );
}

type PropsType = {
  images: ImageListType;
  setImages: (images: ImageListType) => void;
  boxSide?: number;
};

export default UploadMultipleImages;
