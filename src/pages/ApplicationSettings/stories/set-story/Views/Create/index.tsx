import {
  Box,
  Grid,
  GridProps,
  Paper,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import AddLabelToEl from "../../../../../../components/AddLabelToEl";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import CustomFilePond from "../../../../../../components/CustomFilepond";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { Story } from "../../../../../../types/Stories";
import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Api } from "../../../../../../constants";
import { serialize } from "object-to-formdata";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export const rootResponseSchema = z.object({
  story: z.object({
    name: z.string(),
    end_date: z.string(),
    updated_at: z.string(),
    created_at: z.string(),
    id: z.number(),
  }),
  message: z.string().optional(),
  status: z.boolean().optional(),
});
type RootResponse = z.infer<typeof rootResponseSchema>;

const GridItem = (props: GridProps) => <Grid item xs={12} lg={6} {...props} />;
const InputContainer = ({
  label,
  children,
  error,
}: {
  label: string;
  error?: string;
  children?: React.ReactNode;
}) => (
  <GridItem>
    <AddLabelToEl label={label}>
      {children}
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </AddLabelToEl>
  </GridItem>
);

const textFieldProps: (label?: string) => Partial<TextFieldProps> = (
  label
) => ({
  fullWidth: true,
  size: "small",
  // label,
  placeholder: label,
});

const FormTypeSchema = z.object({
  name: z.string().min(4),
  end_date: z.string(),
  image: z.instanceof(File).optional(), // Assuming 'image' is a file object
});

type FormType = z.infer<typeof FormTypeSchema>;

function SetView({ story, getStory }: PropsType) {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({ resolver: zodResolver(FormTypeSchema) });

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const updatedStory = await axios.request({
        ...(story // Handle request metadata based on mode (create || edit)
          ? {
              url: Api(`employee/client/stories/${story.id}`),
              params: {
                _method: "PUT",
              },
            }
          : { url: Api("employee/client/stories/store") }),
        method: "POST",
        data: serialize(data),
        headers: { from: "dashboard" },
      });
      enqueueSnackbar("تم الحفظ بنجاح");
      const parsed = rootResponseSchema.parse(updatedStory.data); // Parse the response to check if its in the correct format
      navigate({
        search: "?step=1",
        pathname: `/react/stories/edit/${parsed.story.id || story?.id}`,
      }); // Switch to edit mode using the storyId
      getStory();
      return;
    } catch (error) {
      enqueueSnackbar("تعذر في حفظ القصة", { variant: "error" });
      return;
    }
  });

  useEffect(() => {
    if (story) {
      reset({ end_date: story.end_date, name: story.name }); // Reset the form fields when id changes
    }
  }, [story?.id]);

  return (
    <Grid container spacing={2} component={"form"} onSubmit={onSubmit}>
      <Grid item xs={12} lg={7} xl={8}>
        <Box>
          <Grid container spacing={2}>
            <InputContainer label="عنوان القصة" error={errors.name?.message}>
              <TextField
                {...register("name")}
                {...textFieldProps("عنوان القصة")}
              />
            </InputContainer>
            <InputContainer
              label="تاريخ الانتهاء"
              error={errors.end_date?.message}
            >
              <Controller
                name="end_date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value ? dayjs(field.value) : null}
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
                    }}
                    onChange={(newValue) => {
                      field.onChange(
                        newValue ? newValue.format("YYYY-MM-DD") : ""
                      );
                    }}
                  />
                )}
              />
            </InputContainer>
            <InputContainer label="ايقونة القصة" error={errors.image?.message}>
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <CustomFilePond
                    {...field}
                    onupdatefiles={(files) => {
                      field.onChange(files.map((file) => file.file)?.[0]);
                    }}
                    allowMultiple={false}
                    maxFiles={1}
                  />
                )}
              />
            </InputContainer>

            <LoadingButton
              fullWidth
              variant="contained"
              startIcon={<SaveIcon />}
              type="submit"
              loading={isSubmitting}
            >
              حفظ
            </LoadingButton>
          </Grid>
        </Box>
      </Grid>
      {story && (
        <Grid item xs={12} lg={5} xl={4}>
          <Typography variant="h5" gutterBottom>
            الايقونة الحالية
          </Typography>
          <Paper
            component="img"
            sx={{ width: 1 }}
            src={story?.first_gallery_media?.original_url}
          />
        </Grid>
      )}
    </Grid>
  );
}

type PropsType = {
  story?: Story;
  getStory: () => void;
};
export default SetView;
