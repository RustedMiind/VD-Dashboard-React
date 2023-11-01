import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Link from "@mui/material/Link";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconBox from "./IconBox";
import { Stack } from "@mui/material";
import { useState } from "react";

const routesCollections = ["الادوار والمستخدمين", "الهيكل التنظيمي", "العملاء"];

function DrawerComponent(props: PropsType) {
  const [currentCollection, setCurrentCollection] = useState<null | number>();

  return (
    <Drawer
      sx={{
        width: props.width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: props.width,
          boxSizing: "border-box",
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          "*": {
            color: "primary.contrastText",
          },
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* <Toolbar /> */}
      <IconBox />
      <List>
        {routesCollections.map((text, index) => (
          <Accordion
            sx={{
              backgroundColor: "transparent",
            }}
            expanded={currentCollection === index}
            onChange={(e, x) => {
              if (x) {
                setCurrentCollection(index);
              } else {
                setCurrentCollection(null);
              }
            }}
            elevation={0}
            disableGutters
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              component={Button}
              sx={{ width: 1 }}
            >
              <Typography>{text}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack
                sx={{
                  button: {
                    width: 1,
                    justifyContent: "start",
                  },
                }}
              >
                <Button>الصفحة الاولي</Button>
                <Button>الصفحة الثانية</Button>
                <Button>الصفحة الثالثة</Button>
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    </Drawer>
  );
}

type PropsType = {
  width: number;
};

export default DrawerComponent;
