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
import { useSnackbar } from "notistack";
import SearchIcon from "@mui/icons-material/Search";
import DeleteDialog from "./DeleteDialog";
import {
  MobileService,
  mobileServiceSchema,
} from "../../../../types/MobileServices";
import { z } from "zod";

export interface Root {
  mobile_services: unknown[];
  search: [];
  message: string;
  status: boolean;
}

const mobileServicesArraySchema = z.array(mobileServiceSchema);

const GridItem = (props: GridProps) => (
  <Grid item xs={12} sm={12} md={6} lg={4} xl={3} {...props} />
);

const ServiceCard = ({
  service,
  onDelete,
}: {
  service: MobileService;
  onDelete: (service: MobileService) => void;
}) => {
  return (
    <Card
      elevation={2}
      sx={{ height: 1, display: "flex", flexDirection: "column" }}
    >
      <CardMedia
        sx={{ height: 200 }}
        image={service.pictures?.image?.[0]?.original_url}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          الخدمة رقم {service.id}
        </Typography>
        <Typography variant="h5" component="div">
          {service.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {service.specifications}
        </Typography>
        <Typography variant="body2">{service.description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          startIcon={<EditIcon />}
          component={NavLink}
          to={`edit/${service.id}`}
        >
          تعديل الخدمة
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          onClick={() => {
            onDelete(service);
          }}
          color="error"
        >
          حذف الخدمة
        </Button>
      </CardActions>
    </Card>
  );
};

function getServices(params?: ParamsType): Promise<MobileService[]> {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(Api("employee/client/mobile-services"), {
          params: {},
        })
        .then(({ data }) => {
          const services = mobileServicesArraySchema.parse(
            data?.["mobile_services"]
          );
          resolve(services);
        })
        .catch(console.log);
    } catch (error) {
      console.log("cached in try-catch block: ", error);
    }
  });
}

type ParamsType = {};

function MobileServicesMainPage() {
  //Hooks
  const { enqueueSnackbar } = useSnackbar();

  // State
  const [services, setServices] = useState<MobileService[] | undefined>(
    undefined
  );
  const [toDelete, setToDelete] = useState<MobileService | undefined>(
    undefined
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [params, setParams] = useState<ParamsType>({});
  const updateParams = (p: Partial<ParamsType>) =>
    setParams({ ...params, ...p });

  const requestServices = () => {
    getServices(params).then((services) => {
      setServices(services);
    });
  };

  const deleteService = (service: MobileService) => {
    axios
      .post(Api(`employee/client/mobile-services/multi-delete`), {
        ids: [service.id],
      })
      .then(() => {
        requestServices();
        setDeleteDialogOpen(false);
        enqueueSnackbar("تم حذف الاعلان بنجاح");
      })
      .catch((err) => {
        enqueueSnackbar("تعذر في حذف الاعلان", { variant: "error" });
      });
  };
  useEffect(requestServices, []);

  return (
    <>
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        service={toDelete}
        onConfirmDelete={deleteService}
      />
      <Stack>
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography variant="h5">خدمات التطبيق</Typography>

          <Button
            variant="contained"
            startIcon={<ControlPointIcon />}
            component={NavLink}
            to={"create"}
          >
            اضافة خدمة جديد
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
            requestServices();
          }}
          mb={2}
        >
          {/* <TextField
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
          </Button> */}
        </Stack>
        <Grid container spacing={2}>
          {services?.map((service) => (
            <GridItem>
              <ServiceCard
                service={service}
                onDelete={(service: MobileService) => {
                  setDeleteDialogOpen(true);
                  setToDelete(service);
                }}
              />
            </GridItem>
          ))}
        </Grid>
        {/* <CenteredPagination
          page={params.page || 1}
          count={params.totalPages}
          onChange={(e, page) => {
            console.log(page);
            updateParams({ page });
          }}
        /> */}
      </Stack>
    </>
  );
}

export default MobileServicesMainPage;
