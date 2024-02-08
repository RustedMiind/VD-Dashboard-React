import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Media } from "../../../../../../types";

function MediaMenuList({ media }: PropsType) {
  return (
    <>
      {media && (
        <Paper>
          <MenuList>
            <MenuItem component="a" target="_blank" href={media.original_url}>
              <ListItemIcon>
                <AttachFileIcon fontSize="small" />
                <ListItemText>{media.file_name}</ListItemText>
              </ListItemIcon>
            </MenuItem>
          </MenuList>
        </Paper>
      )}
    </>
  );
}

type PropsType = {
  media?: Media;
};

export default MediaMenuList;
