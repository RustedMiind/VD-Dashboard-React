import { Stack, Typography, Box, Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: "1px",
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px",
});
function BtnFile(props: any) {
  const [selectedFile, setSelectedFile] = useState<any>(null);

  return (
    <Grid item p={0.1} md={6}>
      <Stack>
        <Typography sx={{ ml: 2 }} component="label">
          صوره الهويه
        </Typography>
        <input
          type="file"
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              const file = files[0];
              props.dispatch({ type: "CARD_IMAGE", payload: file });
              setSelectedFile(file);
            }
          }}
        />
        {/* <Box sx={{ mt: 1, ml: 1, bgcolor: "red" }}>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            ارفاق صورة
            <VisuallyHiddenInput
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  const file = files[0];
                  props.dispatch({ type: "CARD_IMAGE", payload: file });
                }
              }}
              type="file"
            />
          </Button>

          <Typography variant="body2" color="error">
            {props.errors?.card_image}
          </Typography>
        </Box> */}
      </Stack>
    </Grid>
  );
}

export default BtnFile;
