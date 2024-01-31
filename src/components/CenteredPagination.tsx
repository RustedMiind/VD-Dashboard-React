import {
  Pagination as MuiPagination,
  Stack,
  PaginationProps,
} from "@mui/material";

function CenteredPagination(props: PaginationProps) {
  return (
    <Stack py={1} alignItems={"center"}>
      <MuiPagination {...props} />
    </Stack>
  );
}

export default CenteredPagination;
