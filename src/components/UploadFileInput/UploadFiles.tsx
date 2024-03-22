import { Stack, IconButton, Typography, Box } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FilePreview from "../FilePreview";
import { getFileExtension } from "../../methods/getFileExtension";
import DeleteIcon from "@mui/icons-material/Delete";

function UploadFilesInput(props: PropsType) {
  let height = 50;
  switch (props.size) {
    case "sm":
      height = 40;
      break;
    case "md":
      height = 56;
      break;
  }

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
        height,
      }}
    >
      <Stack direction="row">
        <IconButton color="primary" component={"label"}>
          <input
            type="file"
            multiple={true}
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                props.setValue(files);
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
  value?: FileList;
  setValue: (files: FileList) => void;
  fileLink?: string;
  size?: "sm" | "md";
};

export default UploadFilesInput;
