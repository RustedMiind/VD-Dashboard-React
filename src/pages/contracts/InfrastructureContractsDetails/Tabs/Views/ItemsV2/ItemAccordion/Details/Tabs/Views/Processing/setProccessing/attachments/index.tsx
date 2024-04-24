import {
  Box,
  Button,
  DialogContent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AttachmentsTableHeaders from "./components/TableHeaders";
import AttachmentsRow from "./components/AttachmentRow";
import { SetProccessingContext } from "../../context/SetProccessingContext";
import { Media } from "../../../../../../../../../../../../../types/Media";

export default function ProccessingAttachmentsTable() {
  //* Declaration component State variables...
  const SetProccessingContextData = useContext(SetProccessingContext);
  const [attachmentsArr, setAttachmentsArr] = useState<
    AttachmentsInstanceType[]
  >([]);

  useEffect(() => {
    setAttachmentsArr(
      SetProccessingContextData.transactionsAttachments.map((ele) => ({
        id: ele.id,
        file: undefined,
        description: ele.description,
        contract_attachment_type_id: ele.contract_attachment_type_id,
      }))
    );
  }, []);

  //* Handle selected files files
  const handleSelectedFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      Array.from(files).forEach((file, idx) => {
        console.log("Do something with " + file.name);
        setAttachmentsArr((prev) => [
          ...prev,
          {
            file: file,
            id: idx,
            description: "",
            contract_attachment_type_id: 0,
          },
        ]);
      });
    }
  };

  // *return component ui
  return (
    <>
      <DialogContent sx={{ bgcolor: "background.default" }}>
        <Stack
          bgcolor={"background.default"}
          padding={2}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {/* <SetDialog open={dialogOpen} handleClose={handleCloseDialog} /> */}
          <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
            <Button
              component="label"
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              size="small"
              role={undefined}
              tabIndex={-1}
            >
              اضافة مرفق
              <input
                style={{ display: "none" }}
                type="file"
                multiple
                onChange={handleSelectedFiles}
              />
            </Button>
          </Box>
          {/* table */}
          <TableContainer>
            <Table aria-label="simple table">
              <AttachmentsTableHeaders />
              <TableBody>
                {attachmentsArr.map((ele) => (
                  <AttachmentsRow key={ele.id} item={ele} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </DialogContent>
    </>
  );
}

export type AttachmentsInstanceType = {
  id: number;
  file: File | undefined;
  description: string;
  contract_attachment_type_id: number;
};
