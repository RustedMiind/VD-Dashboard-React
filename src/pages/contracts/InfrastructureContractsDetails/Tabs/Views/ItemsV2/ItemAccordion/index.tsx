import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  GridProps,
  Stack,
  Typography,
} from "@mui/material";
import { ContractItem } from "../../../../../../../types/Contracts/ContractItems";
import { useState } from "react";
import CustomAccordion from "../../../../../../../components/CustomAccordion";
import AddLabelToEl from "../../../../../../../components/AddLabelToEl";
import ItemActions from "./Actions";

const GridItem = (props: GridProps) => (
  <Grid item xs={12} md={6} lg={4} {...props} />
);

const LabelAndValue = ({ label, value }: { label: string; value?: string }) => (
  <AddLabelToEl
    label={label}
    labelTypographyProps={{ variant: "body2", color: "text.disabled" }}
  >
    <Typography variant="h6" fontWeight={700}>
      {value}
    </Typography>
  </AddLabelToEl>
);

function ItemAccordion({ item }: PropsType) {
  const [expanded, setExpanded] = useState(false);

  return (
    <CustomAccordion
      expanded={expanded}
      onChange={(e, expanded) => setExpanded(expanded)}
      accordionSummaryProps={{
        children: (
          <Grid container spacing={1}>
            <GridItem>
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  {item.name}
                </Typography>
                <Typography variant="subtitle2" color={"info.main"}>
                  عدد البنود الفرعية : {item.contract_sub_items?.length || 0}
                </Typography>
              </Box>
            </GridItem>
            <GridItem>
              <Stack direction={"row"}>
                <LabelAndValue label="المسؤول" value={item.manager?.name} />
                <LabelAndValue label="تاريخ الانتهاء" value={item.end_date} />
              </Stack>
            </GridItem>
            <GridItem>
              <ItemActions item={item} />
            </GridItem>
          </Grid>
        ),
      }}
    >
      h
    </CustomAccordion>
  );
}

export default ItemAccordion;

type PropsType = {
  item: ContractItem;
};
