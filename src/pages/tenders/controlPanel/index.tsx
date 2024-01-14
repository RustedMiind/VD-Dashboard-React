import { Button, Grid, GridProps, Stack, TextField } from "@mui/material";
import CurrantTable from "./ongoingTable";
import IncomingTable from "./incomingTable";
import PaperButtonLikeTitle from "../../../components/PaperButtonLikeTitle";

function ForTest() {
  function GridItem({ children }: GridProps) {
    return (
      <Grid item xs={12} lg={5}>
        {children}
      </Grid>
    );
  }

  return (
    <Stack>
      <Grid container spacing={2}>
        <GridItem>
          <TextField
            value={""}
            label="الرقم المرجعي للمنافسة"
            size="small"
            fullWidth
          />
        </GridItem>
        <GridItem>
          <TextField value={""} label="الجهة الحكومية" size="small" fullWidth />
        </GridItem>
        <Grid item xs={12} lg={2}>
          <Button variant="contained" fullWidth>
            بحث
          </Button>
        </Grid>
        <Grid item lg={6} xs={12}>
          <PaperButtonLikeTitle title="المنافسات الواردة">
            <CurrantTable />
          </PaperButtonLikeTitle>
        </Grid>
        <Grid item lg={6} xs={12}>
          <PaperButtonLikeTitle title="المنافسات الجارية">
            <IncomingTable />
          </PaperButtonLikeTitle>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default ForTest;

// function ForTest() {
//   const [file, setFile] = useState<File | undefined>(undefined);
//   const snackbar = useSnackbar();

//   return (
//     <Stack>
//       <Paper component={Stack} elevation={4} p={2} spacing={5}>
//         <UploadFileInput value={file} setValue={setFile} />
//         <SelectWithFilteration
//           options={[
//             { id: 1, label: "Apple" },
//             { id: 2, label: "Banana" },
//             { id: 3, label: "Apple" }, // Example of a duplicate label with different ID
//             { id: 4, label: "Orange" },
//           ]}
//         />
//         <Stack direction={"row"} spacing={1}>
//           <Button
//             variant="contained"
//             onClick={() => {
//               snackbar.enqueueSnackbar("Hello There mr ali", {
//                 variant: "success",
//               });
//             }}
//           >
//             Open Snackbar
//           </Button>

//           <Button
//             variant="outlined"
//             color="error"
//             onClick={() => {
//               snackbar.closeSnackbar();
//             }}
//           >
//             Close Snackbar
//           </Button>
//         </Stack>
//       </Paper>
//     </Stack>
//   );
// }

// export default ForTest;
