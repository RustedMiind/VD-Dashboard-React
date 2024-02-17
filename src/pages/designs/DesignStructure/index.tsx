import {
  Button,
  Grid,
  GridProps,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import AddLabelToEl from "../../../components/AddLabelToEl";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { Api } from "../../../constants";
import { useEffect, useState } from "react";
import { FormStatus } from "../../../types/FormStatus";
import { TextFieldProps } from "@mui/material";
import { useSnackbar } from "notistack";
import CustomFilePond from "../../../components/CustomFilepond";
import { FileBondState } from "../../../types/FileBondState";
import { Media } from "../../../types";
import { serialize } from "object-to-formdata";

const GridItem = (props: GridProps) => (
  <Grid sx={{ padding: "0.5rem" }} item md={6} {...props} />
);

function DesignStructurePage() {
  const { register, reset, handleSubmit } = useForm<StructureDesign>();
  const [formStatus, setFormStatus] = useState<FormStatus>("none");
  const [banner, setBanner] = useState<FileBondState>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [bannerUploadedImages, setBannerUploadedImages] = useState<Media[]>([]);
  const handleFormSubmit = handleSubmit((formData) => {
    setFormStatus("loading");
    axios
      .post(
        Api("client/strucre-design"),
        serialize({ ...formData, banner: banner[0] }),
        {
          headers: { from: "website" },
        }
      )
      .then((res) => {
        enqueueSnackbar("تم نحديث هيكل التصميم بنجاح");
      })
      .catch((err) => {
        enqueueSnackbar("تعذر نحديث هيكل التصميم", { variant: "error" });
      })
      .finally(() => {
        setFormStatus("none");
      });
  });
  const textFieldProps: TextFieldProps = {
    type: "text",
    required: true,
    size: "small",
    multiline: true,
    disabled: formStatus === "loading" || formStatus === "disabled",
  };
  useEffect(getStructureDesignData, []);

  function getStructureDesignData() {
    setFormStatus("loading");
    axios
      .get<{ strucre_designs: StructureDesign }>(Api("client/strucre-design"), {
        headers: { from: "website" },
      })
      .then(({ data }) => {
        const dto = data.strucre_designs;
        setBannerUploadedImages(data.strucre_designs.media);
        reset({
          about_us_ar: dto.about_us_ar,
          about_us_en: dto.about_us_en,
          features_ar: dto.features_ar,
          features_en: dto.features_en,
          vision_ar: dto.vision_ar,
          vision_en: dto.vision_en,
        });
      })
      .finally(() => {
        setFormStatus("none");
      });
  }

  return (
    <>
      <Typography variant="h5" fontWeight={700} mb={3}>
        هيكل تصميم المباني
      </Typography>
      <Grid container>
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Paper component="form" onSubmit={handleFormSubmit}>
            <Grid container rowSpacing={3}>
              <GridItem>
                <AddLabelToEl label="الرؤيا بالعربي" required>
                  <TextField
                    {...textFieldProps}
                    {...register("vision_ar")}
                    placeholder="الرؤيا بالعربي"
                  />
                </AddLabelToEl>
              </GridItem>
              <GridItem>
                <AddLabelToEl label="الرؤيا بالأنجليزي" required>
                  <TextField
                    {...textFieldProps}
                    {...register("vision_en")}
                    placeholder="الرؤيا بالأنجليزي"
                  />
                </AddLabelToEl>
              </GridItem>
              <GridItem>
                <AddLabelToEl label="نبذة عنا في مجال التصميم عربي" required>
                  <TextField
                    {...textFieldProps}
                    {...register("about_us_ar")}
                    placeholder="نبذة عن التصميم"
                  />
                </AddLabelToEl>
              </GridItem>
              <GridItem>
                <AddLabelToEl
                  label="نبذة عنا في مجال التصميم بالانجليزي"
                  required
                >
                  <TextField
                    {...textFieldProps}
                    {...register("about_us_en")}
                    placeholder="نبذة عن التصميم بالانجليزي"
                  />
                </AddLabelToEl>
              </GridItem>
              <GridItem>
                <AddLabelToEl label="مميزات خدمة التصميم عربي" required>
                  <TextField
                    {...textFieldProps}
                    {...register("features_ar")}
                    placeholder="المميزات"
                  />
                </AddLabelToEl>
              </GridItem>
              <GridItem>
                <AddLabelToEl label="مميزات خدمة التصميم بالانجليزي" required>
                  <TextField
                    {...textFieldProps}
                    {...register("features_en")}
                    placeholder="المميزات"
                  />
                </AddLabelToEl>
              </GridItem>
              <GridItem md={12}>
                <AddLabelToEl label="صورة البانر" required>
                  <Stack spacing={1}>
                    {bannerUploadedImages.map((item) => (
                      <Button
                        component="a"
                        href={item.original_url}
                        target="_blank"
                        variant="outlined"
                        size="small"
                        fullWidth
                      >
                        {item.file_name}
                      </Button>
                    ))}
                  </Stack>
                  <CustomFilePond
                    acceptedFileTypes={["image/jpeg"]}
                    files={banner}
                    onupdatefiles={(fileItems) => {
                      setBanner(fileItems.map((fileItem) => fileItem.file));
                    }}
                  />
                </AddLabelToEl>
              </GridItem>
              <LoadingButton
                type="submit"
                fullWidth
                sx={{ mt: 2 }}
                variant="contained"
                size="large"
                loading={formStatus === "loading"}
              >
                حفظ
              </LoadingButton>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

type StructureDesign = {
  vision_ar: string;
  vision_en: string;
  about_us_ar: string;
  about_us_en: string;
  features_ar: string;
  features_en: string;
  media: Media[];
};

export default DesignStructurePage;
