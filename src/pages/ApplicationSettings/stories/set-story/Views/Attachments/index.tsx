import { Stack } from "@mui/material";
import { Story } from "../../../../../../types/Stories";

function AttachmentsView({ story }: PropsType) {
  console.log(story);

  return (
    <Stack>
      Attachments
      {JSON.stringify(story?.stories)}
    </Stack>
  );
}

type PropsType = {
  story?: Story;
};

export default AttachmentsView;
