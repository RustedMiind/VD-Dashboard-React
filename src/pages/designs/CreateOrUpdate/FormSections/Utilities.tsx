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
import axios from "axios";

// declare types
type Utility = {
  files: (string | FilePondInitialFile | Blob)[];
  option: string;
};
type optionType = {
  id: number,
  name: string
}

const utilityInitial: Utility = { option: "", files: [] };

function UtilitiesSection({ registerFn }: PropsType) {
  // ?declare component state
  const [utilities, setUtilities] = useState<Utility[]>([utilityInitial]);
  const setUtility = (updatedUtility: Utility, index: number) => {
    setUtilities((utilities) => {
      const updatedUtilities: Utility[] = [];
      utilities.forEach((utility, i) => {
        if (index === i) {
          updatedUtilities.push(updatedUtility);
        } else {
          updatedUtilities.push(utility);
        }
        console.log(updatedUtilities);
      });
      console.log("updatedUtilities ", updatedUtilities);
      return updatedUtilities;
    });
  };
  const [options, setOptions] = useState<optionType[]>([]);

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
        المرافق
      </Typography>
      {utilities.map((utility, index, arr) => (
        <Stack pb={4} spacing={1} key={index}>
          <Grid container>
            <Grid item xs={3} paddingX={1}>
              <TextField fullWidth select size="small" defaultValue={index !== arr.length - 1 ? +utility.option : 1}>
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
                    setUtilities([...utilities, utilityInitial]);
                  }}
                >
                  اضافة مرفق
                </Button>
              </Grid>
            )}
          </Grid>
          <Box width={0.5}>
            <CustomFilePond
              files={utility.files}
              onupdatefiles={(fileItems) => {
                setUtility(
                  {
                    files: fileItems.map((fileItem) => fileItem.file),
                    option: "",
                  },
                  index
                );
              }}
            />
          </Box>
        </Stack>
      ))}

      <InputsGridContainer>
        <GridItemTextInputWithLabel
          // inputRef={registerFn}
          // name="status_design"
          {...registerFn("status_design")}
          label={"حالة التصميم"}
        />
        <GridItem />
        <GridItem>
          <FormControlLabel
            control={<Switch {...registerFn("status_mob")} />}
            label="التطبيق"
          />
        </GridItem>
        <GridItem>
          <FormControlLabel
            control={<Switch {...registerFn("status_web")} />}
            label="الموقع"
          />
        </GridItem>
      </InputsGridContainer>
    </Stack>
  );
}

interface PropsType extends FormSectionProps { }

export default UtilitiesSection;
