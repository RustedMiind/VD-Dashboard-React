import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
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
import { Design } from "../../../../types";
import { CustomMenuList } from "./images";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ListItemText } from "@mui/material";
import LimitTypography from "../../../../components/LimitTypograpgy";
import { useSnackbar } from "notistack";

type optionType = {
  id: number;
  name: string;
};

export const AttachmentMenuItem = (props: {
  onDelete: () => void;
  url?: string;
  name?: string;
  type?: string;
}) => (
  <MenuItem>
    <IconButton size="small" component="a" target="_blank" href={props.url}>
      <VisibilityIcon />
    </IconButton>
    <ListItemText>
      <LimitTypography minWidth={200}>{props.name}</LimitTypography>
    </ListItemText>
    {props.type && (
      <Typography variant="body2" color="gray">
        {props.type}
      </Typography>
    )}
    <IconButton size="small" onClick={props.onDelete} color="error">
      <DeleteIcon />
    </IconButton>
  </MenuItem>
);

function UtilitiesSection({
  register,
  utilities,
  setUtilities,
  setUtility,
  registerFn,
  setDesignToEdit,
  designToEdit,
}: PropsType) {
  // ?declare component state

  const [options, setOptions] = useState<optionType[]>([]);
  const { enqueueSnackbar } = useSnackbar();
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
      <Grid container>
        <Grid item xs={6}>
          {designToEdit?.utilities && !!designToEdit?.utilities.length && (
            <CustomMenuList>
              {designToEdit.utilities.map((utility) => (
                <AttachmentMenuItem
                  url="hello"
                  onDelete={() => {
                    axios
                      .get(Api(`client/design/delete-utility/${utility.id}`), {
                        headers: { from: "website" },
                      })
                      .then((res) => {
                        enqueueSnackbar("تم حذف المرفق بنجاح");
                        setDesignToEdit({
                          ...designToEdit,
                          utilities: designToEdit?.utilities?.filter(
                            (u) => u.id !== utility.id
                          ),
                        });
                      })
                      .catch(() => {
                        enqueueSnackbar("تعذر في حذف المرفق", {
                          variant: "error",
                        });
                      });
                  }}
                  type={options.find((o) => o.id === utility.type)?.name}
                  name={utility.file_name}
                />
              ))}
            </CustomMenuList>
          )}
        </Grid>
      </Grid>
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
  designToEdit?: Design;
  setDesignToEdit: (design: Design) => void;
}

export default UtilitiesSection;
