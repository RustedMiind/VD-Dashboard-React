import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { CommunicationPerson } from "../../../../types/CommunicationPeople";
import { LaravelPagination } from "../../../../types/LaravelPagination";
import axios from "axios";
import { Api } from "../../../../constants";
import { useEffect, useState } from "react";
import CommunicationCard from "./CommunicationCard";
import CenteredPagination from "../../../../components/CenteredPagination";
import { useSnackbar } from "notistack";
import AddDialog from "./Dialog/AddDialog";

export interface RootResponse {
  contact_us: LaravelPagination<CommunicationPerson[]>;
  search: unknown[];
  message: string;
  status: boolean;
}

function GetCommunication(
  params?: unknown
): Promise<RootResponse["contact_us"]> {
  return new Promise((resolve, reject) => {
    axios
      .get<RootResponse>(Api("employee/client/contact-us"), { params })
      .then(({ data }) => {
        resolve(data.contact_us);
      })
      .catch(reject);
  });
}

function CommunicationPeople() {
  const [communication, setCommunications] = useState<
    RootResponse["contact_us"] | undefined
  >(undefined);
  const updateCommunication = (
    partial: Partial<RootResponse["contact_us"]>
  ) => {
    setCommunications(
      communication ? { ...communication, ...partial } : undefined
    );
  };
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<"add" | "edit">("add");
  const [idToEdit, setIdToEdit] = useState<number>();
  const [deleteAll, setDeleteAll] = useState<number[]>([]);
  const arr: number[] = [];

  function handleClose() {
    setOpen(!open);
  }
  function CommunicationData() {
    GetCommunication({ page: communication?.current_page })
      .then(setCommunications)
      .catch((err) => {
        enqueueSnackbar("تعذر في تجميل بيانات المستخدمين");
      });
  }
  useEffect(() => {
    CommunicationData();
  }, [communication?.current_page]);
  useEffect(() => {
    communication?.data.map((person) => arr.push(person.id));
    setDeleteAll(arr);
  }, []);
  return (
    <>
      {/* Create and Update Dialog */}
      <Stack spacing={2}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography fontWeight={700} variant="h5" gutterBottom>
            مسؤولين التواصل
          </Typography>
          <Box>
            <Button
              variant="contained"
              onClick={() => {
                handleClose();
                setType("add");
              }}
            >
              اضافة
            </Button>
            {/* <Button
              color="error"
              variant="outlined"
              sx={{ ml: 2 }}
              onClick={() => {}}
            >
              حذف الكل
            </Button> */}
          </Box>
        </Box>
        {/* Search Component */}
        <Box>
          <Grid container spacing={2}>
            {communication?.data.map((person) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={12 / 5}>
                <CommunicationCard
                  person={person}
                  handleClose={handleClose}
                  setType={setType}
                  setIdToEdit={setIdToEdit}
                  CommunicationData={CommunicationData}
                />
              </Grid>
            ))}
          </Grid>
          <CenteredPagination
            page={communication?.current_page || 1}
            count={communication?.last_page || 1}
            onChange={(e, page) => updateCommunication({ current_page: page })}
          />
        </Box>
        <AddDialog
          open={open}
          handleClose={handleClose}
          CommunicationData={CommunicationData}
          type={type}
          idToEdit={idToEdit}
        />
      </Stack>
    </>
  );
}

export default CommunicationPeople;
