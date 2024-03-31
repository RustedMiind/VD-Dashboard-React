import { Box, Fab, Stack, Typography } from "@mui/material";
import { MobileService } from "../../../../types/MobileServices";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Api } from "../../../../constants";
import { useSnackbar } from "notistack";

function ServiceMedia({ service, seedService, showOnly }: PropsType) {
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    !showOnly &&
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
    <Stack spacing={4}>
      {service.pictures?.image?.length && (
        <Box>
          <Typography variant="h6" fontWeight={700}>
            الصورة الرئيسية الخاصة بالخدمة
          </Typography>
          {!showOnly && (
            <Typography
              gutterBottom
              variant="subtitle2"
              color={"text.secondary"}
            >
              قم بأرفاق صورة جديدة لاستبدال الصورة الحالية
            </Typography>
          )}
          <ImageList sx={{ width: "100%" }} cols={2}>
            <>
              {service.pictures?.image?.map((image) => (
                <ImageListItem key={image.uuid}>
                  <img
                    src={image.original_url}
                    style={{ objectFit: "contain" }}
                    alt={"main"}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </>
          </ImageList>
        </Box>
      )}
      {service.pictures?.banners?.length && (
        <Box>
          <Typography variant="h6" fontWeight={700}>
            البانرات الحالية
          </Typography>
          {!showOnly && (
            <Typography
              gutterBottom
              variant="subtitle2"
              color={"text.secondary"}
            >
              قم بأرفاق صورة للاضافة للبانرات الحالية مع مراعاة عدم تعدى المجموع
              ال7 بانرات
            </Typography>
          )}
          <ImageList sx={{ width: "100%" }} cols={2} rowHeight={300}>
            <>
              {service.pictures?.banners?.map((banner) => (
                <ImageListItem key={banner.uuid}>
                  <img
                    src={banner.original_url}
                    style={{ objectFit: "contain" }}
                    alt={"banner"}
                    loading="lazy"
                  />
                  {!showOnly && (
                    <Fab
                      color="error"
                      size="small"
                      sx={{ position: "absolute", top: 10, left: 10 }}
                      value={banner.id}
                      onClick={handleDelete}
                    >
                      <DeleteIcon />
                    </Fab>
                  )}
                </ImageListItem>
              ))}
            </>
          </ImageList>
        </Box>
      )}
    </Stack>
  );
}

type PropsType = {
  service: MobileService;
  seedService: () => void;
  showOnly?: boolean;
};

export default ServiceMedia;
