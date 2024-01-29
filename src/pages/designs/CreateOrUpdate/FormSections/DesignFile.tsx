import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CustomFilePond from "../../../../components/CustomFilepond";
import { ImageListType } from "react-images-uploading";
import { FilePondInitialFile } from "filepond";
import { GridItem, GridItemTextInputWithLabel, InputsGridContainer } from "..";
import { generateUndefinedArray } from "../../../../methods";
import { FormSectionProps } from "./BaseProps";

const dumb = generateUndefinedArray(5);

type DesignFile = {
  files: (string | FilePondInitialFile | Blob)[];
  option: string;
  name: string;
};

const designFileInitial: DesignFile = { option: "", files: [], name: "" };

function DesignFile({ registerFn }: PropsType) {
  const [designFiles, setDesignFiles] = useState<DesignFile[]>([
    designFileInitial,
  ]);
  console.log(designFiles);
  const setDesignFile = (updatedDesignFile: DesignFile, index: number) => {
    setDesignFiles((designFile) => {
      const updatedUtilities: DesignFile[] = [];
      designFile.forEach((designFile, i) => {
        if (index === i) {
          updatedUtilities.push(updatedDesignFile);
        } else {
          updatedUtilities.push(designFile);
        }
        console.log(updatedUtilities);
      });
      console.log("updatedUtilities ", updatedUtilities);
      return updatedUtilities;
    });
  };
  return (
    <Stack>
      <Typography variant="h5" gutterBottom>
        محتويات ملف التصميم
      </Typography>
      {designFiles.map((designFile, index, arr) => (
        <Stack pb={4} spacing={1} key={index}>
          <Grid container>
            <Grid item xs={3} paddingX={1}>
              <TextField fullWidth select size="small" value={0}>
                {dumb.map((x, i) => (
                  <MenuItem value={i}> option{i + 1} </MenuItem>
                ))}
              </TextField>
            </Grid>
            {index === arr.length - 1 && (
              <Grid item xs={3} paddingX={1}>
                <Button
                  variant="contained"
                  fullWidth
                  endIcon={<AddCircleOutlineIcon />}
                  onClick={() => {
                    setDesignFiles([...designFiles, designFileInitial]);
                  }}
                >
                  اضافة مرفق
                </Button>
              </Grid>
            )}
          </Grid>
          <Box width={0.5}>
            <CustomFilePond
              files={designFile.files}
              onupdatefiles={(fileItems) => {
                setDesignFile(
                  {
                    files: fileItems.map((fileItem) => fileItem.file),
                    option: "",
                    name: "",
                  },
                  index
                );
              }}
            />
          </Box>
        </Stack>
      ))}
    </Stack>
  );
}

interface PropsType extends FormSectionProps {}

export default DesignFile;
