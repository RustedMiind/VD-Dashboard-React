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
import { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CustomFilePond from "../../../../components/CustomFilepond";
import { ImageListType } from "react-images-uploading";
import { FilePondInitialFile } from "filepond";
import { GridItem, GridItemTextInputWithLabel, InputsGridContainer } from "..";
import { generateUndefinedArray } from "../../../../methods";
import { FormSectionProps } from "./BaseProps";
import AddLabelToEl from "../../../../components/AddLabelToEl";
import axios from "axios";

type DesignFile = {
  files: (string | FilePondInitialFile | Blob)[];
  option: string;
  name: string;
};
type optionType = {
  id: number,
  name: string
};
const designFileInitial: DesignFile = { option: "", files: [], name: "" };

function DesignFile({ registerFn }: PropsType) {
  const [options, setOptions] = useState<optionType[]>([]);
  const [designFiles, setDesignFiles] = useState<DesignFile[]>([
    designFileInitial,
  ]);
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

  useEffect(() => {
    // TODO::fetch options data
    axios.get('https://visiondimensions.com/api/client/design/attachment-option', {
      headers: {
        Accept: 'application/json',
        from: "website"
      }
    })
      .then(res => {
        return res?.data?.attachments_type;
      }).then(data => {
        let _arr: optionType[] = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            _arr.push({ id: data[key], name: key });
          }
        }
        console.log("response data ", data, _arr);
        setOptions(_arr);
      }).catch(err => {
        console.log("error in fetch options data:", err);
      });
  }, []);

  return (
    <Stack>
      <Typography variant="h5" gutterBottom>
        محتويات ملف التصميم
      </Typography>
      {designFiles.map((designFile, index, arr) => (
        <Stack pb={4} spacing={1} key={index}>
          <Grid container sx={{ display: 'flex', alignItems: 'end' }}>
            <Grid item xs={3} paddingX={1}>
              <AddLabelToEl label="أسم الملف" required>
                <TextField fullWidth size="small" defaultValue={index !== arr.length - 1 ? designFile.name : ''} />
              </AddLabelToEl>
            </Grid>
            <Grid item xs={3} paddingX={1} paddingTop={2}>
              <TextField fullWidth select size="small" defaultValue={index !== arr.length - 1 ? +designFile.option : 1}>
                {options.map((option, i) => (
                  <MenuItem value={option.id}> {option.name} </MenuItem>
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

interface PropsType extends FormSectionProps { }

export default DesignFile;
