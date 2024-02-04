import {
  ListItemText,
  MenuItem,
  MenuList,
  MenuListProps,
  Stack,
  IconButton,
  Paper,
} from "@mui/material";
import UploadImage from "../../../../components/UploadImage";
import UploadMultipleImages from "../../../../components/UploadMultipleImages";
import { useState } from "react";
import { ImageListType } from "react-images-uploading";
import AddLabelToEl from "../../../../components/AddLabelToEl";
import { FilePond } from "react-filepond";
import { FilePondInitialFile } from "filepond";
import CustomFilePond from "../../../../components/CustomFilepond";
import { FileBondState } from "../../../../types/FileBondState";
import { Design } from "../../../../types";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { Api } from "../../../../constants";
import { useSnackbar } from "notistack";
import LimitTypography from "../../../../components/LimitTypograpgy";

const AddTitleToEl = (props: { children?: React.ReactNode; title: string }) => (
  <AddLabelToEl
    label={props.title}
    {...props}
    labelTypographyProps={{ component: undefined, variant: "h6" }}
  />
);
export const ImageMenuItem = (props: {
  onDelete: () => void;
  url?: string;
  name?: string;
}) => (
  <MenuItem>
    <IconButton size="small" component="a" target="_blank" href={props.url}>
      <VisibilityIcon />
    </IconButton>
    <ListItemText>
      <LimitTypography maxWidth={200}>{props.name}</LimitTypography>
    </ListItemText>
    <IconButton size="small" onClick={props.onDelete} color="error">
      <DeleteIcon />
    </IconButton>
  </MenuItem>
);

export const CustomMenuList = (props: MenuListProps) => (
  <Paper elevation={1} sx={{ mb: 1 }}>
    <MenuList dense {...props} />
  </Paper>
);

function FormImagesSection(props: PropsType) {
  const { enqueueSnackbar } = useSnackbar();
  const designToEdit = props.designToEdit;

  return (
    <Stack spacing={2}>
      <AddTitleToEl title="ارفاق صورة رئيسية">
        {designToEdit?.mainImage && designToEdit?.mainImage[0] && (
          <CustomMenuList>
            <ImageMenuItem
              onDelete={() => {}}
              name={designToEdit.mainImage[0].file_name}
              url={designToEdit.mainImage[0].original_url}
            />
          </CustomMenuList>
        )}
        <UploadImage images={props.mainImage} setImages={props.setMainImage} />
      </AddTitleToEl>
      <AddTitleToEl title="ارفاق صور فرعية">
        {designToEdit?.subImages && !!designToEdit.subImages.length && (
          <CustomMenuList>
            {designToEdit.subImages.map((image, index) => (
              <ImageMenuItem
                onDelete={() => {
                  axios
                    .get(
                      Api(
                        `client/design/delete-media/${designToEdit.id}/${image.id}`
                      ),
                      { headers: { from: "website" } }
                    )
                    .then((res) => {
                      enqueueSnackbar("تم حذف المرفق بنجاح");
                      props.setDesignToEdit({
                        ...props.designToEdit,
                        subImages: props.designToEdit?.subImages?.filter(
                          (media) => media.id !== image.id
                        ),
                      });
                    })
                    .catch(() => {
                      enqueueSnackbar("تعذر في حذف المرفق", {
                        variant: "error",
                      });
                    });
                }}
                name={image.file_name}
                url={image.original_url}
              />
            ))}
          </CustomMenuList>
        )}
        <UploadMultipleImages
          images={props.subImages}
          setImages={props.setSubImages}
        />
      </AddTitleToEl>

      <AddTitleToEl title="ارفاق الكتيب">
        {designToEdit?.booklet && !!designToEdit.booklet.length && (
          <CustomMenuList>
            {designToEdit.booklet.map((image) => (
              <ImageMenuItem
                onDelete={() => {
                  axios
                    .get(
                      Api(
                        `client/design/delete-media/${designToEdit.id}/${image.id}`
                      ),
                      { headers: { from: "website" } }
                    )
                    .then((res) => {
                      enqueueSnackbar("تم حذف المرفق بنجاح");
                      props.setDesignToEdit({
                        ...props.designToEdit,
                        booklet: props.designToEdit?.booklet?.filter(
                          (media) => media.id !== image.id
                        ),
                      });
                    })
                    .catch(() => {
                      enqueueSnackbar("تعذر في حذف المرفق", {
                        variant: "error",
                      });
                    });
                }}
                name={image.file_name}
                url={image.original_url}
              />
            ))}
          </CustomMenuList>
        )}
        <CustomFilePond
          files={props.booklet}
          onupdatefiles={(fileItems) => {
            props.setBooklet(fileItems.map((fileItem) => fileItem.file));
          }}
        />
      </AddTitleToEl>

      <AddTitleToEl title="تفاصيل المخطط الهندسي">
        {designToEdit?.engImage && !!designToEdit.engImage.length && (
          <CustomMenuList>
            {designToEdit.engImage.map((image) => (
              <ImageMenuItem
                onDelete={() => {
                  axios
                    .get(
                      Api(
                        `client/design/delete-media/${designToEdit.id}/${image.id}`
                      ),
                      { headers: { from: "website" } }
                    )
                    .then((res) => {
                      enqueueSnackbar("تم حذف المرفق بنجاح");
                      props.setDesignToEdit({
                        ...props.designToEdit,
                        engImage: props.designToEdit?.engImage?.filter(
                          (media) => media.id !== image.id
                        ),
                      });
                    })
                    .catch(() => {
                      enqueueSnackbar("تعذر في حذف المرفق", {
                        variant: "error",
                      });
                    });
                }}
                name={image.file_name}
                url={image.original_url}
              />
            ))}
          </CustomMenuList>
        )}
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
        {designToEdit?.engImageIdea && !!designToEdit.engImageIdea.length && (
          <CustomMenuList>
            {designToEdit.engImageIdea.map((image) => (
              <ImageMenuItem
                onDelete={() => {
                  axios
                    .get(
                      Api(
                        `client/design/delete-media/${designToEdit.id}/${image.id}`
                      ),
                      { headers: { from: "website" } }
                    )
                    .then((res) => {
                      enqueueSnackbar("تم حذف المرفق بنجاح");
                      props.setDesignToEdit({
                        ...props.designToEdit,
                        engImageIdea: props.designToEdit?.engImageIdea?.filter(
                          (media) => media.id !== image.id
                        ),
                      });
                    })
                    .catch(() => {
                      enqueueSnackbar("تعذر في حذف المرفق", {
                        variant: "error",
                      });
                    });
                }}
                name={image.file_name}
                url={image.original_url}
              />
            ))}
          </CustomMenuList>
        )}
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
  designToEdit?: Design;
  setDesignToEdit: React.Dispatch<React.SetStateAction<Design | undefined>>;
};

export default FormImagesSection;
