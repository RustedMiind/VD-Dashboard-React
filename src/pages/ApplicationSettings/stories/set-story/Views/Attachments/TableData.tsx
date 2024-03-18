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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { Story } from "../../../../../../types/Stories";
export default function TableData({ story }: PropsType) {
  return (
    <Stack>
      <TableContainer sx={{ height: 500 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>كود المرفق</TableCell>
              <TableCell>نوع المرفق</TableCell>
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
                      <IconButton size="small">
                        <PrintIcon />
                      </IconButton>
                      <IconButton size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
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
};
