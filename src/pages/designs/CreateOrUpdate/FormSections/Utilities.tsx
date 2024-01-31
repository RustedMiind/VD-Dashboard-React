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
import {
  CreateFormType,
  GridItem,
  GridItemTextInputWithLabel,
  InputsGridContainer,
  Utility,
  utilityInitial,
} from "..";
import { FormSectionProps } from "./BaseProps";
import axios from "axios";
import { Api } from "../../../../constants";
import { UseFormRegister } from "react-hook-form";

type optionType = {
  id: number;
  name: string;
};

function UtilitiesSection({
  register,
  utilities,
  setUtilities,
  setUtility,
  registerFn,
}: PropsType) {
  // ?declare component state

  const [options, setOptions] = useState<optionType[]>([]);

  useEffect(() => {
    // TODO::fetch options data
    axios
      .get(Api("client/design/attachment-option"), {
        headers: {
          from: "website",
        },
      })
      .then((res) => {
        return res?.data?.utilities_type;
      })
      .then((data) => {
        let _arr: optionType[] = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            _arr.push({ id: data[key], name: key });
          }
        }
        console.log("response data ", data, _arr);
        setOptions(_arr);
      })
      .catch((err) => {
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
              <TextField
                fullWidth
                select
                size="small"
                onChange={(e) => {
                  setUtility({ option: e.target.value }, index);
                }}
                value={utility.option}
              >
                {options.map((option, i) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
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
          register={registerFn("status_design")}
          label={"حالة التصميم"}
        />
        <GridItem />
        <GridItem>
          <FormControlLabel
            control={<Switch {...register("status_mob")} />}
            label="التطبيق"
          />
        </GridItem>
        <GridItem>
          <FormControlLabel
            control={<Switch {...register("status_web")} />}
            label="الموقع"
          />
        </GridItem>
      </InputsGridContainer>
    </Stack>
  );
}

interface PropsType extends FormSectionProps {
  register: UseFormRegister<CreateFormType>;
  utilities: Utility[];
  setUtilities: React.Dispatch<React.SetStateAction<Utility[]>>;
  setUtility: (updatedUtility: Partial<Utility>, index: number) => void;
}

export default UtilitiesSection;
