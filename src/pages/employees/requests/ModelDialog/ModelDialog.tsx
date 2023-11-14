import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  TextField,
} from "@mui/material";

function ModelDialog(props: PropsType) {
  return (
    <Dialog open={props.open} maxWidth="md" fullWidth>
      <DialogTitle>نموذج مالية</DialogTitle>
      <DialogContent>
        <Stack direction={"row"} pt={2}>
          <Stack width={0.5} direction="row" alignItems="center" gap={1}>
            <Typography variant="body1" component="label" htmlFor="status">
              حالة الطلب
            </Typography>
            <FormControl sx={{ width: 200 }} size="small">
              <InputLabel id="demo-simple-select-label" size="small">
                حالة الطلب
              </InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="حالة  الطلب"
                // onChange={handleChange}
              >
                <MenuItem value={30}>ﻻ اجراء</MenuItem>
                <MenuItem value={10}>مقبول</MenuItem>
                <MenuItem value={20}>معتمد</MenuItem>
                <MenuItem value={30}>مرفوض</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack width={0.5} direction="row" alignItems="center" gap={1}>
            <Typography variant="body1" component="label" htmlFor="status">
              اختر الموظف البديل
            </Typography>
            <FormControl sx={{ width: 200 }} size="small">
              <InputLabel id="demo-simple-select-label" size="small">
                الموظف البديل
              </InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="الموظف البديل"
                // onChange={handleChange}
              >
                <MenuItem value={10}>احمد محمد</MenuItem>
                <MenuItem value={20}>علي</MenuItem>
                <MenuItem value={30}>عمرو</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
        <Stack mt={2}>
          <Typography
            variant="body1"
            component="label"
            display="block"
            gutterBottom
            mb={1}
          >
            الملاحظة
          </Typography>
          <TextField
            id=""
            inputProps={{ style: { minHeight: 100 } }}
            label="الملاحظة"
            multiline
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined">الغاء</Button>
        <Button variant="contained" autoFocus>
          ارسال
        </Button>
      </DialogActions>
    </Dialog>
  );
}

type PropsType = {
  open: boolean;
};

export default ModelDialog;
