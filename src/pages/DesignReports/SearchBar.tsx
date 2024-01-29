import { Stack, TextField, Button, InputAdornment } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useState } from "react";

function SearchBar(props: PropsType) {
    const [filtersOpened, setFiltersOpenen] = useState(false);

    return (
        <>
            <Stack
                direction="row"
                component={"form"}
                onSubmit={(e) => {
                    e.preventDefault();
                    props.handleSearch();
                }}
                gap={1}
                sx={{
                    button: { px: 4 },
                    position: "relative",
                }}
            >
                <TextField
                    label="بحث"
                    value={props.search}
                    size="small"
                    sx={{ flexGrow: 1 }}
                    onChange={(
                        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                    ) => {
                        props.setSearch(e.target.value);
                    }}
                // disabled
                />
                <Button
                    variant="contained"
                    //  disabled
                    onClick={!props.search ? props.openAdvancedSearchDialog : undefined}
                    type={props.search ? "submit" : "button"}
                >
                    بحث
                </Button>
                <Button
                    startIcon={<FilterAltIcon />}
                    onClick={() => {
                        setFiltersOpenen(!filtersOpened);
                    }}
                    color={filtersOpened ? "success" : "primary"}
                    variant="outlined">
                    فلتر
                </Button>
            </Stack>
        </>
    );
}

type PropsType = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: () => void;
    openAdvancedSearchDialog: () => void;
};

export default SearchBar;
