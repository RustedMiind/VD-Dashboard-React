import { Stack, Grid, GridProps, CardMedia, TextField } from "@mui/material";
import { Announcement } from "../../../../types/Announcement";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../../../../constants";
import { NavLink } from "react-router-dom";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CenteredPagination from "../../../../components/CenteredPagination";
import { LaravelPagination } from "../../../../types/LaravelPagination";
import DeleteDialog from "./DeleteDialog";
import { useSnackbar } from "notistack";
import SearchIcon from "@mui/icons-material/Search";

interface AnnouncementsGetRoot {
  announcements?: LaravelPagination<Announcement[]>;
  search: unknown[];
  message: string;
  status: boolean;
}

const GridItem = (props: GridProps) => (
  <Grid item xs={12} sm={12} md={6} lg={4} xl={3} {...props} />
);

const AnnouncementCard = ({
  announcement,
  onDelete,
}: {
  announcement: Announcement;
  onDelete: (announcement: Announcement) => void;
}) => {
  const { body, title, date, first_gallery_media, id } = announcement;
  return (
    <Card
      elevation={2}
      sx={{ height: 1, display: "flex", flexDirection: "column" }}
    >
      <CardMedia
        sx={{ height: 200 }}
        image={first_gallery_media?.original_url}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          اعلان {id}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {date}
        </Typography>
        <Typography variant="body2">{body}</Typography>
      </CardContent>
      <CardActions>
        <Button startIcon={<EditIcon />} component={NavLink} to={`edit/${id}`}>
          تعديل الاعلان
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          onClick={() => {
            onDelete(announcement);
          }}
          color="error"
        >
          حذف الاعلان
        </Button>
      </CardActions>
    </Card>
  );
};

function getAnnouncements(
  params?: ParamsType
): Promise<LaravelPagination<Announcement[]>> {
  return new Promise((resolve, reject) => {
    axios
      .get<AnnouncementsGetRoot>(Api("employee/client/announcement"), {
        params: {
          page: params?.page,
          body: params?.search,
        },
      })
      .then(({ data: { announcements } }) => {
        if (announcements) resolve(announcements);
      })
      .catch(console.log);
  });
}

type ParamsType = {
  totalPages?: number;
  page?: number;
  search?: string;
  perPage?: number;
};

function AnnouncementsPage() {
  //Hooks
  const { enqueueSnackbar } = useSnackbar();

  // State
  const [announcements, setAnnouncements] = useState<
    Announcement[] | undefined
  >(undefined);
  const [toDelete, setToDelete] = useState<Announcement | undefined>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [params, setParams] = useState<ParamsType>({});
  const updateParams = (p: Partial<ParamsType>) =>
    setParams({ ...params, ...p });

  const requestAnnouncements = () => {
    getAnnouncements(params).then(({ data, current_page, last_page }) => {
      setAnnouncements(data);
      updateParams({ page: current_page, totalPages: last_page });
    });
  };

  const deleteAnnouncement = (a: Announcement) => {
    axios
      .delete(Api(`employee/client/announcement/${a.id}`))
      .then(() => {
        requestAnnouncements();
        setDeleteDialogOpen(false);
        enqueueSnackbar("تم حذف الاعلان بنجاح");
      })
      .catch((err) => {
        enqueueSnackbar("تعذر في حذف الاعلان", { variant: "error" });
      });
  };
  useEffect(requestAnnouncements, [params.page]);

  return (
    <>
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        announcement={toDelete}
        onConfirmDelete={deleteAnnouncement}
      />
      <Stack>
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography variant="h5">الاعلانات</Typography>

          <Button
            variant="contained"
            startIcon={<ControlPointIcon />}
            component={NavLink}
            to={"create"}
          >
            اضافة اعلان جديد
          </Button>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          width={1}
          spacing={2}
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            requestAnnouncements();
          }}
          mb={2}
        >
          <TextField
            placeholder="البحث"
            label="البحث"
            size="small"
            value={params.search}
            onChange={(e) => {
              updateParams({ search: e.target.value });
            }}
            sx={{ flexGrow: 1 }}
          />
          <Button variant="contained" startIcon={<SearchIcon />} type="submit">
            البحث
          </Button>
        </Stack>
        <Grid container spacing={2}>
          {announcements?.map((announcement) => (
            <GridItem>
              <AnnouncementCard
                announcement={announcement}
                onDelete={(announcement: Announcement) => {
                  setDeleteDialogOpen(true);
                  setToDelete(announcement);
                }}
              />
            </GridItem>
          ))}
        </Grid>
        <CenteredPagination
          page={params.page || 1}
          count={params.totalPages}
          onChange={(e, page) => {
            console.log(page);
            updateParams({ page });
          }}
        />
      </Stack>
    </>
  );
}

export default AnnouncementsPage;
