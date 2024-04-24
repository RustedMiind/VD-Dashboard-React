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
import React, { useState } from "react";
import axios from "axios";
import AttachmentsTableHeaders from "./components/TableHeaders";
import AttachmentsRow from "./components/AttachmentRow";

export default function ProccessingAttachmentsTable() {
  //* Declaration component State variables...
  const [loading, setLoading] = useState(false);
  const [attachmentsArr, setAttachmentsArr] = useState<
    AttachmentsInstanceType[]
  >([]);

  //* Handle selected files files
  const handleSelectedFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      Array.from(files).forEach((file, idx) => {
        console.log("Do something with " + file.name);
        setAttachmentsArr((prev) => [...prev, { file: file, id: idx }]);
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
  file: File;
};
