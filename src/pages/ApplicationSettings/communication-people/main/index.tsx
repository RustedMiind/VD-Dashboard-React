import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { CommunicationPerson } from "../../../../types/CommunicationPeople";
import { LaravelPagination } from "../../../../types/LaravelPagination";
import axios from "axios";
import { Api } from "../../../../constants";
import { useEffect, useState } from "react";
import CommunicationCard from "./CommunicationCard";

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

  useEffect(() => {
    GetCommunication().then(setCommunications).catch(console.log);
  }, []);

  return (
    <>
      {/* Create and Update Dialog */}
      <Stack spacing={2}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography fontWeight={700} variant="h5" gutterBottom>
            مسؤولين التواصل
          </Typography>
          <Button variant="contained">اضافة</Button>
        </Box>
        {/* Search Component */}
        <Box>
          <Grid container spacing={2}>
            {communication?.data.map((person) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={12 / 5}>
                <CommunicationCard person={person} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </>
  );
}

export default CommunicationPeople;
