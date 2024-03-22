import { Fab, Stack, Typography } from "@mui/material";
import { MobileService } from "../../../../types/MobileServices";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Api } from "../../../../constants";
import { useSnackbar } from "notistack";

function ServiceMedia({ service, seedService }: PropsType) {
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    axios
      .delete(
        Api(
          `employee/client/mobile-services/delete-media/${service.id}/${e.currentTarget.value}`
        )
      )
      .then(() => {
        seedService();
        enqueueSnackbar("تم حذف البانر بنجاح");
      })
      .catch(() => {
        enqueueSnackbar("تعذر في حذف البانر", { variant: "error" });
      });
  };

  return (
    <Stack>
      <Typography variant="h6" fontWeight={700}>
        البانرات الحالية
      </Typography>
      <ImageList sx={{ width: "100%", height: 450 }} cols={2} rowHeight={300}>
        <>
          {service.pictures?.banners?.map((banner) => (
            <ImageListItem key={banner.uuid}>
              <img
                src={banner.original_url}
                style={{ objectFit: "contain" }}
                alt={"banner"}
                loading="lazy"
              />
              <Fab
                color="error"
                size="small"
                sx={{ position: "absolute", top: 10, left: 10 }}
                value={banner.id}
                onClick={handleDelete}
              >
                <DeleteIcon />
              </Fab>
            </ImageListItem>
          ))}
        </>
      </ImageList>
    </Stack>
  );
}

type PropsType = { service: MobileService; seedService: () => void };

export default ServiceMedia;
