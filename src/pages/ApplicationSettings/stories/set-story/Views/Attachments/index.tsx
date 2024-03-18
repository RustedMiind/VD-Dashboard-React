import { Box, Button, Container, Paper, Stack } from "@mui/material";

// Icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Story, StoryBanner } from "../../../../../../types/Stories";
import TableData from "./TableData";
import DialogAdd from "./DialogAdd";
import { useState } from "react";
import axios from "axios";
import { Api } from "../../../../../../constants";
import { useSnackbar } from "notistack";

function AttachmentsView({ story, seedStory }: PropsType) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedStoryBanner, setSelectedStoryBanner] = useState<
    StoryBanner | undefined
  >(undefined);
  const { enqueueSnackbar } = useSnackbar();
  function handleClose() {
    setOpen(false);
  }
  const openEditDialog = (story: StoryBanner) => {
    setOpen(true);
    setSelectedStoryBanner(story);
  };
  const openCreateDialog = () => {
    setOpen(true);
    setSelectedStoryBanner(undefined);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(Api(`employee/client/services-banners/${id}`));
      enqueueSnackbar("تم الحذف بنجاح");
      seedStory();
    } catch (error) {
      enqueueSnackbar("تعذر في حذف المرفق");
    }
  };

  return (
    <Stack component={Paper} p={2}>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ mb: 1 }}
          onClick={openCreateDialog}
        >
          اضافة مرفق
        </Button>
      </Box>
      <TableData
        story={story}
        handleDelete={handleDelete}
        openEditDialog={openEditDialog}
      />
      <DialogAdd
        open={open}
        story={story}
        handleClose={handleClose}
        seedStory={seedStory}
        selectedStoryBanner={selectedStoryBanner}
      />
    </Stack>
  );
}

type PropsType = {
  story?: Story;
  seedStory: () => void;
};

export default AttachmentsView;
