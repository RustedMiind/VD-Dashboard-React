import { Button, Stack, Typography } from "@mui/material";
import CustomFilePond from "../../components/CustomFilepond";
import { useEffect, useState } from "react";
import { FileBondState } from "../../types/FileBondState";
import { Api } from "../../constants";
import { uploadFileInChunks } from "../../methods/uploadChunks";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContractData from "./ContractData";
function ForTest() {
  const [files, setFiles] = useState<File[]>([]);

  const handleUpload = () => {
    uploadFileInChunks(
      files[0],
      1024 * 1024 * 0.5,
      Api("employee/send-big-file")
    );
  };

  return (
    <Stack>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>بيانات العقد</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ContractData />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>تفاصيل عرض المشروع</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>بنود العمل</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Stack>
    // <Stack>
    //   <CustomFilePond
    //     files={files}
    //     onupdatefiles={(e) => {
    //       setFiles(e.map((file) => file.file as File));
    //     }}
    //   />
    //   <Button fullWidth variant="contained" onClick={handleUpload}>
    //     Upload
    //   </Button>
    // </Stack>
  );
}

export default ForTest;
