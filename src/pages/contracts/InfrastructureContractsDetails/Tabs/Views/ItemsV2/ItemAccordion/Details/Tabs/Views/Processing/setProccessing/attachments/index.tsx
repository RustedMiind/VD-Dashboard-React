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
import { Api } from "../../../../../../../../../../../../../constants";
import { useSnackbar } from "notistack";
import { serialize } from "object-to-formdata";

export default function ProccessingAttachmentsTable() {
  //* Declaration component State variables...
  const { commentId, refreshTransactionAttachments } = useContext(
    SetProccessingContext
  );
  const { enqueueSnackbar } = useSnackbar();

  //* Handle selected files files
  const handleSelectedFiles = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.currentTarget.files;
    if (files) {
      try {
        await axios.post(
          Api(
            `employee/contract/items/comment-processing/store-attachment-type-images/${commentId}`
          ),
          serialize({ images: files }, { indices: true })
        );
        refreshTransactionAttachments();
        enqueueSnackbar("done");
      } catch (error) {
        enqueueSnackbar("not done");
      }
    }
  };

  // *return component ui
  return (
    <>
      <DialogContent>
        <Stack padding={2} alignItems={"center"} justifyContent={"center"}>
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
                {/* {attachmentsArr.map((ele) => (
                  <AttachmentsRow key={ele.id} item={ele} />
                ))} */}
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
