import { Grid, Stack, Typography } from "@mui/material";
import FilePresentOutlinedIcon from "@mui/icons-material/FilePresentOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { ContractSubItemAttachment } from "../../../../../../../../../../../../types/Contracts/ContractItems";

export default function SingleAttachment({
  attachmentFile,
}: {
  attachmentFile: ContractSubItemAttachment;
}) {
  // TODO::declare and define component variables and state
  let url =
      attachmentFile.media.length > 0
        ? attachmentFile.media[0].original_url
        : "",
    name =
      attachmentFile.media.length > 0
        ? attachmentFile.media[0].file_name
        : "file name";
  if (name) {
    if (name.length > 10) name = name.slice(0, 10)+'...';
  }

  // TODO::declare and define methods

  // TODO::return out component view
  return (
    <Grid
      item
      xs={3.5}
      display="flex"
      justifyContent={"space-between"}
      alignItems={"center"}
      padding={2}
      margin={"3px"}
      boxSizing={"border-box"}
      border={"1px solid #d1bdbd"}
      borderRadius={"8px"}
      sx={{ textDecoration: "none", color: "primary.main" }}
    >
      <Stack
        direction={"row"}
        justifyContent="space-around"
        alignItems="center"
        component={"a"}
        href={url}
        target="_blank"
        sx={{ textDecoration: "none" }}
      >
        <FilePresentOutlinedIcon />
        <Typography variant="body2" paddingX={1} fontWeight={400}>
          {name}
        </Typography>
      </Stack>
      <DeleteIcon color="error" />
    </Grid>
  );
}
