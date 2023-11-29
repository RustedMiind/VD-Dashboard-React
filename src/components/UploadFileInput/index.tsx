import { Stack, IconButton, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FilePreview from "../FilePreview";
import { getFileExtension } from "../../methods/getFileExtension";

function UploadFileInput(props: PropsType) {
  if (props.value) {
    return (
      <FilePreview
        fileName={props.value.name}
        fileExtension={getFileExtension(props.value)}
        fileSize={`${(props.value.size / 1024 ** 2).toFixed(2)}MB`}
      />
    );
  } else
    return (
      <Stack
        sx={{
          borderWidth: 1,
          borderStyle: "dashed",
          borderColor: "primary.main",
          borderRadius: 1,
          px: 4,
          width: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 60,
        }}
      >
        <Stack direction="row">
          <IconButton color="primary" component={"label"}>
            <input
              type="file"
              value={props.value}
              onChange={(e) => {
                const files = e.target.files || [];
                const file = files[0];
                if (file) {
                  props.setValue(file);
                }
              }}
              name=""
              id=""
              style={{ display: "none" }}
            />
            <AddCircleOutlineIcon />
          </IconButton>
          <Stack alignItems="center">
            <Typography variant="body1" fontWeight={700} color="gray">
              {props.title || "ارفاق ملف"}
            </Typography>
            <Typography variant="body2" color="gray">
              {props.subTitle || "حجم الصورة لا يزيد عن 10MB"}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    );
}

type PropsType = {
  title?: string;
  subTitle?: string;
  value?: File;
  setValue: (file: File) => void;
  fileLink?: string;
};

export default UploadFileInput;
