import { Box, Grid, Stack, Typography } from "@mui/material";
import FilePresentOutlinedIcon from "@mui/icons-material/FilePresentOutlined";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { ContractDetailsContext } from "../../../..";
import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

export default function AttatchmentsSection() {
  // TODO::declare our state and variables
  const { contract } = useContext(ContractDetailsContext);
  const { currentMainItem } = useContext(TransactionContext);
  console.log(
    "AttatchmentsSection contract data",
    currentMainItem,
    contract?.contract_items
  );
  // define single btn
  const SiingleFile = ({ url }: { url: string }) => {
    return (
      <Grid
        item
        xs={4}
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingX={2}
        marginTop={2}
        component="a"
        href={url}
        target="_blank"
        sx={{ textDecoration: "none", color: "primary.main" }}
      >
        <Box display="flex" justifyContent="space-around" alignItems="center">
          <FilePresentOutlinedIcon />
          <Typography variant="body2" paddingX={1} fontWeight={400}>
            الملف المالي
          </Typography>
        </Box>
        <CloudDownloadIcon color="secondary" />
      </Grid>
    );
  };
  return (
    <Grid
      container
      xs={12}
      bgcolor={"#fff"}
      borderRadius={"12px"}
      marginY={1}
      padding={2}
    >
      {currentMainItem?.media && currentMainItem?.media?.length > 0 ? (
        currentMainItem?.media?.map((mediaFile) => {
          return (
            <SiingleFile
              key={`MF-${mediaFile.id}`}
              url={mediaFile.original_url}
            />
          );
        })
      ) : (
        <Stack justifyContent={"center"} alignItems={"center"} width={"100%"}>
          <Typography variant="body1" fontSize={18}>
            لا يوجد مرفقات فى هذا البند
          </Typography>
        </Stack>
      )}
    </Grid>
  );
}
