import { Box, Grid, Typography } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

export default function Transactions() {
  let attachementsBtns = (
    <>
      <RemoveRedEyeIcon />
      <CloudDownloadIcon color="secondary" />
    </>
  );
  let rowDummyData = [
    { id: `r_${Math.random() * 100}`, label: "رقم المعاملة", value: "3222" },
    {
      id: `r_${Math.random() * 100}`,
      label: "تاريخ الارسال",
      value: "12-03-2023",
    },
    { id: `r_${Math.random() * 100}`, label: "عدد الردود", value: "3222" },
    { id: `r_${Math.random() * 100}`, label: "اسم الراسل", value: "سلام راضي" },
    {
      id: `r_${Math.random() * 100}`,
      label: "اخر رد",
      value: "تم ارسال الملف",
    },
    { id: `r_${Math.random() * 100}`, label: "الاجراء", value: "مرسل" },
    {
      id: `r_${Math.random() * 100}`,
      label: "المرفقات",
      value: attachementsBtns,
    },
    { id: `r_${Math.random() * 100}`, label: "اخر تحديث", value: "25-02-2024" },
  ];
  let RowItem = ({
    label,
    value,
  }: {
    label: string;
    value: JSX.Element | string;
  }) => (
    <Box marginY={1}>
      <Typography variant="body2">{label}</Typography>
      <Typography variant="body2" fontSize={"17px"} fontWeight={600}>
        {value}
      </Typography>
    </Box>
  );

  const SingleRow = () => (
    <Grid
      item
      xs={12}
      padding={2}
      borderRadius={"12px"}
      display={"flex"}
      alignItems={"center"}
      marginY={2}
      justifyContent={"space-around"}
      bgcolor="#fff"
    >
      {rowDummyData.map((ele) => (
        <RowItem key={ele.id} label={ele.label} value={ele.value} />
      ))}
    </Grid>
  );

  return (
    <Grid container xs={12}>
      <SingleRow />
      <SingleRow />
      <SingleRow />
    </Grid>
  );
}
