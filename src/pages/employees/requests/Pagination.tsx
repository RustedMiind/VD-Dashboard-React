import {
  Pagination as MuiPagination,
  Stack,
  PaginationProps,
} from "@mui/material";

function Pagination(props: PaginationProps) {
  return (
    <Stack py={1} alignItems={"center"}>
      <MuiPagination {...props} />
    </Stack>
  );
}

export default Pagination;
