import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function TenderStatus() {
  return (
    <Dialog open={true} maxWidth={"lg"} sx={{ textAlign: "center"}}>
      <Stack px={2} py={5}>
        <DialogTitle sx={{ fontWeight: 900 }}>حالة العرض</DialogTitle>
        
        <TableContainer component={Paper} sx={{ maxWidth: 1 ,bgcolor:"Background" }}>
          <Table
            sx={{
              minWidth: 900,
              textAlign: "center", 
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">المهندس المسؤل</TableCell>
                <TableCell align="center">تاريخ التقديم</TableCell>
                <TableCell align="center">تاريخ الانتهاء</TableCell>
                <TableCell align="center">الحالة</TableCell>
                <TableCell align="center">الملاحظات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">بيجاد العشري</TableCell>
                <TableCell align="center">12/6/2024</TableCell>
                <TableCell align="center">9/1/2030 </TableCell>
                <TableCell align="center">جاري</TableCell>
                <TableCell align="center">
                  هذا النص هو مثال لنص يمكن اضافته
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box display={"flex"} justifyContent={"center"} mt={5}>
          <Button variant="contained">رجوع</Button>
        </Box>
      </Stack>
    </Dialog>
  );
}

export default TenderStatus;
