import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { VacationsDetailsType } from "../branchDetails";
import { DialogState } from "../branchDetails/FilterDetails";

export default function ShowVactionDialog(props: TypeProps) {
  const vacationDataObject = props.vacationsData?.filter((item) => {
    return item.id === props.itemId;
  });
  console.log(vacationDataObject && vacationDataObject[0]?.id);

  return (
    <>
      {props.vacationsData?.length ? (
        <>
          <Dialog
            maxWidth={"sm"}
            fullWidth
            open={props.open}
            onClose={props.closeDialog}
          >
            <Typography sx={{ fontWeight: "800", textAlign: "center", pt: 5 }}>
              عرض الاجازة
            </Typography>
            <DialogContent>
              <Grid container p={1}>
                <Grid item md={6}>
                  <Typography>العام</Typography>

                  <TextField
                    disabled
                    size="small"
                    value={vacationDataObject && vacationDataObject[0]?.year}
                    fullWidth
                  />
                </Grid>
                <Grid item md={6}>
                  <Typography sx={{ ml: 2 }}>عدد الاجازات</Typography>
                  <TextField
                    disabled
                    size="small"
                    value={
                      vacationDataObject &&
                      vacationDataObject[0]?.vacationNumber
                    }
                    fullWidth
                    sx={{ ml: 2 }}
                  />
                </Grid>
                <Grid item md={6} my={2}>
                  <Typography> عدد الايام</Typography>
                  <TextField
                    disabled
                    value={
                      vacationDataObject &&
                      vacationDataObject[0]?.vacationNumber + " يوم"
                    }
                    size="small"
                    fullWidth
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item md={6} my={2}>
                  <Typography sx={{ ml: 2 }}>الحالة </Typography>
                  <TextField
                    disabled
                    value={
                      vacationDataObject && vacationDataObject[0]?.status.name
                    }
                    size="small"
                    fullWidth
                    sx={{ ml: 2 }}
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item md={6}>
                  <Typography>المستخدم</Typography>
                  <TextField
                    value={
                      vacationDataObject &&
                      vacationDataObject[0]?.vacationDayNumberUsed
                    }
                    disabled
                    size="small"
                    fullWidth
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item md={6}>
                  <Typography sx={{ ml: 2 }}>المتبقي</Typography>
                  <TextField
                    value={
                      vacationDataObject &&
                      vacationDataObject[0]?.vacationDayNumberstay
                    }
                    disabled
                    size="small"
                    fullWidth
                    sx={{ ml: 2 }}
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{ my: 2, px: 7 }}
                onClick={props.closeDialog}
              >
                رجوع
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <Typography variant="h4" padding={4} textAlign={"center"}>
          لا يوجد اجازات
        </Typography>
      )}
    </>
  );
}

type TypeProps = {
  open: boolean;
  vacationsData?: VacationsDetailsType[];
  itemId: number | undefined;
  closeDialog: () => void;
};
