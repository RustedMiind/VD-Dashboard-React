import {
  Box,
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CustomFilePond from "../../../../components/CustomFilepond";
import { DesignFileType, designFileInitial } from "..";
import { FormSectionProps } from "./BaseProps";
import AddLabelToEl from "../../../../components/AddLabelToEl";
import axios from "axios";
import { Api } from "../../../../constants";
import { CustomMenuList } from "./images";
import { AttachmentMenuItem } from "./Utilities";
import { Design } from "../../../../types";
import { useSnackbar } from "notistack";

type optionType = {
  id: number;
  name: string;
};

function DesignFile({
  designFiles,
  setDesignFile,
  setDesignFiles,
  designToEdit,
  setDesignToEdit,
}: PropsType) {
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
        return res?.data?.attachments_type;
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
        محتويات ملف التصميم
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          {designToEdit?.attachments && !!designToEdit?.attachments.length && (
            <CustomMenuList>
              {designToEdit.attachments.map((utility) => (
                <AttachmentMenuItem
                  url="hello"
                  onDelete={() => {
                    axios
                      .get(
                        Api(`client/design/delete-attachment/${utility.id}`),
                        {
                          headers: { from: "website" },
                        }
                      )
                      .then((res) => {
                        enqueueSnackbar("تم حذف المرفق بنجاح");
                        setDesignToEdit({
                          ...designToEdit,
                          attachments: designToEdit?.attachments?.filter(
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
      {designFiles.map((designFile, index, arr) => (
        <Stack pb={4} spacing={1} key={index}>
          <Grid container sx={{ display: "flex", alignItems: "end" }}>
            <Grid item xs={3} paddingX={1}>
              <AddLabelToEl label="أسم الملف" required>
                <TextField
                  fullWidth
                  size="small"
                  defaultValue={index !== arr.length - 1 ? designFile.name : ""}
                />
              </AddLabelToEl>
            </Grid>
            <Grid item xs={3} paddingX={1} paddingTop={2}>
              <TextField
                fullWidth
                select
                size="small"
                defaultValue={index !== arr.length - 1 ? +designFile.option : 1}
              >
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

interface PropsType extends FormSectionProps {
  designFiles: DesignFileType[];
  setDesignFiles: React.Dispatch<React.SetStateAction<DesignFileType[]>>;
  setDesignFile: (
    updatedDesignFile: Partial<DesignFileType>,
    index: number
  ) => void;
  designToEdit?: Design;
  setDesignToEdit: (design: Design) => void;
}

export default DesignFile;
