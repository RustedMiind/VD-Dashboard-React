import { Stack } from "@mui/material";
import SearchBar from "../SearchBar";
import CenteredPagination from "../../../../components/CenteredPagination";
import { useMemo, useState } from "react";
import DesignProjectsView from "./DesignProjectsView";
import BuyRequestsView from "./BuyRequestsView";

function Views({ currentPage }: PropsType) {
  let toShow: JSX.Element = useMemo(() => {
    switch (currentPage) {
      case 1:
        return <DesignProjectsView />;

      case 2:
        return <BuyRequestsView />;

      default:
        return <DesignProjectsView />;
    }
  }, [currentPage]);

  return <Stack spacing={4}>{toShow}</Stack>;
}

type PropsType = {
  currentPage: number;
};

export default Views;
