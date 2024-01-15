import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export default function TenderAgree() {
  const [status, setStatus] = useState<string>("");
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setStatus(e.target.value);
  }
  return (
    <Dialog maxWidth="xs" fullWidth open={true}>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "800" }}>
        الموافقة علي المنافسة
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
          rowGap={2}
        >
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              onChange={handleChange}
            >
              <FormControlLabel
                value="موافق"
                control={<Radio />}
                label="موافق"
              />
              <FormControlLabel value="رفض" control={<Radio />} label="رفض" />
            </RadioGroup>
          </FormControl>
          {status === "رفض" && (
            <>
              <Typography component={"label"}>سبب الرفض</Typography>
              <TextareaAutosize minRows={6} />
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
