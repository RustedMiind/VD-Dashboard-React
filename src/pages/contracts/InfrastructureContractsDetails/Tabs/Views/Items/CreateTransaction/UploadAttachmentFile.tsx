import {
    Box,
    Button,
    IconButton,
    Paper,
    Stack,
    Typography,
    styled,
  } from "@mui/material";
  import UploadIcon from "@mui/icons-material/Upload";
  import ImageUploading, { ImageListType } from "react-images-uploading";
  import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
  
  export const RoundedImage = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 8,
  });
  
  function UploadImageFile({ images, setImages, width, multible }: PropsType) {
    
    const onChange = (imageList: ImageListType) => {
      if (multible) setImages(imageList);
      else setImages(imageList.slice(0, 1));
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
              position: "relative",
              overflow: "hidden",
              height: " 35px",
              background: "#fff",
              width: width ?? "98%",
              border: "2px dotted",
            }}
            elevation={2}
          >
            <Button
              sx={{ width: 1, height: 1, zIndex: 10 }}
              onClick={
                images.length
                  ? () => {
                      if (multible) {
                        for (let i = 0; i < images.length; i++) {
                          data.onImageUpdate(i);
                        }
                      } else {
                        data.onImageUpdate(0);
                      }
                    }
                  : data.onImageUpload
              }
              {...data.dragProps}
            >
              <AddCircleOutlineIcon />
              <Stack alignItems="center">
                <Typography fontSize={'10px'} variant="body1" fontWeight={500} color="gray">
                  {"ارفاق ملف (pdf , docs , dgw) "}
                </Typography>
                <Typography fontSize={'10px'} variant="body2" color="gray">
                  {"حجم الصورة لا يزيد عن 50MB"}
                </Typography>
              </Stack>
            </Button>
          </Paper>
        )}
      </ImageUploading>
    );
  }
  
  type PropsType = {
    images: ImageListType;
    setImages: (images: ImageListType) => void;
    //  React.Dispatch<React.SetStateAction<ImageListType>>;
    boxSide?: number;
    width?: string;
    multible?: boolean;
  };
  
  export default UploadImageFile;
  