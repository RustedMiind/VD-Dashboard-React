import {
  FormHelperText,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { DbOptionType } from "../../../../../../../../../../../../../../types/other/DbOptionType";
import { useEffect, useState } from "react";
import { getUseData } from "../../../../../../../../../../../../../../methods/getUseData";
import { TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AttachmentsInstanceType } from "..";

export default function AttachmentsRow(props: ptopsType) {
  // TODO::define and declare component state and helpers variables
  const [description, setDescription] = useState("");
  const [saveDescState, setSaveDescState] = useState({
    state: false,
    msg: "",
  });
  const [updateTypeState, setUpdateTypeState] = useState({
    state: false,
    msg: "",
  });
  const [attatchmentFileTypes, setAttatchmentFileTypes] = useState<
    DbOptionType[]
  >([]);

  // fetch data for attatchmentFileTypes
  useEffect(() => {
    SetAttatchmentFileTypesArray();
  }, []);

  // TODO::define and declare helpers methods
  const SetAttatchmentFileTypesArray = async () => {
    let useData = await getUseData();
    setAttatchmentFileTypes(useData.attachments_types);
  };
  // TODO::handle update work type.
  const handleAttatchmentFileTypes = (e: SelectChangeEvent<string>) => {
    console.log("Update work type::", e.target.value);
    setUpdateTypeState({
      msg: "تم تحديث البانات بنجاح",
      state: true,
    });
  };
  // TODO::handle save description
  const handleSaveDescription = () => {
    if (description.length > 0)
      setSaveDescState({ msg: "تم تحديث البيانات بنجاح", state: true });
    else setSaveDescState({ msg: "تعذر تحديث البيانات", state: false });
  };

  // TODO::handle delete attachment
  const handleDeleteAttachment = () => {
    console.log("Delete attachment");
  };

  return (
    <TableRow>
      {/* Attachment Work Type */}
      <TableCell>
        <Select
          required
          color="primary"
          size={"small"}
          onChange={handleAttatchmentFileTypes}
          fullWidth
          defaultValue={"" + props.item.contract_attachment_type_id}
        >
          {attatchmentFileTypes.map((option) => (
            <MenuItem key={`${option.id}`} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
        {updateTypeState.msg.length > 0 && (
          <FormHelperText
            sx={{ color: updateTypeState.state ? "green" : "red" }}
          >
            {updateTypeState.msg}
          </FormHelperText>
        )}
      </TableCell>
      {/* file name */}
      <TableCell>
        <Typography variant="body2">
          {props.item.file?.name ?? "اسم المرفق"}
        </Typography>
      </TableCell>
      {/* file description */}
      <TableCell>
        <TextField
          onChange={(e) => setDescription(e.target.value)}
          onBlur={handleSaveDescription}
          defaultValue={props.item.description}
          size="small"
          color="primary"
        />
        {saveDescState.msg.length > 0 && (
          <FormHelperText sx={{ color: saveDescState.state ? "green" : "red" }}>
            {saveDescState.msg}
          </FormHelperText>
        )}
      </TableCell>
      {/* Delete Actions */}
      <TableCell>
        <IconButton
          size="small"
          onClick={() => handleDeleteAttachment()}
          color="error"
        >
          <Tooltip title="حذف" placement="top">
            <DeleteIcon />
          </Tooltip>
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

type ptopsType = {
  item: AttachmentsInstanceType;
};
