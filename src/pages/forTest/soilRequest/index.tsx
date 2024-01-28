import { LoadingButton } from "@mui/lab";
import { Paper, Stack, Typography } from "@mui/material";
import React from "react";
import SoilRequestTable from "./Table";
import { Filter } from "@mui/icons-material";
import SoilFilters from "./Filters";

export default function SoilRequest() {
  return (
    <>
      <SoilFilters />
      <SoilRequestTable />
    </>
  );
}
