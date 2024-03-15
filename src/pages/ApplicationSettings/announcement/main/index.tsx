import { Stack, Grid, GridProps } from "@mui/material";
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

interface AnnouncementsGetRoot {
  announcements?: Announcement[];
  search: unknown[];
  message: string;
  status: boolean;
}

const GridItem = (props: GridProps) => (
  <Grid item xs={12} sm={6} md={4} lg={3} {...props} />
);

const AnnouncementCard = ({
  announcement: { body, title, date, id },
}: {
  announcement: Announcement;
}) => (
  <Card elevation={2} sx={{ height: 1 }}>
    <CardContent>
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
      <Button component={NavLink} to={`edit/${id}`} size="small">
        تعديل الاعلان
      </Button>
    </CardActions>
  </Card>
);

async function getAnnouncements(params?: unknown) {
  try {
    const announcements = (
      await axios.get<AnnouncementsGetRoot>(
        Api("employee/client/announcement"),
        { params }
      )
    ).data.announcements;
    if (Array.isArray(announcements)) return announcements;
  } catch (error) {
    console.log(error);
  }
}
function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<
    Announcement[] | undefined
  >(undefined);

  useEffect(() => {
    getAnnouncements().then(setAnnouncements);
  }, []);

  return (
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
      <Grid container spacing={2}>
        {announcements?.map((announcement) => (
          <GridItem>
            <AnnouncementCard announcement={announcement} />
          </GridItem>
        ))}
      </Grid>
    </Stack>
  );
}

export default AnnouncementsPage;
