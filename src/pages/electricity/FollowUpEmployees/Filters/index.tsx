import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Menu,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useContext, useMemo, useRef, useState } from "react";
import { SearchType, tasksContext } from "../context";

function searchTypeLabel(type: SearchType): string {
  switch (type) {
    case SearchType.SERVICE_TYPE:
      return "نوع الخدمة";
    case SearchType.REFERENCE_NUMBER:
      return "الرقم المرجعي";
    case SearchType.CLIENT_NAME:
      return "اسم العميل";
    case SearchType.GOVERNMENT:
      return "الجهة الحكومية";
    default:
      return "";
  }
}

function Filters() {
  const { setSearchType, searchType, search, setSearch, applySearch } =
    useContext(tasksContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const ref = useRef(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(ref.current);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSearchTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchType(
      (event.target as HTMLInputElement).value as unknown as SearchType
    );
  };

  const searchInputCommonProps: TextFieldProps = useMemo(
    () => ({
      size: "small",
      fullWidth: true,
      label: `البحث - ${searchTypeLabel(searchType)}`,
      value: search,
      onChange(e) {
        setSearch(e.target.value);
      },
    }),
    [search, searchType]
  );

  const formSubmit = (e: React.FormEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();
    handleClose();
    applySearch();
  };
  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        component="form"
        onSubmit={formSubmit}
        ref={ref}
      >
        <Box flexGrow={1}>
          <TextField
            InputProps={{
              endAdornment: (
                <Chip
                  size="small"
                  onClick={handleClick}
                  label={"تغيير طريقة البحث"}
                />
              ),
            }}
            {...searchInputCommonProps}
          />
        </Box>
        <Button type="submit" variant="contained">
          البحث
        </Button>
      </Stack>
      <Menu
        anchorEl={anchorEl}
        component={"form"}
        onSubmit={formSubmit}
        open={open}
        onClose={handleClose}
      >
        <Stack
          component={Paper}
          p={2}
          spacing={2}
          sx={{
            width: {
              xs: 200,
              sm: 300,
              md: 500,
              lg: 720,
              xl: 1080,
            },
          }}
        >
          <FormControl>
            <FormLabel>اختر التصنيف</FormLabel>
            <RadioGroup
              row
              value={searchType}
              onChange={handleSearchTypeChange}
            >
              <FormControlLabel
                value={SearchType.CLIENT_NAME}
                control={<Radio />}
                label={searchTypeLabel(SearchType.CLIENT_NAME)}
              />
              <FormControlLabel
                value={SearchType.GOVERNMENT}
                control={<Radio />}
                label={searchTypeLabel(SearchType.GOVERNMENT)}
              />
              <FormControlLabel
                value={SearchType.REFERENCE_NUMBER}
                control={<Radio />}
                label={searchTypeLabel(SearchType.REFERENCE_NUMBER)}
              />
              <FormControlLabel
                value={SearchType.SERVICE_TYPE}
                control={<Radio />}
                label={searchTypeLabel(SearchType.SERVICE_TYPE)}
              />
            </RadioGroup>
          </FormControl>
          <TextField autoFocus {...searchInputCommonProps} />

          <Button fullWidth type="submit" variant="contained">
            البحث
          </Button>
        </Stack>
      </Menu>
    </>
  );
}

export default Filters;
