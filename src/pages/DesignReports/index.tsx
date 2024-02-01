import { Stack, Typography } from "@mui/material";
import ClassificationCard from "./components/classificationCard/ClassificationCard";
import SearchBar from "./SearchBar";
import { useState } from "react";
import DesignReportsTable from "./components/Table/Table";
import Pagination from "./pagination";
import ClassificationCardContainer from "./components/ClassificationCardContainer/ClassificationCardContainer";

// Declaration of types
type DesignReportType = {
    id: string,
    name: string,
    type: string,
    price: number,
    date: string,
    buyerName: string
}


function ClientData() {
    // declaation my local state
    const [search, setSearch] = useState('');
    const [title, setTitle] = useState('مشاريع التصميم');
    const arr = [
        { id: 'd-1', name: 'تصميم 1', type: 'نوع 1', price: 250000, date: '12/01/2024', buyerName: 'سلام راضي' },
        { id: 'd-2', name: 'تصميم 2', type: 'نوع 2', price: 250000, date: '12/01/2024', buyerName: 'سلام راضي' },
        { id: 'd-3', name: 'تصميم 3', type: 'نوع 3', price: 250000, date: '12/01/2024', buyerName: 'سلام راضي' },
        { id: 'd-4', name: 'تصميم 4', type: 'نوع 4', price: 250000, date: '12/01/2024', buyerName: 'سلام راضي' }
    ];
    const [designReports, setDesignReports] = useState<
        DesignReportType[] | "loading" | "none" | "error"
    >("loading");
    const [currentPage, setCurrentPage] = useState(1);
    //handleSearch
    function handleSearch(): void {
        console.log(search)
    };
    function handleChangeTitle(val: string) {
        setTitle(val);
    }

    return (
        <Stack>
            <Typography variant="h5" fontWeight={700} mb={3}>
                أختر التصنيف
            </Typography>
            <ClassificationCardContainer>
                <ClassificationCard handleChangeTitle={handleChangeTitle} currentTab={title} title="مشاريع التصميم" count={15} />
                <ClassificationCard handleChangeTitle={handleChangeTitle} currentTab={title} title="طلبات الشراء" count={5} />
                <ClassificationCard handleChangeTitle={handleChangeTitle} currentTab={title} title="مشاريع جارية" count={8} />
            </ClassificationCardContainer>
            {/* Search Filters */}
            <SearchBar search={search} setSearch={setSearch} handleSearch={handleSearch} openAdvancedSearchDialog={() => { }} />
            {/* Show Data in Table  */}
            <DesignReportsTable title={title} designReports={arr} />
            {/* pagination */}
            <Pagination
                disabled={designReports === "loading"}
                page={currentPage}
                onChange={(e, x) => {
                    setCurrentPage(x);
                }}
                siblingCount={2}
                boundaryCount={1}
                count={5}
            />
        </Stack>
    );
}

export default ClientData;
