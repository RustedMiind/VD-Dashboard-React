import { Paper, Stack, TableProps, Typography } from "@mui/material";

export default function ManagementTable({ children, title }: PropsType) {
  return (
    <Stack>
      <Typography
        bgcolor={"primary.main"}
        sx={{ py: 2, borderRadius: 1, textAlign: "center", color: "white" }}
      >
        {title}
      </Typography>
      <Paper>{children}</Paper>
    </Stack>
  );
}
type PropsType = {
  title: string;
} & TableProps;
