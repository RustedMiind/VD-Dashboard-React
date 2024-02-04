import { Stack } from "@mui/material";
import ClassificationCard from "../../DesignReports/components/classificationCard/ClassificationCard";
import ClassificationCardContainer from "./ClassificationCard/ClassificationCardContainer";
import { Typography } from "@mui/material";
import { useState } from "react";
import SearchBar from "./SearchBar";
import Views from "./Views";

function DesignDataPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState(1);
  //handleSearch
  function handleSearch(): void {
    console.log(search);
  }
  const isCurrentTab = (tab: number) => tab === currentTab;
  const setThisTab = (tab: number) => () => setCurrentTab(tab);

  return (
    <Stack>
      <Typography variant="h5" fontWeight={700} mb={3}>
        أختر التصنيف
      </Typography>
      <ClassificationCardContainer>
        <ClassificationCard
          isCurrentTab={isCurrentTab(1)}
          setThisTab={setThisTab(1)}
          title="مشاريع التصميم"
          count={15}
        />
        <ClassificationCard
          isCurrentTab={isCurrentTab(2)}
          setThisTab={setThisTab(2)}
          title="طلبات الشراء"
          count={5}
        />
        <ClassificationCard
          isCurrentTab={isCurrentTab(3)}
          setThisTab={setThisTab(3)}
          title="مشاريع جارية"
          count={8}
        />
      </ClassificationCardContainer>
      <Views />
      {/* Search Filters */}
    </Stack>
  );
}

export default DesignDataPage;
