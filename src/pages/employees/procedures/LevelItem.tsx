import { Stack, Button, Box, InputAdornment, Checkbox } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TextField,
} from "@mui/material";

// icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SelectCustom from "../../../components/MuiCustom";

function LevelItem(props: PropsType) {
  const [expanded, setEcpanded] = useState(false);

  return (
    <Stack my={0.5}>
      <Accordion
        sx={{ bgcolor: "background.med", overflow: "hidden" }}
        expanded={expanded}
        elevation={0}
        disableGutters
      >
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          sx={{ ".MuiAccordionSummary-content": { my: 0.75 } }}
          id="panel1a-header"
        >
          <Stack
            direction="row"
            alignItems="center"
            width={1}
            justifyContent="space-between"
          >
            <Button
              size="large"
              variant="text"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => {
                setEcpanded(!expanded);
              }}
            >
              {props.levelName}
            </Button>
            <Stack direction="row" alignItems="center" gap={1}>
              <Button variant="outlined" startIcon={<EditIcon />}>
                تعديل
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                disabled={!props.onDelete}
                onClick={props.onDelete}
              >
                حذف
              </Button>
            </Stack>
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: "background.paper", my: 0 }}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>مدير القسم الوظيفي</TableCell>
                  <TableCell>الموظف</TableCell>
                  <TableCell>موافقة</TableCell>
                  <TableCell>اعتماد</TableCell>
                  <TableCell>مدة التجاوز</TableCell>
                  <TableCell>النموذج</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Box width={{ lg: 150, xl: 200 }}>
                      <SelectCustom
                        options={[
                          { name: "التسويق", value: "1" },
                          { name: "البرمجة", value: 2 },
                        ]}
                        size="small"
                        label="اختر القسم"
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box width={{ lg: 150, xl: 200 }}>
                      <SelectCustom
                        options={[
                          { name: "علي سليمان", value: "1" },
                          { name: "عمرو صالح", value: "2" },
                        ]}
                        size="small"
                        label="اختر الموظف"
                        disabled
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <Checkbox defaultChecked />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      label="مدة التجاوز"
                      sx={{ width: { lg: 150, xl: 200 }, minWidth: "none" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">ساعة</InputAdornment>
                        ),
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box width={{ lg: 150, xl: 200 }}>
                      <SelectCustom
                        options={[
                          { name: "نموذج المرحلة الاولي", value: "1" },
                          { name: "نموذج المرحلة الثانية", value: "2" },
                        ]}
                        size="small"
                        label="اختر النموذج"
                        // disabled
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}

type PropsType = {
  onDelete?: () => void;
  levelName: string;
};

export default LevelItem;
