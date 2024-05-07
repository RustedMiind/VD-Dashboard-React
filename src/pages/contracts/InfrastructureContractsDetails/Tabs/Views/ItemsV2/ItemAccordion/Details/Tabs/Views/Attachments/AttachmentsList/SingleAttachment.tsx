import { Button, Grid, Stack, Typography } from "@mui/material";
import FilePresentOutlinedIcon from "@mui/icons-material/FilePresentOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { ContractSubItemAttachment } from "../../../../../../../../../../../../types/Contracts/ContractItems";
import axios from "axios";
import { Api } from "../../../../../../../../../../../../constants";
import { ContractItemContext } from "../../../../../ItemContext";
import { useContext } from "react";
import { useSnackbar } from "notistack";

export default function SingleAttachment({
  attachmentFile,
}: {
  attachmentFile: ContractSubItemAttachment;
}) {
  // TODO::declare and define component variables and state
  const { fetchItemDetails } = useContext(ContractItemContext);
  const { enqueueSnackbar } = useSnackbar();
  let url =
      attachmentFile.media.length > 0
        ? attachmentFile.media[0].original_url
        : "",
    name =
      attachmentFile.media.length > 0
        ? attachmentFile.media[0].file_name
        : "file name";
  if (name) {
    if (name.length > 10) name = name.slice(0, 10) + "...";
  }

  // TODO::declare and define methods
  const handleDelete = () => {
    //delete file
    axios
      .delete(
        Api(
          `employee/contract/items/delete-attachment-sub-item/${attachmentFile.contract_sub_item_id}/${attachmentFile.id}`
        )
      )
      .then((res) => {
        fetchItemDetails?.({ optimized: false, soft: true });
        enqueueSnackbar("تم حذف المرفق بنجاح");
      })
      .catch((err) => {
        enqueueSnackbar("تعذر حذف المرفق", {
          variant: "error",
        });
      });
  };

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
      <Button
        startIcon={<FilePresentOutlinedIcon />}
        component={"a"}
        href={url}
        target="_blank"
      >
        <Typography variant="body2" paddingX={1} fontWeight={400}>
          {name}
        </Typography>
      </Button>
      <DeleteIcon
        onClick={handleDelete}
        sx={{ cursor: "pointer" }}
        color="error"
      />
    </Grid>
  );
}
