import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Box, Grid, LinearProgress, Stack, Typography } from "@mui/material";
import { ContractItem } from "../../../../../../../types/Contracts/ContractItems";

export default function TimeFrameDialog({ item, onClose, open }: PropsType) {
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            width: "100vw",
            minHeight: 300,
          },
        }}
      >
        <DialogContent sx={{ bgcolor: "background.default" }}>
          <Stack
            bgcolor={"background.default"}
            padding={2}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Grid
              container
              xs={12}
              width={"100%"}
              bgcolor={"background.paper"}
              padding={1}
              borderRadius={"12px"}
            >
              <Grid
                item
                xs={12}
                //id="LProgressBar"
              >
                <Typography
                  fontWeight={700}
                  fontSize={"1rem"}
                  sx={{ marginY: "0.3rem" }}
                  variant="body2"
                >
                  الخريطة الزمنية للبند
                </Typography>
                <Box
                  sx={{
                    height: "35px",
                    borderRadius: "21px",
                    border: "1px solid rgb(241, 155, 2)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <LinearProgress
                    variant="determinate"
                    value={item.achievement_percentage}
                    sx={{
                      width: "100%",
                      "&.MuiLinearProgress-root": {
                        height: "30px",
                        borderRadius: "21px",
                        border: "1px solid #fff",
                        backgroundColor: "#FDF0D9",
                      },

                      "&.MuiLinearProgress-root .MuiLinearProgress-bar": {
                        background:
                          "linear-gradient(263.01deg, #ffc860 -2.17%, #ff5f1e 99.77%)",
                        borderRadius: "12px",
                      },
                    }}
                  />
                  <Typography
                    sx={{
                      display: "flex",
                      width: "93px",
                      position: "absolute",
                      left: "1%", //اقل من قيمة ب 20
                      fontWeight: 700,
                    }}
                    variant="body2"
                  >
                    المنقضي {item.achievement_percentage}%
                  </Typography>
                  <Typography
                    sx={{
                      display: "flex",
                      width: "93px",
                      position: "absolute",
                      right: "0", //اقل من قيمة ب 20
                      fontWeight: 700,
                      //display:val == 100?'none':'flex'
                    }}
                    variant="body2"
                  >
                    المتبقي {100 - (item.achievement_percentage || 0)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "8px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography fontWeight={400} variant="body2">
                      بداية المشروع
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {new Date(item.start_date || "").toLocaleDateString(
                        "en-GB"
                      )}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography fontWeight={400} variant="body2">
                      نهاية المشروع
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {new Date(item.end_date || "").toLocaleDateString(
                        "en-GB"
                      )}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Button
              sx={{
                width: "50%",
                marginTop: "3rem",
                borderRadius: "4px",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
              onClick={onClose}
              variant="contained"
            >
              رجوع
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}

type PropsType = DialogProps & {
  open: boolean;
  onClose: () => void;
  item: ContractItem;
};
