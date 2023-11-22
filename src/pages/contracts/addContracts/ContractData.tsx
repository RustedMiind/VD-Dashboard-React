import * as React from "react";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const paddingSize = 0.1;
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ContractData = () => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <Accordion sx={{ mb: 3 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>بيانات العقد</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "50ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container>
            <Grid item p={paddingSize} md={6}>
              <Stack>
                <Typography sx={{ ml: 2 }} component="label">
                  نوع الفرع
                </Typography>
                <FormControl sx={{ m: 1, width: 470 }}>
                  <Select
                    size="small"
                    multiple
                    displayEmpty
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>نوع الفرع</em>;
                      }

                      return selected.join(", ");
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem disabled value="">
                      <em>نوع الفرع</em>
                    </MenuItem>
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
            <Grid item p={paddingSize} md={6}>
              <Stack>
                <Typography sx={{ ml: 2 }} component="label">
                  الاداره
                </Typography>
                <FormControl sx={{ m: 1, width: 470 }}>
                  <Select
                    size="small"
                    multiple
                    displayEmpty
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>الاداره</em>;
                      }

                      return selected.join(", ");
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem disabled value="">
                      <em>الاداره</em>
                    </MenuItem>
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
            <Grid item p={paddingSize} md={6}>
              <Stack>
                <Typography sx={{ ml: 2 }} component="label">
                  مده العقد
                </Typography>
                <TextField
                  id="outlined-phone-input"
                  type="text"
                  required
                  size="small"
                  placeholder="مده العقد"
                />
              </Stack>
            </Grid>
            <Grid item p={paddingSize} md={6}>
              <Stack>
                <Typography sx={{ ml: 2 }} component="label">
                  رقم العقد
                </Typography>
                <TextField
                  id="outlined-email-input"
                  type="text"
                  required
                  size="small"
                />
              </Stack>
            </Grid>
            <Grid item p={paddingSize} md={6}>
              <Stack>
                <Typography sx={{ ml: 2 }} component="label">
                  نوع العقد
                </Typography>
                <FormControl sx={{ m: 1, width: 470 }}>
                  <Select
                    size="small"
                    multiple
                    displayEmpty
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>اختر</em>;
                      }

                      return selected.join(", ");
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem disabled value="">
                      <em>اختر</em>
                    </MenuItem>
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
            <Grid item p={paddingSize} md={6}>
              <Stack>
                <Typography sx={{ ml: 2 }} component="label">
                  موضوع العقد
                </Typography>
                <TextField
                  id="outlined-address-input"
                  type="text"
                  required
                  size="small"
                />
              </Stack>
            </Grid>

            <Grid item p={paddingSize} md={6}>
              <Stack>
                <Typography sx={{ ml: 2 }} component="label">
                  تاريخ العقد
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer sx={{ p: 0 }} components={["DatePicker"]}>
                    <DatePicker
                      slotProps={{ textField: { size: "small" } }}
                      label="تاريخ العقد"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Stack>
            </Grid>
            <Grid item p={paddingSize} md={6}>
              <Stack>
                <Typography sx={{ ml: 2 }} component="label">
                  العميل
                </Typography>
                <TextField
                  id="outlined-address-input"
                  type="text"
                  required
                  size="small"
                  placeholder="اسم العميل"
                />
              </Stack>
            </Grid>
            <Grid item p={paddingSize} md={6}>
              <Stack>
                <Typography sx={{ ml: 2 }} component="label">
                  قيمه العقد
                </Typography>
                <TextField
                  id="outlined-address-input"
                  type="text"
                  required
                  size="small"
                  placeholder="قيمه العقد"
                />
              </Stack>
            </Grid>
            <Grid item p={paddingSize} md={5}>
              <Stack>
                <Typography sx={{ ml: 2 }} component="label">
                  ارفاق صورة الهويه
                </Typography>
                <Box sx={{ mt: 1, ml: 1 }}>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    ارفاق صورة
                    <VisuallyHiddenInput type="file" />
                  </Button>
                </Box>
              </Stack>
            </Grid>
            <Grid item p={paddingSize} md={6}>
              <Stack>
                <Typography sx={{ ml: 2 }} component="label">
                  المهندس المسؤول
                </Typography>
                <FormControl sx={{ m: 1, width: 470 }}>
                  <Select
                    size="small"
                    multiple
                    displayEmpty
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>المهندس المسؤول</em>;
                      }

                      return selected.join(", ");
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem disabled value="">
                      <em>المهندس المسؤول</em>
                    </MenuItem>
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default ContractData;
