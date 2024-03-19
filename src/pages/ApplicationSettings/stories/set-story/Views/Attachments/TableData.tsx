import {
  Box,
  Button,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { Story, StoryBanner } from "../../../../../../types/Stories";
export default function TableData({
  story,
  openEditDialog,
  handleDelete,
}: PropsType) {
  return (
    <Stack>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>كود المرفق</TableCell>
              <TableCell>نوع المرفق</TableCell>
              <TableCell>تاريخ الانتهاء</TableCell>
              <TableCell>الملف المرفق</TableCell>
              <TableCell>الاعدادات</TableCell>
            </TableRow>
          </TableHead>
          {
            <TableBody>
              {Array.isArray(story?.stories) &&
                story?.stories.map((item) => (
                  <TableRow>
                    <TableCell>{item?.id}</TableCell>
                    <TableCell>
                      {item?.first_gallery_media?.mime_type}
                    </TableCell>
                    <TableCell>{item?.end_date}</TableCell>
                    <TableCell>
                      <Button
                        startIcon={<FolderOpenIcon />}
                        component="a"
                        href={item?.first_gallery_media?.original_url}
                        target="_blank"
                      >
                        عرض الملف
                      </Button>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => openEditDialog(item)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          }
        </Table>
      </TableContainer>
    </Stack>
  );
}
type PropsType = {
  story?: Story;
  openEditDialog: (banner: StoryBanner) => void;
  handleDelete: (bannerId: number) => void;
};
