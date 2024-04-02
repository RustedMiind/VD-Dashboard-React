import {
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Media } from "../../../../../../types";
import DeleteIcon from "@mui/icons-material/Delete";

function MediaMenuList({ media, onDeleteMedia }: PropsType) {
  console.log("from menulist component", media);

  return (
    <>
      {media && Array.isArray(media) && media.length > 0 && (
        <Paper>
          <MenuList>
            {media.map((media) => (
              <MenuItem key={`${media.id}-${media.uuid}`}>
                <ListItemIcon>
                  <IconButton
                    component="a"
                    target="_blank"
                    href={media.original_url}
                  >
                    <AttachFileIcon fontSize="small" />
                  </IconButton>
                </ListItemIcon>
                <ListItemText sx={{ flexGrow: 1 }}>
                  {media.file_name}
                </ListItemText>
                <IconButton
                  color="error"
                  onClick={() => onDeleteMedia(media.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </MenuItem>
            ))}
          </MenuList>
        </Paper>
      )}
    </>
  );
}

type PropsType = {
  media?: Media[];
  onDeleteMedia: (mediaId: number) => void;
};

export default MediaMenuList;
