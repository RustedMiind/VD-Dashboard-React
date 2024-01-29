import { Stack, Typography } from "@mui/material";

function NotFoundPage() {
  return (
    <Stack alignItems="center">
      <Typography color="error" variant="h3" pt={10}>
        عذرا !!!
      </Typography>
      <Typography variant="h4" pt={2}>
        الصفحة غير موجودة او لا يوجد لديك الصلاحية
      </Typography>
    </Stack>
  );
}

export default NotFoundPage;
