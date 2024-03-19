import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Story } from "../../../../types/Stories";
import AddLabelToEl from "../../../../components/AddLabelToEl";
import Countdown from "react-countdown";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Api } from "../../../../constants";
import { useSnackbar } from "notistack";

function StoryCard({ story, resetStories }: PropsType) {
  console.log(new Date(story.end_date));
  const { enqueueSnackbar } = useSnackbar();
  const handleDelete = async () => {
    try {
      await axios.delete(Api(`employee/client/stories/${story.id}`), {
        headers: {
          from: "dashboard",
        },
      });
      enqueueSnackbar("تم الحذف بنجاح");
      resetStories();
    } catch (error) {
      enqueueSnackbar("تعذر في حذف القصة", { variant: "error" });
    }
  };

  return (
    <Card sx={{ height: 1, width: 1 }} elevation={2}>
      <CardMedia
        sx={{ height: 200 }}
        image={story.first_gallery_media?.original_url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {story.name}
        </Typography>
        <AddLabelToEl label="تاريخ البداية">
          <Typography variant="body2" color="text.secondary">
            {dayjs(story.created_at).format("YYYY-MM-DD")}
          </Typography>
        </AddLabelToEl>
        <AddLabelToEl label="تاريخ النهاية">
          <Typography variant="body2" color="text.secondary">
            {dayjs(story.end_date).format("YYYY-MM-DD")}
          </Typography>
        </AddLabelToEl>
        <AddLabelToEl label="الوقت المتبقي">
          <Typography variant="body2" color="text.secondary">
            <Countdown date={story.end_date} />
          </Typography>
        </AddLabelToEl>
      </CardContent>
      <CardActions sx={{ gap: 2 }}>
        <Button component={NavLink} to={`edit/${story.id}`}>
          تعديل
        </Button>
        <Button color="error" onClick={handleDelete}>
          حذف
        </Button>
      </CardActions>
    </Card>
  );
}

type PropsType = {
  story: Story;
  resetStories: () => void;
};

export default StoryCard;
