import { Stack, Grid, GridProps, CardMedia, Fab } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../../../../constants";
import { NavLink } from "react-router-dom";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";
import DeleteDialog from "./DeleteDialog";
import {
  MobileService,
  mobileServiceSchema,
} from "../../../../types/MobileServices";
import { z } from "zod";
import ServiceMedia from "../set-service/ServiceMedia";

export interface Root {
  mobile_services: unknown[];
  search: [];
  message: string;
  status: boolean;
}

const mobileServicesArraySchema = z.array(mobileServiceSchema);

const GridItem = (props: GridProps) => <Grid item xs={12} md={6} {...props} />;

const ServiceCard = ({
  service,
  onDelete,
  toggleTheme,
}: {
  service: MobileService;
  onDelete: (service: MobileService) => void;
  toggleTheme?: boolean;
}) => {
  return (
    <Stack>
      <Accordion
        sx={{
          bgcolor: toggleTheme ? "background.default" : "background.paper",
        }}
        variant={service.is_responsible_service ? "outlined" : undefined}
        // expanded={expanded}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {service.name}
          {service.is_responsible_service ? (
            <Typography
              color={"secondary.main"}
              sx={{ ml: 1 }}
              fontWeight={700}
            >
              خدمة ام
            </Typography>
          ) : undefined}
        </AccordionSummary>
        <AccordionDetails>
          {service.children && service.is_responsible_service ? (
            // && service.children.length > 0
            <Stack spacing={1}>
              {service.children.map((child) => (
                <ServiceCard
                  service={child}
                  onDelete={onDelete}
                  toggleTheme={!toggleTheme}
                />
              ))}
            </Stack>
          ) : (
            <Stack spacing={0}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                تفاصيل الخدمة
              </Typography>
              <Typography variant="body2" fontWeight={700}>
                اسم الخدمة
              </Typography>
              <Typography variant="body1">{service.name}</Typography>
              <Typography variant="body2" fontWeight={700}>
                وصف الخدمة
              </Typography>
              <Typography variant="body1">{service.description}</Typography>
              <Typography variant="body2" fontWeight={700}>
                مميزات الخدمة
              </Typography>
              <Typography variant="body1">{service.features}</Typography>
            </Stack>
          )}
          <ServiceMedia service={service} showOnly seedService={() => {}} />
        </AccordionDetails>
        <AccordionActions sx={{ gap: 1 }}>
          <Fab
            component={NavLink}
            to={`edit/${service.id}`}
            color="info"
            size="small"
          >
            <EditIcon />
          </Fab>
          <Fab
            onClick={() => {
              onDelete(service);
            }}
            size="small"
            color="error"
          >
            <DeleteIcon />
          </Fab>
        </AccordionActions>
      </Accordion>
    </Stack>
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
        enqueueSnackbar("تم حذف الخدمة بنجاح");
      })
      .catch((err) => {
        enqueueSnackbar("تعذر في حذف الخدمة", { variant: "error" });
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
