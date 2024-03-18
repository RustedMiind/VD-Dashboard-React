import { Box, Button, Stack } from "@mui/material";

// Icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Story } from "../../../../../../types/Stories";
import TableData from "./TableData";
import DialogAdd from "./DialogAdd";
import { useState } from "react";

function AttachmentsView({ story, seedStory }: PropsType) {
  const [open, setOpen] = useState<boolean>(false);
  function handleClose() {
    setOpen(!open);
  }
  return (
    <Stack>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ mb: 1 }}
          onClick={handleClose}
        >
          اضافة مرفق
        </Button>
      </Box>
      <TableData story={story} />
      <DialogAdd
        open={open}
        story={story}
        handleClose={handleClose}
        seedStory={seedStory}
      />
    </Stack>
  );
}

type PropsType = {
  story?: Story;
  seedStory: () => void;
};

export default AttachmentsView;
