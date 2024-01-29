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

type Utility = {
  files: (string | FilePondInitialFile | Blob)[];
  option: string;
};

const utilityInitial: Utility = { option: "", files: [] };

function UtilitiesSection({ registerFn }: PropsType) {
  const [utilities, setUtilities] = useState<Utility[]>([utilityInitial]);
  console.log(utilities);
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
  return (
    <Stack>
      <Typography variant="h5" gutterBottom>
        المرافق
      </Typography>
      {utilities.map((utility, index, arr) => (
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

interface PropsType extends FormSectionProps {}

export default UtilitiesSection;
